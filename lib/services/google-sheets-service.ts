/**
 * Google Sheets Service
 * Sync data between Prisma and Google Sheets
 * Each table = one sheet
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

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`)
    }

    return await response.json()
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
