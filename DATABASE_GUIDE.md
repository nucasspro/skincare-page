# Prisma Database Setup Guide

## 🚀 Quick Start (First Time)

```bash
# 1. Generate Prisma Client
pnpm db:generate

# 2. Tạo database tables
pnpm db:push

# 3. Start server
pnpm dev

# 4. Seed data (gọi API)
POST http://localhost:3000/api/migrate
```

## 📋 Chi Tiết Các Bước

### Bước 1: Generate Prisma Client
```bash
pnpm db:generate
```
**Lưu ý:**
- Dừng dev server trước khi chạy
- Command này tạo Prisma Client từ schema

### Bước 2: Tạo Database Tables ⚠️ QUAN TRỌNG
```bash
pnpm db:push
```
**Kết quả:**
- Tạo file `prisma/dev.db` (SQLite database)
- Tạo tất cả tables từ `prisma/schema.prisma`

**⚠️ Phải chạy bước này TRƯỚC khi start server và seed data!**

### Bước 3: Seed Initial Data
```bash
# Start server
pnpm dev

# Gọi migration API để seed data
POST http://localhost:3000/api/migrate
```
**Hoặc tự động:** Data sẽ tự động seed khi gọi API đầu tiên (ví dụ: `/api/products`)

## 🔄 Workflow Hàng Ngày

### Khi thay đổi Schema
1. Chỉnh sửa `prisma/schema.prisma`
2. **Dừng dev server** (Ctrl+C)
3. Chạy `pnpm db:push` để sync schema
4. Chạy `pnpm db:generate` để regenerate client
5. Start lại: `pnpm dev`

### Khi muốn Reset Database
```bash
# Xóa database
Remove-Item prisma\dev.db -Force

# Tạo lại tables
pnpm db:push

# Seed lại data
pnpm dev
POST http://localhost:3000/api/migrate
```

## 📝 Available Commands

| Command | Mô tả |
|---------|-------|
| `pnpm db:generate` | Generate Prisma Client từ schema |
| `pnpm db:push` | Push schema → database (tạo/sync tables) |
| `pnpm db:studio` | Mở Prisma Studio (GUI để xem/chỉnh sửa data) |

## ⚠️ Troubleshooting

### Lỗi: "table does not exist"
**Fix:** Chạy `pnpm db:push`

### Lỗi: EPERM khi generate
**Fix:**
1. Dừng dev server
2. Dừng Prisma Studio
3. Chạy lại `pnpm db:generate`

### Folder `prisma/prisma/` tự tạo
**Fix:**
- Đã fix: Database path trong schema là `file:./dev.db` (relative to schema file)
- Nếu vẫn bị, xóa folder `prisma/prisma/` và chạy lại `pnpm db:push`

## 📚 Database Info

- **Location:** `prisma/dev.db`
- **Type:** SQLite
- **Schema:** `prisma/schema.prisma`

**Models:**
- Product (Sản phẩm)
- Category (Danh mục)
- User (Người dùng)
- Order (Đơn hàng)
- Comment (Bình luận)
