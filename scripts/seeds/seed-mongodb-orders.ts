/**
 * Seed Orders for MongoDB
 * Generate sample orders based on order structure from save-to-sheets route
 * Usage: npx tsx scripts/seeds/seed-mongodb-orders.ts
 *
 * Note: This requires products to be seeded first!
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { MongoDataSource } from '@/lib/services/data-sources/mongodb'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

// Sample order data based on order structure from save-to-sheets route
// Generate orders with realistic Vietnamese customer data
const SAMPLE_ORDERS = [
  {
    orderNumber: "ORD-2024-001",
    customerName: "Nguyễn Văn An",
    customerPhone: "0901234567",
    customerEmail: "nguyenvanan@gmail.com",
    streetAddress: "123 Nguyễn Huệ",
    wardName: "Phường Bến Nghé",
    districtName: "Quận 1",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "cod",
    status: "pending",
    items: [
      {
        name: "Bright Matte Sunscreen",
        price: 219000,
        quantity: 2,
        image: "/image-product/kcnxanhduong/1.png",
      }
    ],
    totalItems: 2,
    totalPrice: 438000,
    createdAt: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
  },
  {
    orderNumber: "ORD-2024-002",
    customerName: "Trần Thị Bình",
    customerPhone: "0912345678",
    customerEmail: "tranthibinh@gmail.com",
    streetAddress: "456 Lê Lợi",
    wardName: "Phường Nguyễn Thái Bình",
    districtName: "Quận 1",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "bank",
    status: "confirmed",
    items: [
      {
        name: "Cellic Calm Defense Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnxanhlacay/18.png",
      },
      {
        name: "Cellic Dew Shield Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnmauvang/ANHWEBSTE-2.png",
      }
    ],
    totalItems: 2,
    totalPrice: 438000,
    createdAt: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
  },
  {
    orderNumber: "ORD-2024-003",
    customerName: "Lê Hoàng Cường",
    customerPhone: "0923456789",
    customerEmail: null,
    streetAddress: "789 Võ Văn Tần",
    wardName: "Phường 6",
    districtName: "Quận 3",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "cod",
    status: "shipping",
    items: [
      {
        name: "Cellic Right Match Lumi Sunscreen",
        price: 219000,
        quantity: 3,
        image: "/image-product/kcnmautim/16.png",
      }
    ],
    totalItems: 3,
    totalPrice: 657000,
    createdAt: Math.floor(Date.now() / 1000) - 432000, // 5 days ago
  },
  {
    orderNumber: "ORD-2024-004",
    customerName: "Phạm Minh Đức",
    customerPhone: "0934567890",
    customerEmail: "phamminhduc@yahoo.com",
    streetAddress: "12 Hai Bà Trưng",
    wardName: "Phường Bến Nghé",
    districtName: "Quận 1",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "bank",
    status: "delivered",
    items: [
      {
        name: "Bright Matte Sunscreen",
        price: 219000,
        quantity: 2,
        image: "/image-product/kcnxanhduong/1.png",
      },
      {
        name: "Cellic Calm Defense Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnxanhlacay/18.png",
      }
    ],
    totalItems: 3,
    totalPrice: 657000,
    createdAt: Math.floor(Date.now() / 1000) - 604800, // 7 days ago
  },
  {
    orderNumber: "ORD-2024-005",
    customerName: "Võ Thị Lan",
    customerPhone: "0945678901",
    customerEmail: "vothilan@gmail.com",
    streetAddress: "67 Nguyễn Đình Chiểu",
    wardName: "Phường Đa Kao",
    districtName: "Quận 1",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "cod",
    status: "cancelled",
    items: [
      {
        name: "Bright Matte Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnxanhduong/1.png",
      }
    ],
    totalItems: 1,
    totalPrice: 219000,
    notes: "Khách hàng yêu cầu hủy đơn",
    createdAt: Math.floor(Date.now() / 1000) - 864000, // 10 days ago
  },
  {
    orderNumber: "ORD-2024-006",
    customerName: "Đặng Văn Nam",
    customerPhone: "0956789012",
    customerEmail: "dangvannam@outlook.com",
    streetAddress: "234 Pasteur",
    wardName: "Phường 8",
    districtName: "Quận 3",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "bank",
    status: "pending",
    items: [
      {
        name: "Cellic Dew Shield Sunscreen",
        price: 219000,
        quantity: 2,
        image: "/image-product/kcnmauvang/ANHWEBSTE-2.png",
      },
      {
        name: "Cellic Right Match Lumi Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnmautim/16.png",
      }
    ],
    totalItems: 3,
    totalPrice: 657000,
    createdAt: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
  },
  {
    orderNumber: "ORD-2024-007",
    customerName: "Hoàng Thị Mai",
    customerPhone: "0967890123",
    customerEmail: "hoangthimai@gmail.com",
    streetAddress: "89 Điện Biên Phủ",
    wardName: "Phường 25",
    districtName: "Quận Bình Thạnh",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "cod",
    status: "shipping",
    items: [
      {
        name: "Bright Matte Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnxanhduong/1.png",
      },
      {
        name: "Cellic Calm Defense Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnxanhlacay/18.png",
      },
      {
        name: "Cellic Dew Shield Sunscreen",
        price: 219000,
        quantity: 1,
        image: "/image-product/kcnmauvang/ANHWEBSTE-2.png",
      }
    ],
    totalItems: 3,
    totalPrice: 657000,
    createdAt: Math.floor(Date.now() / 1000) - 345600, // 4 days ago
  },
  {
    orderNumber: "ORD-2024-008",
    customerName: "Bùi Thị Linh",
    customerPhone: "0978901234",
    customerEmail: null,
    streetAddress: "145 Nguyễn Văn Cừ",
    wardName: "Phường 5",
    districtName: "Quận 5",
    provinceName: "TP. Hồ Chí Minh",
    paymentMethod: "bank",
    status: "delivered",
    items: [
      {
        name: "Cellic Right Match Lumi Sunscreen",
        price: 219000,
        quantity: 2,
        image: "/image-product/kcnmautim/16.png",
      }
    ],
    totalItems: 2,
    totalPrice: 438000,
    createdAt: Math.floor(Date.now() / 1000) - 518400, // 6 days ago
  },
]

async function main() {
  console.log('🌱 Seeding orders to MongoDB...\n')

  const mongoDataSource = new MongoDataSource()

  // Get products to map product names to IDs (optional, but better for data integrity)
  console.log('📦 Fetching products...')
  const products = await mongoDataSource.getAllProducts()
  const productNameMap = new Map<string, string>()

  products.forEach(product => {
    productNameMap.set(product.name, product.id)
  })

  let created = 0
  let skipped = 0
  let errors = 0

  for (const order of SAMPLE_ORDERS) {
    try {
      // Map items to include productId if product exists
      const mappedItems = order.items.map(item => {
        const productId = productNameMap.get(item.name) || item.name.toLowerCase().replace(/\s+/g, '-')
        return {
          productId: productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        }
      })

      await mongoDataSource.createOrder({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail || null,
        customerPhone: order.customerPhone,
        userId: null, // Can be set if users are seeded
        streetAddress: order.streetAddress,
        wardName: order.wardName || null,
        districtName: order.districtName || null,
        provinceName: order.provinceName || null,
        status: order.status,
        paymentMethod: order.paymentMethod,
        items: mappedItems,
        total: order.totalPrice,
        notes: order.notes || null,
      })

      console.log(`✅ Created order ${order.orderNumber} - ${order.customerName} (${order.status})`)
      created++
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate') || error.message?.includes('unique')) {
        console.log(`⚠️  Order already exists: ${order.orderNumber}, skipping...`)
        skipped++
      } else {
        console.error(`❌ Error creating order ${order.orderNumber}:`, error.message)
        errors++
      }
    }
  }

  console.log(`\n✅ Order seeding completed!`)
  console.log(`   Created: ${created}, Skipped: ${skipped}, Errors: ${errors}, Total: ${SAMPLE_ORDERS.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
