import { orderDataService } from '@/lib/services/order-data-service'
import { NextResponse } from 'next/server'

// GET single order
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await orderDataService.getOrderById(id)

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: { ...order, id: String(order.id || '') } })
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
      items,
      total,
    } = body

    const updateData: any = { id }
    if (status !== undefined) updateData.status = status
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod
    if (notes !== undefined) updateData.notes = notes
    if (customerName !== undefined) updateData.customerName = customerName
    if (customerEmail !== undefined) updateData.customerEmail = customerEmail
    if (customerPhone !== undefined) updateData.customerPhone = customerPhone
    if (streetAddress !== undefined) updateData.streetAddress = streetAddress
    if (wardName !== undefined) updateData.wardName = wardName
    if (districtName !== undefined) updateData.districtName = districtName
    if (provinceName !== undefined) updateData.provinceName = provinceName
    if (items !== undefined) updateData.items = items
    if (total !== undefined) updateData.total = total

    const order = await orderDataService.updateOrder(updateData)

    return NextResponse.json({
      message: 'Order updated successfully',
      data: { ...order, id: String(order.id || '') },
    })
  } catch (error: any) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
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
    const success = await orderDataService.deleteOrder(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete order' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    )
  }
}
