import { NextRequest, NextResponse } from "next/server"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderData {
  orderNumber: string
  name: string
  phone: string
  streetAddress: string
  provinceName?: string
  districtName?: string
  wardName?: string
  paymentMethod: "cod" | "bank" | null
  items: OrderItem[]
  totalPrice: number
  totalItems: number
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json()

    // Google Apps Script Web App URL
    // TODO: Thay thế URL này bằng Google Apps Script Web App URL của bạn
    // Hướng dẫn setup:
    // 1. Tạo Google Sheet mới
    // 2. Mở Tools > Script editor
    // 3. Paste script từ file google-apps-script.txt
    // 4. Chạy script và authorize
    // 5. Deploy > New deployment > Web app
    // 6. Copy Web app URL và paste vào biến GOOGLE_SHEETS_WEB_APP_URL
    const GOOGLE_SHEETS_WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL || ""

    if (!GOOGLE_SHEETS_WEB_APP_URL) {
      console.warn("Google Sheets Web App URL chưa được cấu hình")
      // Trả về success để không làm gián đoạn flow, nhưng log warning
      return NextResponse.json({ 
        success: true, 
        message: "Order saved (Google Sheets not configured)",
        warning: "GOOGLE_SHEETS_WEB_APP_URL not configured"
      })
    }

    // Format dữ liệu cho Google Sheets
    const sheetData = {
      timestamp: orderData.createdAt,
      orderNumber: orderData.orderNumber,
      customerName: orderData.name,
      customerPhone: orderData.phone,
      address: [
        orderData.streetAddress,
        orderData.wardName,
        orderData.districtName,
        orderData.provinceName
      ].filter(Boolean).join(", "),
      paymentMethod: orderData.paymentMethod === "cod" ? "COD" : orderData.paymentMethod === "bank" ? "Chuyển khoản" : "Chưa xác định",
      items: orderData.items.map(item => 
        `${item.name} (x${item.quantity}) - ${item.price.toLocaleString("vi-VN")}đ`
      ).join("; "),
      totalItems: orderData.totalItems,
      totalPrice: orderData.totalPrice.toLocaleString("vi-VN") + "đ"
    }

    // Gửi dữ liệu đến Google Apps Script
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    })

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({ 
      success: true, 
      message: "Order saved to Google Sheets successfully",
      data: result
    })

  } catch (error) {
    console.error("Error saving order to Google Sheets:", error)
    
    // Không throw error để không làm gián đoạn checkout flow
    // Chỉ log và trả về success với warning
    return NextResponse.json({ 
      success: true, 
      message: "Order processed (Google Sheets save failed)",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 200 })
  }
}
