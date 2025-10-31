import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding orders...')

  const orders = [
    {
      orderNumber: 'ORD-17601178',
      customerName: 'Nguyễn Văn An',
      customerPhone: '0901234567',
      customerEmail: 'nguyenvanan@gmail.com',
      streetAddress: '123 Nguyễn Huệ',
      wardName: 'Phường Bến Nghé',
      districtName: 'Quận 1',
      provinceName: 'TP. Hồ Chí Minh',
      paymentMethod: 'cod',
      status: 'pending',
      total: 1250000,
      items: JSON.stringify([
        {
          id: '1',
          name: 'Hydrating Essence Serum',
          price: 625000,
          quantity: 2,
          image: '/luxury-skincare-essence-bottle-minimal-white-backg.jpg'
        }
      ]),
      createdAt: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 172800,
    },
    {
      orderNumber: 'ORD-17590234',
      customerName: 'Trần Thị Bình',
      customerPhone: '0912345678',
      customerEmail: 'tranthibinh@gmail.com',
      streetAddress: '456 Lê Lợi',
      wardName: 'Phường Nguyễn Thái Bình',
      districtName: 'Quận 1',
      provinceName: 'TP. Hồ Chí Minh',
      paymentMethod: 'bank',
      status: 'confirmed',
      total: 2850000,
      items: JSON.stringify([
        {
          id: '2',
          name: 'Vitamin C Brightening Serum',
          price: 950000,
          quantity: 3,
          image: '/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg'
        }
      ]),
      createdAt: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
    },
    {
      orderNumber: 'ORD-17589123',
      customerName: 'Lê Hoàng Cường',
      customerPhone: '0923456789',
      streetAddress: '789 Võ Văn Tần',
      wardName: 'Phường 6',
      districtName: 'Quận 3',
      provinceName: 'TP. Hồ Chí Minh',
      paymentMethod: 'cod',
      status: 'shipping',
      total: 1800000,
      items: JSON.stringify([
        {
          id: '3',
          name: 'Night Recovery Cream',
          price: 900000,
          quantity: 2,
          image: '/luxury-night-cream-jar-minimal-white-background.jpg'
        }
      ]),
      createdAt: Math.floor(Date.now() / 1000) - 432000, // 5 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
    },
    {
      orderNumber: 'ORD-17585567',
      customerName: 'Phạm Minh Đức',
      customerPhone: '0934567890',
      customerEmail: 'phamminhduc@yahoo.com',
      streetAddress: '12 Hai Bà Trưng',
      wardName: 'Phường Bến Nghé',
      districtName: 'Quận 1',
      provinceName: 'TP. Hồ Chí Minh',
      paymentMethod: 'bank',
      status: 'delivered',
      total: 3200000,
      items: JSON.stringify([
        {
          id: '1',
          name: 'Hydrating Essence Serum',
          price: 625000,
          quantity: 2,
          image: '/luxury-skincare-essence-bottle-minimal-white-backg.jpg'
        },
        {
          id: '2',
          name: 'Vitamin C Brightening Serum',
          price: 950000,
          quantity: 2,
          image: '/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg'
        }
      ]),
      createdAt: Math.floor(Date.now() / 1000) - 604800, // 7 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
    },
    {
      orderNumber: 'ORD-17580912',
      customerName: 'Võ Thị Lan',
      customerPhone: '0945678901',
      streetAddress: '67 Nguyễn Đình Chiểu',
      wardName: 'Phường Đa Kao',
      districtName: 'Quận 1',
      provinceName: 'TP. Hồ Chí Minh',
      paymentMethod: 'cod',
      status: 'cancelled',
      total: 625000,
      items: JSON.stringify([
        {
          id: '1',
          name: 'Hydrating Essence Serum',
          price: 625000,
          quantity: 1,
          image: '/luxury-skincare-essence-bottle-minimal-white-backg.jpg'
        }
      ]),
      notes: 'Khách hàng yêu cầu hủy đơn',
      createdAt: Math.floor(Date.now() / 1000) - 864000, // 10 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 777600, // 9 days ago
    },
    {
      orderNumber: 'ORD-17576345',
      customerName: 'Đặng Văn Nam',
      customerPhone: '0956789012',
      customerEmail: 'dangvannam@outlook.com',
      streetAddress: '234 Pasteur',
      wardName: 'Phường 8',
      districtName: 'Quận 3',
      provinceName: 'TP. Hồ Chí Minh',
      paymentMethod: 'bank',
      status: 'pending',
      total: 4500000,
      items: JSON.stringify([
        {
          id: '2',
          name: 'Vitamin C Brightening Serum',
          price: 950000,
          quantity: 2,
          image: '/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg'
        },
        {
          id: '3',
          name: 'Night Recovery Cream',
          price: 900000,
          quantity: 3,
          image: '/luxury-night-cream-jar-minimal-white-background.jpg'
        }
      ]),
      createdAt: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
      updatedAt: Math.floor(Date.now() / 1000) - 86400,
    },
  ]

  for (const order of orders) {
    await prisma.order.create({
      data: order,
    })
    console.log(`✅ Created order ${order.orderNumber}`)
  }

  console.log('✅ Order seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding orders:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
