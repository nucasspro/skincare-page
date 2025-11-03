# MongoDB Seed Files

Các file seed này được tạo từ MOCK data trong codebase để generate dữ liệu cho MongoDB.

## Files

1. **seed-mongodb-categories.ts** - Seed categories từ `CATEGORIES` trong `category-service.ts`
2. **seed-mongodb-products.ts** - Seed products từ `MOCK_PRODUCTS` trong `product-service.ts`
3. **seed-mongodb-reviews.ts** - Seed reviews từ `MOCK_REVIEWS` trong `review-service.ts`
4. **seed-mongodb-orders.ts** - Seed sample orders dựa trên order structure từ `save-to-sheets/route.ts`

## Usage

### Cài đặt tsx (nếu chưa có):
```bash
pnpm add -D tsx
```

### Chạy từng file riêng lẻ (có thể chạy song song với nhiều agent):

**Với pnpm scripts (khuyến nghị - dễ nhất):**
```bash
# Seed categories
pnpm seed:categories

# Seed products (cần chạy trước reviews và orders)
pnpm seed:products

# Seed reviews (cần products đã được seed)
pnpm seed:reviews

# Seed orders (cần products đã được seed)
pnpm seed:orders

# Seed tất cả theo thứ tự
pnpm seed:all
```

**Hoặc chạy trực tiếp với tsx:**
```bash
# Seed categories
pnpm exec tsx scripts/seeds/seed-mongodb-categories.ts
# hoặc
pnpm tsx scripts/seeds/seed-mongodb-categories.ts

# Seed products
pnpm tsx scripts/seeds/seed-mongodb-products.ts

# Seed reviews
pnpm tsx scripts/seeds/seed-mongodb-reviews.ts

# Seed orders
pnpm tsx scripts/seeds/seed-mongodb-orders.ts
```

**Với npx (nếu không dùng pnpm):**
```bash
# Seed categories
npx tsx scripts/seeds/seed-mongodb-categories.ts

# Seed products (cần chạy trước reviews và orders)
npx tsx scripts/seeds/seed-mongodb-products.ts

# Seed reviews (cần products đã được seed)
npx tsx scripts/seeds/seed-mongodb-reviews.ts

# Seed orders (cần products đã được seed)
npx tsx scripts/seeds/seed-mongodb-orders.ts
```

### Thứ tự seed (dependency):

1. Categories (không phụ thuộc)
2. Products (không phụ thuộc, nhưng reviews và orders cần products)
3. Reviews (phụ thuộc vào products)
4. Orders (phụ thuộc vào products)

## Notes

- Các file seed sẽ tự động skip các records đã tồn tại (duplicate key errors)
- Cần set `MONGODB_URI` trong `.env.local` hoặc `.env`
- Reviews và Orders sẽ tự động map productId từ tên product nếu products đã được seed

## Parallel Execution

Các file seed có thể chạy song song với nhiều agent/process:
- `seed-mongodb-categories.ts` và `seed-mongodb-products.ts` có thể chạy song song
- `seed-mongodb-reviews.ts` và `seed-mongodb-orders.ts` có thể chạy song song sau khi products đã được seed
