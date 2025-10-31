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

    return NextResponse.json({ data: order })
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
    const {
      status,
      paymentMethod,
      notes,
      customerName,
      customerEmail,
      customerPhone,
      streetAddress,
      wardName,
      districtName,
      provinceName,
    } = body

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

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(paymentMethod !== undefined && { paymentMethod }),
        ...(notes !== undefined && { notes }),
        ...(customerName !== undefined && { customerName }),
        ...(customerEmail !== undefined && { customerEmail }),
        ...(customerPhone !== undefined && { customerPhone }),
        ...(streetAddress !== undefined && { streetAddress }),
        ...(wardName !== undefined && { wardName }),
        ...(districtName !== undefined && { districtName }),
        ...(provinceName !== undefined && { provinceName }),
        updatedAt: now,
      },
    })

    return NextResponse.json({
      message: 'Order updated successfully',
      data: updatedOrder,
    })
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
