import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform to match expected format
    const formattedOrders = orders.map((order) => ({
      ...order,
      userName: order.user?.name || null,
      userEmail: order.user?.email || null,
    }))

    return NextResponse.json({ data: formattedOrders })
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
    const { userId, status, total, items, shippingAddress, phone, notes } = body

    if (!userId || !total || !items || !shippingAddress || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const now = Math.floor(Date.now() / 1000)

    const order = await prisma.order.create({
      data: {
        userId,
        status: status || 'pending',
        total,
        items: typeof items === 'string' ? items : JSON.stringify(items),
        shippingAddress,
        phone,
        notes: notes || null,
        createdAt: now,
        updatedAt: now,
      },
    })

    return NextResponse.json(
      { message: 'Order created successfully', id: order.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
