/**
 * Order Export API
 * Export orders in different formats and report types
 */

import { orderDataService } from '@/lib/services/order-data-service'
import { formatDate } from '@/lib/utils'
import ExcelJS from 'exceljs'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv' // csv, json, xlsx
    const reportType = searchParams.get('reportType') || 'all' // all, sales, status, customer, revenue
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')

    // Get all orders
    let orders = await orderDataService.getAllOrders()

    // Filter by date range if provided
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate + 'T00:00:00.000Z').getTime() : 0
      const end = endDate ? new Date(endDate + 'T23:59:59.999Z').getTime() : Date.now()
      orders = orders.filter(order => {
        let orderDate: number
        const createdAt = order.createdAt as any
        if (typeof createdAt === 'string') {
          orderDate = new Date(createdAt).getTime()
        } else if (createdAt instanceof Date) {
          orderDate = createdAt.getTime()
        } else {
          orderDate = createdAt as number
        }
        return orderDate >= start && orderDate <= end
      })
    }

    // Filter by status if provided
    if (status && status !== 'all') {
      orders = orders.filter(order => order.status === status)
    }

    // Generate report based on type
    let exportData: any
    let filename: string
    let contentType: string

    // Handle Excel format
    if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Orders')

      // Generate headers and data based on report type
      let headers: string[] = []
      let rows: any[][] = []

      switch (reportType) {
        case 'sales':
          headers = ['Mã đơn', 'Ngày', 'Khách hàng', 'Tổng tiền', 'Trạng thái', 'Thanh toán', 'Sản phẩm']
          rows = generateSalesReportData(orders)
          break
        case 'status':
          headers = ['Trạng thái', 'Số lượng', 'Tổng doanh thu', 'Danh sách đơn hàng']
          rows = generateStatusReportData(orders)
          break
        case 'customer':
          headers = ['Tên khách hàng', 'Email', 'Số điện thoại', 'Số đơn hàng', 'Tổng chi tiêu', 'Danh sách đơn']
          rows = generateCustomerReportData(orders)
          break
        case 'revenue':
          headers = ['Ngày', 'Số đơn hàng', 'Doanh thu', 'Danh sách đơn']
          rows = generateRevenueReportData(orders)
          break
        default:
          headers = ['Mã đơn hàng', 'Tên khách hàng', 'Email', 'Số điện thoại', 'Địa chỉ', 'Trạng thái', 'Phương thức thanh toán', 'Tổng tiền', 'Số lượng sản phẩm', 'Ghi chú', 'Ngày đặt', 'Ngày cập nhật']
          rows = generateAllOrdersReportData(orders)
      }

      // Add headers
      worksheet.addRow(headers)
      // Style header row
      const headerRow = worksheet.getRow(1)
      headerRow.font = { bold: true }
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE5E7EB' }
      }

      // Add data rows
      rows.forEach(row => {
        const worksheetRow = worksheet.addRow(row)
        // Set text format for cells that might have leading zeros (like phone numbers)
        row.forEach((cell, index) => {
          if (typeof cell === 'string' && /^0\d/.test(cell)) {
            worksheetRow.getCell(index + 1).numFmt = '@' // Text format
          }
        })
      })

      // Auto-fit columns
      worksheet.columns.forEach(column => {
        column.width = 15
      })

      // Generate buffer
      const buffer = await workbook.xlsx.writeBuffer()
      filename = `${reportType === 'all' ? 'orders' : `${reportType}-report`}-${Date.now()}.xlsx`
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        },
      })
    }

    // Handle CSV and JSON formats
    switch (reportType) {
      case 'sales':
        exportData = generateSalesReport(orders, format)
        filename = `sales-report-${Date.now()}.${format === 'json' ? 'json' : 'csv'}`
        break
      case 'status':
        exportData = generateStatusReport(orders, format)
        filename = `status-report-${Date.now()}.${format === 'json' ? 'json' : 'csv'}`
        break
      case 'customer':
        exportData = generateCustomerReport(orders, format)
        filename = `customer-report-${Date.now()}.${format === 'json' ? 'json' : 'csv'}`
        break
      case 'revenue':
        exportData = generateRevenueReport(orders, format)
        filename = `revenue-report-${Date.now()}.${format === 'json' ? 'json' : 'csv'}`
        break
      default:
        exportData = generateAllOrdersReport(orders, format)
        filename = `orders-${Date.now()}.${format === 'json' ? 'json' : 'csv'}`
    }

    // Set content type
    if (format === 'json') {
      contentType = 'application/json; charset=utf-8'
    } else {
      contentType = 'text/csv; charset=utf-8'
      // Add UTF-8 BOM for Excel compatibility with Vietnamese characters
      exportData = '\uFEFF' + exportData
    }

    // Return response
    return new NextResponse(exportData, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting orders:', error)
    return NextResponse.json(
      { error: 'Failed to export orders' },
      { status: 500 }
    )
  }
}

