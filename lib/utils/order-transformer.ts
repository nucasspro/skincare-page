/**
 * Order Transformation Utilities
 * Centralized logic for transforming order data
 */

/**
 * Safely parses order items JSON field.
 * Handles cases where the field might be null, undefined, or an invalid JSON string.
 *
 * @param items The items field to parse.
 * @returns Parsed array of OrderItem or empty array.
 */
export function parseOrderItems(items: unknown): Array<{
  id: string
  name: string
  price: number
  quantity: number
  image: string
}> {
  if (items === null || items === undefined) {
    return []
  }
  if (typeof items === 'string') {
    try {
      const parsed = JSON.parse(items)
      if (Array.isArray(parsed)) {
        return parsed
      }
      return []
    } catch (e) {
      console.warn('Failed to parse order items JSON field:', items, e)
      return []
    }
  }
  if (Array.isArray(items)) {
    return items
  }
  return []
}

/**
 * Transforms an order record from the database/API into a standardized Order interface.
 * Handles JSON parsing for 'items' field.
 *
 * @param order The raw order record.
 * @returns The transformed Order object.
 */
export function transformOrderRecord(order: any): any {
  return {
    ...order,
    id: String(order.id || ''),
    items: parseOrderItems(order.items),
  }
}
