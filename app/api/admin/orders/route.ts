import { orderDataService } from '@/lib/services/order-data-service'
import { withAdminAuth, withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { createOrderSchema } from '@/lib/validations/order-schemas'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'

// GET all orders
export const GET = withAuth(async () => {
  try {
    const orders = await orderDataService.getAllOrders()
    const transformedOrders = orders.map(transformRecordForResponse)
    return successResponse(transformedOrders)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch orders',
    })
  }
})

// POST create new order
export const POST = withAdminAuth(async (request: Request) => {
  try {
    const body = await request.json()
    // Note: createOrderSchema is partial, so we validate manually for required fields
    const { orderNumber, customerName, customerPhone, streetAddress, paymentMethod, items, total } = body

    if (!orderNumber || !customerName || !customerPhone || !streetAddress || !paymentMethod || !items || !total) {
      return errorResponse(null, {
        status: 400,
        message: 'Missing required fields: orderNumber, customerName, customerPhone, streetAddress, paymentMethod, items, total',
      })
    }

    const validatedData = await validateRequestBody(request, createOrderSchema)

    const order = await orderDataService.createOrder({
      orderNumber,
      customerName: validatedData.customerName || customerName,
      customerEmail: validatedData.customerEmail || null,
      customerPhone: validatedData.customerPhone || customerPhone,
      userId: body.userId || null,
      streetAddress: validatedData.streetAddress || streetAddress,
      wardName: validatedData.wardName || null,
      districtName: validatedData.districtName || null,
      provinceName: validatedData.provinceName || null,
      status: validatedData.status || 'pending',
      paymentMethod: validatedData.paymentMethod || paymentMethod,
      items,
      total,
      notes: validatedData.notes || null,
    })

    const transformedOrder = transformRecordForResponse(order)
    return successResponse(transformedOrder, {
      status: 201,
      message: 'Order created successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to create order',
    })
  }
})
