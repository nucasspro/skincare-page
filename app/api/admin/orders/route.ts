import { orderDataService } from '@/lib/services/order-data-service'
import { NextResponse } from 'next/server'

// GET all orders
export async function GET() {
  try {
    const orders = await orderDataService.getAllOrders()
    return NextResponse.json({
      data: orders.map(o => ({ ...o, id: String(o.id || '') }))
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST create new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderNumber, customerName, customerEmail, customerPhone, userId, streetAddress, wardName, districtName, provinceName, status, paymentMethod, items, total, notes } = body

    if (!orderNumber || !customerName || !customerPhone || !streetAddress || !paymentMethod || !items || !total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await orderDataService.createOrder({
      orderNumber,
      customerName,
      customerEmail: customerEmail || null,
      customerPhone,
      userId: userId || null,
      streetAddress,
      wardName: wardName || null,
      districtName: districtName || null,
      provinceName: provinceName || null,
      status: status || 'pending',
      paymentMethod,
      items,
      total,
      notes: notes || null,
    })

    return NextResponse.json(
      { message: 'Order created successfully', data: { ...order, id: String(order.id || '') } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
