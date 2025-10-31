# 🚀 HƯỚNG DẪN IMPLEMENT ORDER MANAGEMENT SYSTEM

## 📋 TỔNG QUAN

Đã phân tích và chuẩn bị đầy đủ để update Order system cho admin với các features:
- ✅ Tương thích với Google Sheets data
- ✅ Hỗ trợ guest checkout (không cần userId)
- ✅ Chi tiết địa chỉ (province, district, ward)
- ✅ Order number unique
- ✅ Payment method tracking
- ⚠️ **KHÔNG ảnh hưởng đến client checkout**

---

## 📁 FILES ĐÃ CẬP NHẬT

### ✅ **prisma/schema.prisma** - COMPLETED
   - Order model đã được update với fields đầy đủ
   - userId optional (hỗ trợ guest checkout)
   - Migration đã chạy thành công

### ✅ **prisma/seed-orders.ts** - COMPLETED
   - 6 đơn hàng mẫu đã seed thành công
   - Các status: pending, confirmed, shipping, delivered, cancelled
   - Cả COD và bank transfer

### ✅ **lib/services/admin/order-service.ts** - COMPLETED
   - Interface đã cập nhật
   - Methods: getAllOrders, getOrder, updateOrder, deleteOrder, getOrderStats
   - Parse items từ JSON string

### 🔄 **components/admin/order-form.tsx** - READY TO USE
   - Form component hoàn chỉnh cho admin
   - Sections: Order Info, Customer Info, Items, Status, Notes
   - Read-only mode support
   - Clean UI theo style hiện tại

### ⏳ **app/admin/orders/page.tsx** - TO DO
   - Cần tạo orders page (tham khảo reviews page)

---

## 🔧 CÁC BƯỚC THỰC HIỆN

### **BƯỚC 1: Backup dữ liệu (nếu cần)**
```bash
# Backup database hiện tại
cp prisma/dev.db prisma/dev.db.backup
```

### **BƯỚC 2: Update Prisma Schema**

**File cần sửa:** `prisma/schema.prisma`

Thay thế model `Order` hiện tại bằng nội dung từ `prisma/schema-order-update.prisma`:

```prisma
model Order {
  id              String   @id @default(cuid())
  orderNumber     String   @unique

  // Customer Info (for guest checkout)
  customerName    String
  customerEmail   String?
  customerPhone   String

  // Optional User ID (if logged in)
  userId          String?
  user            User?    @relation(fields: [userId], references: [id])

  // Address Details
  streetAddress   String
  wardName        String?
  districtName    String?
  provinceName    String?

  // Order Details
  status          String   @default("pending")
  paymentMethod   String
  items           String
  total           Float
  notes           String?

  // Timestamps
  createdAt       Int      @default(0)
  updatedAt       Int      @default(0)

  @@index([orderNumber])
  @@index([userId])
  @@index([status])
  @@index([customerPhone])
  @@index([createdAt])
  @@map("orders")
}
```

**⚠️ LƯU Ý:** Cũng cần update model `User` để relation optional:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  phone     String?
  address   String?
  role      String   @default("user")
  createdAt Int      @default(0)
  updatedAt Int      @default(0)

  orders    Order[]  // Giữ nguyên
  comments  Comment[]

  @@index([email])
  @@index([role])
  @@map("users")
}
```

### **BƯỚC 3: Run Migration**
```bash
# Stop dev server trước

# Push schema changes
npx prisma db push --accept-data-loss

