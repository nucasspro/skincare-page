/**
 * Seed Products for MongoDB
 * Based on MOCK_PRODUCTS from product-service.ts
 * Usage: npx tsx scripts/seeds/seed-mongodb-products.ts
 */

import { MongoDataSource } from '@/lib/services/data-sources/mongodb'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

// Products data from product-service.ts
const MOCK_PRODUCTS = [
  {
    id: "new",
    slug: "bright-matte-sunscreen",
    name: "Bright Matte Sunscreen",
    tagline: "Bảo vệ và kiểm soát dầu hiệu quả",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "oily",
    needs: ["oily", "uv-protection", "pore"],
    image: "/image-product/kcnxanhduong/1.png",
    hoverImage: "/image-product/kcnxanhduong/8.png",
    images: [
      "/image-product/kcnxanhduong/1.png",
      "/image-product/kcnxanhduong/8.png",
      "/image-product/kcnxanhduong/6.png",
      "/image-product/kcnxanhduong/7.png",
      "/image-product/kcnxanhduong/ANHWEB-3.png"
    ],
    description: "Kem chống nắng kiểm soát dầu hiệu quả, mang lại làn da matte mịn màng và bảo vệ khỏi tia UV với SPF 50+ và PA++++.",
    benefits: [
      "Với công nghệ Booster kèm 4 màng lọc có kích thước hạt nhỏ thông minh tạo lớp bảo vệ bền vững, KCN Cellic Bright Matte kiểm soát và bảo vệ da khỏi tác động tia UVA, UVB và ánh sáng xanh trong suốt 8 giờ. Bổ sung thành phần PDRN cùng chiết xuất hoa kim ngân và công nghệ MicroBiome hỗ trợ cân bằng hệ vi sinh, làm dịu và giảm kích ứng khi tiếp xúc ánh nắng.",
      "Chất kem mỏng nhẹ, thấm nhanh vào da, KCN Cellic Bright Matte tạo lớp bảo vệ tự nhiên, thoáng, mịn, không gây bít tắc lỗ chân lông cho da. KCN Cellic Bright Matte phù hợp với làn da hỗn hợp và hỗn hợp thiên dầu."
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Matte Powder", "Sebum Control", "PDRN"],
  },
  {
    id: "0",
    slug: "cellic-calm-defense-sunscreen",
    name: "Cellic Calm Defense Sunscreen",
    tagline: "Bảo vệ và làm dịu cho da mụn",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "normal",
    needs: ["sensitive", "hydration", "acne"],
    image: "/image-product/kcnxanhlacay/18.png",
    hoverImage: "/image-product/kcnxanhlacay/19.png",
    images: [
      "/image-product/kcnxanhlacay/18.png",
      "/image-product/kcnxanhlacay/19.png",
      "/image-product/kcnxanhlacay/20.png",
      "/image-product/kcnxanhlacay/30.png",
      "/image-product/kcnxanhlacay/ANHWEB-5.png"
    ],
    description: "Kem chống nắng bảo vệ và làm dịu da mụn, phù hợp cho làn da nhạy cảm.",
    benefits: [
      "Bảo vệ khỏi tia UV",
      "Làm dịu da mụn",
      "Công thức không gây bít tắc",
      "Phù hợp với da nhạy cảm"
    ],
    ingredients: ["Zinc Oxide", "Niacinamide", "Calming Extracts", "Hyaluronic Acid"],
  },
  {
    id: "00",
    slug: "cellic-dew-shield-sunscreen",
    name: "Cellic Dew Shield Sunscreen",
    tagline: "Lá chắn ẩm mượt cho da khô",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "dry",
    needs: ["dry", "hydration", "uv-protection"],
    image: "/image-product/kcnmauvang/ANHWEBSTE-2.png",
    hoverImage: "/image-product/kcnmauvang/14.png",
    images: [
      "/image-product/kcnmauvang/ANHWEBSTE-2.png",
      "/image-product/kcnmauvang/14.png",
      "/image-product/kcnmauvang/32.png",
      "/image-product/kcnmauvang/ANHWEB-5.png",
      "/image-product/kcnmauvang/ANHWEB-6.png"
    ],
    description: "Kem chống nắng cấp ẩm sâu, mang lại lớp nền ẩm mượt, bảo vệ da khô khỏi tác hại của tia UV với SPF 50+ và PA++++.",
    benefits: [
      "Bảo vệ da khỏi tia UVA/UVB",
      "Cấp ẩm sâu, dưỡng ẩm lâu dài",
      "Làm mềm mịn da khô",
      "Phù hợp cho da khô và thiếu ẩm"
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Hyaluronic Acid", "Glycerin", "Ceramides", "PDRN"],
  },
  {
    id: "000",
    slug: "cellic-right-match-lumi-sunscreen",
    name: "Cellic Right Match Lumi Sunscreen",
    tagline: "Bảo vệ và hiệu chỉnh màu da tối ưu",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "normal",
    needs: ["brightening", "uv-protection", "color-correction"],
    image: "/image-product/kcnmautim/16.png",
    hoverImage: "/image-product/kcnmautim/15.png",
    images: [
      "/image-product/kcnmautim/16.png",
      "/image-product/kcnmautim/15.png",
      "/image-product/kcnmautim/17.png",
      "/image-product/kcnmautim/31.png",
      "/image-product/kcnmautim/ANHWEB-5.png"
    ],
    description: "Kem chống nắng với công nghệ hiệu chỉnh màu da thông minh, mang lại làn da sáng đều màu và bảo vệ khỏi tia UV với SPF 50+ và PA++++.",
    benefits: [
      "Bảo vệ da khỏi tia UVA/UVB",
      "Hiệu chỉnh và làm đều màu da",
      "Làm sáng da tự nhiên",
      "Phù hợp cho mọi loại da"
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide", "Vitamin C", "Light Reflecting Particles", "PDRN"],
  },
]

async function main() {
  console.log('🌱 Seeding products to MongoDB...\n')

  const mongoDataSource = new MongoDataSource()
  let created = 0
  let skipped = 0

  for (const product of MOCK_PRODUCTS) {
    try {
      await mongoDataSource.createProduct({
        name: product.name,
        tagline: product.tagline,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        category: product.category,
        needs: product.needs,
        image: product.image,
        hoverImage: product.hoverImage,
        description: product.description,
        benefits: product.benefits,
        ingredients: product.ingredients,
        howToUse: (product as any).howToUse || null,
      })
      console.log(`✅ Created product: ${product.name}`)
      created++
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate') || error.message?.includes('unique')) {
        console.log(`⚠️  Product already exists: ${product.name}`)
        skipped++
      } else {
        console.error(`❌ Error creating product ${product.name}:`, error.message)
      }
    }
  }

  console.log(`\n✅ Product seeding completed!`)
  console.log(`   Created: ${created}, Skipped: ${skipped}, Total: ${MOCK_PRODUCTS.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
