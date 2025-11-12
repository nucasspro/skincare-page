# Database Setup & Management Scripts

Hướng dẫn setup và quản lý database MongoDB cho project.

## 📁 Cấu trúc thư mục

```
scripts/
├── setup-database.ts          # Script setup database mới (all-in-one)
├── migrations/                 # Migration scripts
│   ├── add-soft-delete-fields.ts
│   ├── migrate-category-to-categoryid.ts
│   └── README.md
├── seeds/                      # Seed scripts
│   ├── seed-mongodb-categories.ts
│   ├── seed-mongodb-products.ts
│   ├── seed-mongodb-reviews.ts
│   ├── seed-mongodb-orders.ts
│   ├── seed-admin-user.ts
│   └── README.md
├── import-to-mongodb.ts        # Import data từ external sources
├── export-to-sheets.ts          # Export data to Google Sheets
└── import-from-sheets.ts        # Import data from Google Sheets
```

## 🚀 Setup Database Mới

### Cách 1: Setup tự động (Khuyến nghị)

Chạy script setup tổng hợp để setup database mới từ đầu:

```bash
npx tsx scripts/setup-database.ts
```

Script này sẽ tự động:
1. ✅ Generate Prisma Client
2. ✅ Push schema vào MongoDB (tạo collections và indexes)
3. ✅ Chạy migrations (add soft delete fields)
4. ✅ Seed data (categories → products → reviews → orders → admin user)

### Cách 2: Setup thủ công từng bước

Nếu muốn kiểm soát từng bước:

```bash
# 1. Generate Prisma Client
pnpm db:generate

# 2. Push schema vào MongoDB
pnpm db:push

# 3. Chạy migrations
pnpm migrate:soft-delete

# 4. Seed data (theo thứ tự)
pnpm seed:categories
pnpm seed:products
pnpm seed:reviews
pnpm seed:orders
pnpm seed:admin
```

## 📋 Prerequisites

1. **MongoDB URI**: Đảm bảo đã set `MONGODB_URI` trong `.env` hoặc `.env.local`
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   # hoặc MongoDB Atlas
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database-name
   ```

2. **Dependencies**: Đã cài đặt dependencies
   ```bash
   pnpm install
   ```

## 🌱 Seed Scripts

### Thứ tự seed (quan trọng!)

Seed scripts phải chạy theo thứ tự vì có dependencies:

1. **Categories** - Phải seed đầu tiên
   ```bash
   pnpm seed:categories
   ```

2. **Products** - Cần categories đã có
   ```bash
   pnpm seed:products
   ```

3. **Reviews** - Cần products đã có
   ```bash
   pnpm seed:reviews
   ```

4. **Orders** - Cần products đã có
   ```bash
   pnpm seed:orders
   ```

5. **Admin User** - Có thể seed bất kỳ lúc nào
   ```bash
   pnpm seed:admin
   ```

### Seed tất cả cùng lúc

```bash
pnpm seed:all
```

**Lưu ý:** `seed:all` chỉ seed categories, products, reviews, orders (không bao gồm admin). Chạy `seed:admin` riêng nếu cần.

## 🔄 Migration Scripts

Migration scripts để update schema và migrate data:

### 1. Add Soft Delete Fields

Thêm `isDeleted` và `deletedAt` vào tất cả collections:

```bash
pnpm migrate:soft-delete
```

### 2. Migrate Category to CategoryId

Migrate từ `category` (string) sang `categoryId` (ObjectId):

```bash
pnpm migrate:category
```

### 3. Chạy tất cả migrations

```bash
pnpm migrate:all
```

Xem chi tiết trong [migrations/README.md](./migrations/README.md)

## 🔧 Utility Scripts

### Import/Export Data

- **Import từ Google Sheets**: `pnpm sheets:import`
- **Export sang Google Sheets**: `pnpm sheets:export`
- **Import vào MongoDB**: `pnpm mongodb:import`

## 📊 Xem Data

Sau khi setup, có thể xem data bằng:

```bash
# Prisma Studio (GUI)
pnpm db:studio

# MongoDB Compass
# Kết nối với MONGODB_URI trong .env
```

## 🔄 Reset Database

Nếu muốn reset database và setup lại:

```bash
# 1. Xóa collections trong MongoDB (thủ công hoặc dùng MongoDB Compass)

# 2. Setup lại từ đầu
npx tsx scripts/setup-database.ts
```

## ⚠️ Lưu ý

1. **Backup trước khi migrate**: Luôn backup database trước khi chạy migrations trên production
2. **Thứ tự seed**: Phải seed theo đúng thứ tự (categories → products → reviews/orders)
3. **Environment variables**: Đảm bảo `MONGODB_URI` đã được set đúng
4. **Prisma Schema**: Schema chính là `prisma/schema.prisma` (không phải `schema.mongodb.prisma`)

## 🆘 Troubleshooting

### Lỗi: MONGODB_URI not set
- Kiểm tra file `.env` hoặc `.env.local` có `MONGODB_URI`
- Đảm bảo format đúng: `mongodb://...` hoặc `mongodb+srv://...`

### Lỗi: Collection already exists
- Seed scripts sẽ skip nếu data đã tồn tại (dựa trên unique constraints)
- Nếu muốn seed lại, xóa collections trước

### Lỗi: Products not found khi seed reviews/orders
- Đảm bảo đã seed products trước: `pnpm seed:products`

### Lỗi: Prisma schema out of sync
- Chạy lại: `pnpm db:push` để sync schema với MongoDB
