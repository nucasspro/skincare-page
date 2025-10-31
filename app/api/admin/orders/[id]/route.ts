import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET single order
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Transform to match expected format
    const formattedOrder = {
      ...order,
      userName: order.user?.name || null,
      userEmail: order.user?.email || null,
    }

    return NextResponse.json({ data: formattedOrder })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PUT update order
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, shippingAddress, phone, notes } = body

    const existing = await prisma.order.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const now = Math.floor(Date.now() / 1000)

    await prisma.order.update({
      where: { id },
      data: {
        status: status || 'pending',
        shippingAddress,
        phone,
        notes: notes || null,
        updatedAt: now,
      },
    })

    return NextResponse.json({ message: 'Order updated successfully' })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

// DELETE order
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    try {
      await prisma.order.delete({
        where: { id },
      })
      return NextResponse.json({ message: 'Order deleted successfully' })
    } catch (error: any) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }
      throw error
    }
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    )
  }
}
