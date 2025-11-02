/**
 * Google Sheets Service
 * Low-level service để gọi Google Apps Script Web App
 */

const GOOGLE_SHEETS_WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL || ''

interface SheetRecord {
  [key: string]: any
}

interface SheetResponse {
  success: boolean
  message?: string
  records?: SheetRecord[]
  error?: string
  row?: number
  startRow?: number
}

export class GoogleSheetsService {
  private baseUrl: string

  constructor() {
    this.baseUrl = GOOGLE_SHEETS_WEB_APP_URL
  }

  private async callSheetAPI(action: string, table: string, data?: any): Promise<SheetResponse> {
    if (!this.baseUrl) {
      throw new Error('GOOGLE_SHEETS_WEB_APP_URL is not configured')
    }

    const payload: any = { action, table }
    if (data) {
      if (Array.isArray(data)) {
        payload.records = data
      } else {
        payload.record = data
      }
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      // Read response body once
      const responseText = await response.text()
      let result: SheetResponse

      // Parse JSON response
      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        // If not JSON, treat as plain text error
        const errorMessage = responseText || response.statusText
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error(
              `Google Sheets Authorization Error (${response.status}): ${errorMessage}\n\n` +
              `Cách fix:\n` +
              `1. Kiểm tra Google Apps Script Web App deployment:\n` +
              `   - Vào Google Sheet > Tools > Script editor\n` +
              `   - Click Deploy > Manage deployments\n` +
              `   - Chọn deployment và click Edit (icon bút chì)\n` +
              `   - Đảm bảo "Who has access" = "Anyone"\n` +
              `   - Click Deploy để update\n` +
              `2. Hoặc tạo deployment mới:\n` +
              `   - Deploy > New deployment > Web app\n` +
              `   - Execute as: Me\n` +
              `   - Who has access: Anyone\n` +
              `   - Copy Web app URL mới vào GOOGLE_SHEETS_WEB_APP_URL`
            )
          }
          throw new Error(`Google Sheets API error (${response.status}): ${errorMessage}`)
        }
        throw new Error(`Google Sheets API returned invalid JSON: ${errorMessage}`)
      }

      // Check HTTP status
      if (!response.ok) {
        // Provide helpful error messages for common issues
        const errorMessage = result.error || result.message || response.statusText
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            `Google Sheets Authorization Error (${response.status}): ${errorMessage}\n\n` +
            `Cách fix:\n` +
            `1. Kiểm tra Google Apps Script Web App deployment:\n` +
            `   - Vào Google Sheet > Tools > Script editor\n` +
            `   - Click Deploy > Manage deployments\n` +
            `   - Chọn deployment và click Edit (icon bút chì)\n` +
            `   - Đảm bảo "Who has access" = "Anyone"\n` +
            `   - Click Deploy để update\n` +
            `2. Hoặc tạo deployment mới:\n` +
            `   - Deploy > New deployment > Web app\n` +
            `   - Execute as: Me\n` +
            `   - Who has access: Anyone\n` +
            `   - Copy Web app URL mới vào GOOGLE_SHEETS_WEB_APP_URL`
          )
        }
        throw new Error(`Google Sheets API error (${response.status}): ${errorMessage}`)
      }

      // Check if response contains error in JSON body
      if (!result.success && result.error) {
        throw new Error(`Google Sheets error: ${result.error}`)
      }

      return result
    } catch (error: any) {
      // Re-throw if it's already our formatted error
      if (error.message && error.message.includes('Google Sheets')) {
        throw error
      }
      // Wrap other errors
      throw new Error(`Google Sheets API request failed: ${error.message || 'Unknown error'}`)
    }
  }

  /**
   * Create a single record
   */
  async create(table: string, record: SheetRecord): Promise<SheetResponse> {
    return this.callSheetAPI('create', table, record)
  }

  /**
   * Update a single record
   */
  async update(table: string, record: SheetRecord): Promise<SheetResponse> {
    return this.callSheetAPI('update', table, record)
  }

  /**
   * Upsert a single record (create if not exists, update if exists)
   */
  async upsert(table: string, record: SheetRecord): Promise<SheetResponse> {
    return this.callSheetAPI('upsert', table, record)
  }

  /**
   * Bulk insert records
   */
  async bulkCreate(table: string, records: SheetRecord[]): Promise<SheetResponse> {
    return this.callSheetAPI('bulk', table, records)
  }

  /**
   * Read all records from a table
   */
  async readAll(table: string): Promise<SheetRecord[]> {
    const response = await this.callSheetAPI('read', table)
    if (!response.success || !response.records) {
      throw new Error(response.error || 'Failed to read records')
    }
    return response.records
  }

  /**
   * Check if service is configured
   */
  isConfigured(): boolean {
    return !!this.baseUrl
  }
}

export const googleSheetsService = new GoogleSheetsService()
