import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding reviews...')

  const products = await prisma.product.findMany()

  if (products.length === 0) {
    console.log('⚠️  No products found. Please seed products first.')
    return
  }

  const reviews = [
    {
      productId: products[0]?.id || '',
      reviewerName: 'Nguyễn Minh Anh',
      rating: 5,
      review: 'Sản phẩm này đã thay đổi hoàn toàn làn da của mình! Chỉ sau 2 tuần, da đã cải thiện rõ rệt về độ ẩm và kết cấu. Da mình căng mọng và rạng rỡ hơn hẳn.',
      createdAt: Math.floor(Date.now() / 1000) - 1209600, // 2 weeks ago
      updatedAt: Math.floor(Date.now() / 1000) - 1209600,
    },
    {
      productId: products[0]?.id || '',
      reviewerName: 'Trần Thanh Hương',
      rating: 5,
      review: 'Mình đã thử nhiều essence nhưng sản phẩm này là tốt nhất! Thấm nhanh không để lại cảm giác dính rít. Các nếp nhăn li ti đã mờ đi đáng kể!',
      createdAt: Math.floor(Date.now() / 1000) - 2592000, // 1 month ago
      updatedAt: Math.floor(Date.now() / 1000) - 2592000,
    },
    {
      productId: products[0]?.id || '',
      reviewerName: 'Phạm Linh Chi',
      rating: 4,
      review: 'Da mình nhạy cảm và mụn nhiều, dùng sản phẩm này không bị kích ứng mà còn giúp da hết mụn hẳn. Cảm ơn thương hiệu rất nhiều!',
      createdAt: Math.floor(Date.now() / 1000) - 1814400, // 3 weeks ago
      updatedAt: Math.floor(Date.now() / 1000) - 1814400,
    },
    {
      productId: products[1]?.id || '',
      reviewerName: 'Lê Hoàng Yến',
      rating: 5,
      review: 'Serum Vitamin C này thấm nhanh, không gây kích ứng. Sau 1 tuần sử dụng, da sáng hơn rõ rệt. Mình rất hài lòng!',
      createdAt: Math.floor(Date.now() / 1000) - 604800, // 1 week ago
      updatedAt: Math.floor(Date.now() / 1000) - 604800,
    },
    {
      productId: products[1]?.id || '',
      reviewerName: 'Đỗ Minh Tâm',
      rating: 5,
      review: 'Kem dưỡng này đúng là tuyệt vời! Da mịn màng và căng bóng hơn nhiều. Mình đã recommend cho bạn bè rồi!',
      createdAt: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 259200,
    },
    {
      productId: products[2]?.id || '',
      reviewerName: 'Võ Thu Hà',
      rating: 4,
      review: 'Sản phẩm tốt, đóng gói đẹp, ship nhanh. Da mình dùng thấy hợp lắm!',
      createdAt: Math.floor(Date.now() / 1000) - 432000, // 5 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 432000,
    },
    {
      productId: products[2]?.id || '',
      reviewerName: 'Bùi Khánh Linh',
      rating: 5,
      review: 'Chất kem mịn, thấm nhanh. Da mình khô mà dùng rất ổn, không bị bết dính!',
      createdAt: Math.floor(Date.now() / 1000) - 864000, // 10 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 864000,
    },
    {
      productId: products[3]?.id || '',
      reviewerName: 'Hoàng Thị Mai',
      rating: 5,
      review: 'Mặt nạ này làm da sáng lên ngay sau lần đầu dùng. Giá hơi cao nhưng chất lượng xứng đáng!',
      createdAt: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
      updatedAt: Math.floor(Date.now() / 1000) - 172800,
    },
  ]

  for (const review of reviews) {
    if (review.productId) {
      await prisma.review.create({
        data: review,
      })
      console.log(`✅ Created review by ${review.reviewerName}`)
    }
  }

  console.log('✅ Review seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding reviews:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
