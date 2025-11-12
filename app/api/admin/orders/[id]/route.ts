import { withAdminAuth, withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { orderDataService } from '@/lib/services/order-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { updateOrderSchema } from '@/lib/validations/order-schemas'

// GET single order
export const GET = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const order = await orderDataService.getOrderById(id)

    if (!order) {
      return errorResponse(null, {
        status: 404,
        message: 'Order not found',
      })
    }

    const transformedOrder = transformRecordForResponse(order)
    return successResponse(transformedOrder)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch order',
    })
  }
})

// PUT update order
export const PUT = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const validatedData = await validateRequestBody(request, updateOrderSchema)

    const updateData: any = { id }
    if (validatedData.status !== undefined) updateData.status = validatedData.status
    if (validatedData.paymentMethod !== undefined) updateData.paymentMethod = validatedData.paymentMethod
    if (validatedData.notes !== undefined) updateData.notes = validatedData.notes
    if (validatedData.customerName !== undefined) updateData.customerName = validatedData.customerName
    if (validatedData.customerEmail !== undefined) updateData.customerEmail = validatedData.customerEmail
    if (validatedData.customerPhone !== undefined) updateData.customerPhone = validatedData.customerPhone
    if (validatedData.streetAddress !== undefined) updateData.streetAddress = validatedData.streetAddress
    if (validatedData.wardName !== undefined) updateData.wardName = validatedData.wardName
    if (validatedData.districtName !== undefined) updateData.districtName = validatedData.districtName
    if (validatedData.provinceName !== undefined) updateData.provinceName = validatedData.provinceName

    const order = await orderDataService.updateOrder(updateData)
    const transformedOrder = transformRecordForResponse(order)

    return successResponse(transformedOrder, {
      message: 'Order updated successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to update order',
    })
  }
})

// DELETE order
export const DELETE = withAdminAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const success = await orderDataService.deleteOrder(id)

    if (!success) {
      return errorResponse(null, {
        status: 500,
        message: 'Failed to delete order',
      })
    }

    return successResponse(null, {
      message: 'Order deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete order',
    })
  }
})