// Generate all orders report
function generateAllOrdersReport(orders: any[], format: string): string {
  if (format === 'json') {
    return JSON.stringify(orders, null, 2)
  }

  // CSV format
  const headers = [
    'Mã đơn hàng',
    'Tên khách hàng',
    'Email',
    'Số điện thoại',
    'Địa chỉ',
    'Trạng thái',
    'Phương thức thanh toán',
    'Tổng tiền',
    'Số lượng sản phẩm',
    'Ghi chú',
    'Ngày đặt',
    'Ngày cập nhật',
  ]

  const rows = orders.map(order => {
    const items = parseItems(order.items)
    const totalQuantity = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)

    return [
      order.orderNumber,
      order.customerName,
      order.customerEmail || '',
      order.customerPhone,
      formatAddress(order.address),
      order.status,
      order.paymentMethod,
      order.total.toString(),
      totalQuantity.toString(),
      order.notes || '',
      formatDate(order.createdAt),
      formatDate(order.updatedAt),
    ]
  })

  return [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
}

// Generate sales report
function generateSalesReport(orders: any[], format: string): string {
  const salesData = orders.map(order => {
    const items = parseItems(order.items)
    const itemsText = items.map((item: any) => `${item.name || item.productName || 'Unknown'} x${item.quantity || 0}`).join('; ')

    return {
      orderNumber: order.orderNumber,
      date: formatDate(order.createdAt),
      customerName: order.customerName,
      total: order.total,
      status: order.status,
      paymentMethod: order.paymentMethod,
      items: itemsText,
    }
  })

  if (format === 'json') {
    return JSON.stringify(salesData, null, 2)
  }

  // CSV format
  const headers = ['Mã đơn', 'Ngày', 'Khách hàng', 'Tổng tiền', 'Trạng thái', 'Thanh toán', 'Sản phẩm']
  const rows = salesData.map(order => [
    order.orderNumber,
    order.date,
    order.customerName,
    order.total.toString(),
    order.status,
    order.paymentMethod,
    order.items,
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
}

// Generate status report
function generateStatusReport(orders: any[], format: string): string {
  const statusCounts: Record<string, any[]> = {}
  orders.forEach(order => {
    if (!statusCounts[order.status]) {
      statusCounts[order.status] = []
    }
    statusCounts[order.status].push(order)
  })

  const report = Object.entries(statusCounts).map(([status, orders]) => ({
    status,
    count: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    orders: orders.map((o: any) => o.orderNumber),
  }))

  if (format === 'json') {
    return JSON.stringify(report, null, 2)
  }

  // CSV format
  const headers = ['Trạng thái', 'Số lượng', 'Tổng doanh thu', 'Danh sách đơn hàng']
  const rows = report.map(r => [
    r.status,
    r.count.toString(),
    r.totalRevenue.toString(),
    r.orders.join('; '),
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
}

// Generate customer report
function generateCustomerReport(orders: any[], format: string): string {
  const customerMap: Record<string, any> = {}
  orders.forEach(order => {
    const key = order.customerPhone || order.customerEmail || order.customerName
    if (!customerMap[key]) {
      customerMap[key] = {
        name: order.customerName,
        email: order.customerEmail || '',
        phone: order.customerPhone || '',
        totalOrders: 0,
        totalSpent: 0,
        orders: [],
      }
    }
    customerMap[key].totalOrders++
    customerMap[key].totalSpent += order.total
    customerMap[key].orders.push(order.orderNumber)
  })

  const report = Object.values(customerMap)

  if (format === 'json') {
    return JSON.stringify(report, null, 2)
  }

  // CSV format
  const headers = ['Tên khách hàng', 'Email', 'Số điện thoại', 'Số đơn hàng', 'Tổng chi tiêu', 'Danh sách đơn']
  const rows = report.map((c: any) => [
    c.name,
    c.email,
    c.phone,
    c.totalOrders.toString(),
    c.totalSpent.toString(),
    c.orders.join('; '),
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
}

// Generate revenue report
function generateRevenueReport(orders: any[], format: string): string {
  // Group by date
  const revenueByDate: Record<string, any> = {}
  orders.forEach(order => {
    const date = formatDate(order.createdAt).split(' ')[0] // Get date only
    if (!revenueByDate[date]) {
      revenueByDate[date] = {
        date,
        orders: 0,
        revenue: 0,
        orderNumbers: [],
      }
    }
    revenueByDate[date].orders++
    revenueByDate[date].revenue += order.total
    revenueByDate[date].orderNumbers.push(order.orderNumber)
  })

  const report = Object.values(revenueByDate).sort((a: any, b: any) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  if (format === 'json') {
    return JSON.stringify(report, null, 2)
  }

  // CSV format
  const headers = ['Ngày', 'Số đơn hàng', 'Doanh thu', 'Danh sách đơn']
  const rows = report.map((r: any) => [
    r.date,
    r.orders.toString(),
    r.revenue.toString(),
    r.orderNumbers.join('; '),
  ])

  return [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
}

// Helper function to parse items (handle both string and array)
function parseItems(items: any): any[] {
  if (!items) return []
  if (Array.isArray(items)) return items
  if (typeof items === 'string') {
    try {
      const parsed = JSON.parse(items)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

// Generate data for Excel format - All Orders
function generateAllOrdersReportData(orders: any[]): any[][] {
  return orders.map(order => {
    const items = parseItems(order.items)
    const totalQuantity = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)

    return [
      order.orderNumber,
      order.customerName,
      order.customerEmail || '',
      order.customerPhone,
      formatAddress(order.address),
      order.status,
      order.paymentMethod,
      order.total,
      totalQuantity,
      order.notes || '',
      formatDate(order.createdAt),
      formatDate(order.updatedAt),
    ]
  })
}

// Generate data for Excel format - Sales Report
function generateSalesReportData(orders: any[]): any[][] {
  return orders.map(order => {
    const items = parseItems(order.items)
    const itemsText = items.map((item: any) => `${item.name || item.productName || 'Unknown'} x${item.quantity || 0}`).join('; ')

    return [
      order.orderNumber,
      formatDate(order.createdAt),
      order.customerName,
      order.total,
      order.status,
      order.paymentMethod,
      itemsText,
    ]
  })
}

// Generate data for Excel format - Status Report
function generateStatusReportData(orders: any[]): any[][] {
  const statusCounts: Record<string, any[]> = {}
  orders.forEach(order => {
    if (!statusCounts[order.status]) {
      statusCounts[order.status] = []
    }
    statusCounts[order.status].push(order)
  })

  return Object.entries(statusCounts).map(([status, orders]) => [
    status,
    orders.length,
    orders.reduce((sum, o) => sum + o.total, 0),
    orders.map((o: any) => o.orderNumber).join('; '),
  ])
}

// Generate data for Excel format - Customer Report
function generateCustomerReportData(orders: any[]): any[][] {
  const customerMap: Record<string, any> = {}
  orders.forEach(order => {
    const key = order.customerPhone || order.customerEmail || order.customerName
    if (!customerMap[key]) {
      customerMap[key] = {
        name: order.customerName,
        email: order.customerEmail || '',
        phone: order.customerPhone || '',
        totalOrders: 0,
        totalSpent: 0,
        orders: [],
      }
    }
    customerMap[key].totalOrders++
    customerMap[key].totalSpent += order.total
    customerMap[key].orders.push(order.orderNumber)
  })

  return Object.values(customerMap).map((c: any) => [
    c.name,
    c.email,
    c.phone,
    c.totalOrders,
    c.totalSpent,
    c.orders.join('; '),
  ])
}

// Generate data for Excel format - Revenue Report
function generateRevenueReportData(orders: any[]): any[][] {
  const revenueByDate: Record<string, any> = {}
  orders.forEach(order => {
    const date = formatDate(order.createdAt).split(' ')[0]
    if (!revenueByDate[date]) {
      revenueByDate[date] = {
        date,
        orders: 0,
        revenue: 0,
        orderNumbers: [],
      }
    }
    revenueByDate[date].orders++
    revenueByDate[date].revenue += order.total
    revenueByDate[date].orderNumbers.push(order.orderNumber)
  })

  return Object.values(revenueByDate)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((r: any) => [
      r.date,
      r.orders,
      r.revenue,
      r.orderNumbers.join('; '),
    ])
}

// Helper function to format address
function formatAddress(address: any): string {
  if (!address) return ''
  if (typeof address === 'string') return address
  const parts = [
    address.street,
    address.ward,
    address.district,
    address.province,
  ].filter(Boolean)
  return parts.join(', ')
}