# Hoặc nếu muốn tạo migration
npx prisma migrate dev --name update_order_model
```

### **BƯỚC 4: Seed Data**
```bash
npx tsx prisma/seed-orders.ts
```

### **BƯỚC 5: Update Order Service**

**File cần sửa:** `lib/services/admin/order-service.ts`

Thay thế toàn bộ nội dung bằng file `lib/services/admin/order-service-new.ts`

### **BƯỚC 6: Update API Routes (nếu cần)**

**Kiểm tra:** `app/api/admin/orders/route.ts` và `app/api/admin/orders/[id]/route.ts`

Đảm bảo API có thể handle fields mới:
- orderNumber
- customerName, customerEmail, customerPhone
- streetAddress, wardName, districtName, provinceName
- paymentMethod

### **BƯỚC 7: Update Admin Orders Page**

**File cần tạo/sửa:** `app/admin/orders/page.tsx`

Tương tự như `app/admin/reviews/page.tsx`:
- List view với table
- View/Edit với dialog
- Search functionality
- Status filter

### **BƯỚC 8: Add Navigation**

**File cần sửa:** `components/admin/admin-layout.tsx`

Navigation đã có "Đơn hàng" rồi, chỉ cần verify route `/admin/orders` works

### **BƯỚC 9: Restart & Test**
```bash
# Restart dev server
npm run dev

# Test các chức năng:
# 1. View orders list
# 2. View order details
# 3. Update order status
# 4. Add notes
```

---

## ✅ CHECKLIST IMPLEMENTATION

- [x] ~~Backup database (nếu có data quan trọng)~~ - Table chưa có data
- [x] Update Order model trong `prisma/schema.prisma` ✅
- [x] Run `npx prisma db push` ✅
- [x] Run seed: `npx tsx prisma/seed-orders.ts` ✅ (6 orders created)
- [x] Update `lib/services/admin/order-service.ts` ✅
- [x] `components/admin/order-form.tsx` sẵn sàng ✅
- [ ] **TO DO:** Create `app/admin/orders/page.tsx` (tham khảo reviews page)
- [ ] **TO DO:** Kiểm tra API routes handle fields mới
- [ ] **TO DO:** Test order management trong admin
- [ ] **TO DO:** Verify checkout flow vẫn hoạt động (client)

---

## 🔍 KIỂM TRA SAU KHI IMPLEMENT

### Test Admin:
1. `/admin/orders` - Xem danh sách orders
2. Click view order - Xem chi tiết
3. Update status - Lưu thành công
4. Add notes - Hiển thị đúng
5. Search orders - Work

### Test Client (không được ảnh hưởng):
1. `/cart` - Add to cart
2. `/checkout` - Checkout flow
3. Order confirmation - Tạo order thành công
4. Google Sheets - Data vẫn được lưu

---

## 📊 THỐNG KÊ

**Schema changes:**
- Added: 8 fields (orderNumber, customerName, customerEmail, customerPhone, streetAddress, wardName, districtName, provinceName, paymentMethod)
- Modified: 1 field (userId: String → String?)
- Total fields: 14

**Seed data:**
- 6 orders mẫu
- Covers all statuses
- Both payment methods

**Components:**
- 1 new: OrderForm
- 1 to update: Orders Page (tham khảo Reviews Page)

---

## 💡 NOTES

1. **Guest Checkout**: userId optional, cho phép checkout không cần đăng nhập
2. **Address Split**: Tách địa chỉ thành các field riêng để query/filter dễ dàng
3. **Order Number**: Unique identifier, dễ tracking
4. **Payment Method**: String type để flexible (có thể extend thêm methods)
5. **Status**: String type, có thể customize theo business logic
6. **Backward Compatible**: Không phá vỡ checkout flow hiện tại

---

## 🚨 WARNINGS

- ⚠️ Migration sẽ **mất data** orders cũ (nếu có) vì structure thay đổi nhiều
- ⚠️ Phải **stop dev server** trước khi run migration
- ⚠️ Test kỹ **checkout flow** sau khi implement
- ⚠️ Đảm bảo **Google Sheets integration** vẫn hoạt động

---

## 📞 SUPPORT

Nếu gặp vấn đề:
1. Check console logs (browser & terminal)
2. Verify Prisma Client đã regenerate
3. Check API responses trong Network tab
4. Restart dev server

Files documentation đã tạo sẵn để reference!
