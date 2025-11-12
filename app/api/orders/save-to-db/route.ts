import { orderDataService } from "@/lib/services/order-data-service"
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

    // Map OrderData to CreateOrderData format
    const createOrderData = {
      orderNumber: orderData.orderNumber,
      customerName: orderData.name,
      customerPhone: orderData.phone,
      customerEmail: null, // OrderData doesn't have email
      userId: null, // Can be set later if user is logged in
      streetAddress: orderData.streetAddress,
      wardName: orderData.wardName || null,
      districtName: orderData.districtName || null,
      provinceName: orderData.provinceName || null,
      status: "pending", // Default status
      paymentMethod: orderData.paymentMethod || "cod",
      items: orderData.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total: orderData.totalPrice,
      notes: null, // Can be added later if needed
    }

    // Save to database
    const order = await orderDataService.createOrder(createOrderData)

    return NextResponse.json({
      success: true,
      message: "Order saved to database successfully",
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
      }
    })

  } catch (error) {
    console.error("Error saving order to database:", error)

    // Không throw error để không làm gián đoạn checkout flow
    // Chỉ log và trả về success với warning
    return NextResponse.json({
      success: true,
      message: "Order processed (Database save failed)",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 200 })
  }
}
