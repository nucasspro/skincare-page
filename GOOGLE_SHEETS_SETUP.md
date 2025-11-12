# Hướng Dẫn Setup Google Sheets như Database Provider

## 📋 Tổng Quan

Sử dụng Google Sheets như một database provider, mỗi bảng (table) trong Prisma sẽ tương ứng với một sheet trong Google Sheets.

**Các sheets:**
- `Products` - Sản phẩm
- `Categories` - Danh mục
- `Users` - Người dùng
- `Orders` - Đơn hàng
- `Reviews` - Đánh giá
- `Comments` - Bình luận

---

## 🚀 Setup

### Bước 1: Tạo Google Sheet

1. Vào [Google Sheets](https://sheets.google.com)
2. Tạo Sheet mới hoặc dùng sheet có sẵn
3. Đặt tên sheet (ví dụ: "Skincare Database")

### Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Tools** > **Script editor**
2. Xóa code mặc định
3. Copy toàn bộ nội dung từ file `google-apps-script-multi-sheets.txt` và paste vào
4. Lưu lại (File > Save hoặc Ctrl+S)
5. Đặt tên project: "Database Manager" hoặc tên bất kỳ

### Bước 3: Setup Sheets và Headers

1. Trong Script editor, chạy function `testSetup()`:
   - Click **Run** > **Run function** > `testSetup`
   - Authorize permissions (lần đầu tiên)
   - Script sẽ tự động tạo các sheets và headers

2. Kiểm tra Google Sheet - bạn sẽ thấy 6 sheets mới:
   - Products
   - Categories
   - Users
   - Orders
   - Reviews
   - Comments

### Bước 4: Deploy Web App

1. Trong Script editor, click **Deploy** > **New deployment**
2. Chọn icon **Select type** > chọn **Web app**
3. Điền thông tin:
   - **Description**: "Database Manager API" (tùy chọn)
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy **Web app URL** (sẽ có dạng: `https://script.google.com/macros/s/.../exec`)

### Bước 5: Cấu hình Environment Variable

1. Tạo file `.env.local` trong root project (nếu chưa có)
2. Thêm dòng sau:
   ```
   GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR-WEB-APP-URL/exec
   ```
   (Thay `YOUR-WEB-APP-URL` bằng URL bạn đã copy ở bước 4)

3. Restart dev server để áp dụng thay đổi

---

## 📝 Usage

### Export Data từ Local DB lên Google Sheets

```bash
pnpm sheets:export
```

**Lưu ý:**
- Sẽ export TẤT CẢ data từ local database lên Google Sheets
- Nếu record đã tồn tại (same ID), sẽ update
- Nếu record chưa tồn tại, sẽ create mới

### Import Data từ Google Sheets về Local DB

```bash
pnpm sheets:import
```

**Lưu ý:**
- Sẽ import TẤT CẢ data từ Google Sheets về local database
- Sử dụng `upsert` - update nếu đã tồn tại, create nếu chưa có

---

## 🔄 Workflow

### Development Workflow

1. **Local development:**
   - Làm việc với local SQLite database
   - Test và chỉnh sửa data trên local

2. **Export lên Google Sheets:**
   ```bash
   pnpm sheets:export
   ```

3. **Production/Vercel:**
   - Vercel app sẽ đọc data từ Google Sheets (qua API)
   - Hoặc setup sync tự động

### Sync Workflow

**Option 1: Manual Sync**
```bash
# Local → Google Sheets
pnpm sheets:export

# Google Sheets → Local
pnpm sheets:import
```

**Option 2: Auto Sync (Future)**
- Tạo API endpoint để sync real-time
- Trigger sync khi có thay đổi data

---

## 📚 API Reference

### GoogleSheetsService

```typescript
import { googleSheetsService } from '@/lib/services/google-sheets-service'

// Create a record
await googleSheetsService.create('Products', productData)

// Update a record
await googleSheetsService.update('Products', productData)

// Upsert (create or update)
await googleSheetsService.upsert('Products', productData)

// Bulk create
await googleSheetsService.bulkCreate('Products', [product1, product2, ...])

// Read all records
const products = await googleSheetsService.readAll('Products')
```

---

## ⚠️ Lưu Ý Quan Trọng

1. **Rate Limits:**
   - Google Apps Script có giới hạn 100,000 requests/100 seconds
   - Với bulk operations, có thể nhanh chóng đạt limit
   - Nên batch các operations

2. **Data Types:**
   - Google Sheets chỉ support text, numbers, dates
   - JSON objects/arrays sẽ được stringify
   - Khi import về Prisma, sẽ tự động parse JSON

3. **IDs:**
   - Luôn sử dụng unique IDs (cuid, uuid, etc.)
   - Google Sheets sử dụng ID để tìm và update records

4. **Backup:**
   - Luôn backup data trước khi sync
   - Google Sheets có version history (File > Version history)

5. **Security:**
   - Web app URL có thể access bởi anyone
   - Không lưu sensitive data trong sheets
   - Có thể restrict access bằng cách thay đổi "Who has access" setting

---

## 🐛 Troubleshooting

### Lỗi: "GOOGLE_SHEETS_WEB_APP_URL is not configured"
- **Fix:** Thêm `GOOGLE_SHEETS_WEB_APP_URL` vào `.env.local`

### Lỗi: "Sheet not found"
- **Fix:** Chạy `testSetup()` function trong Google Apps Script để tạo sheets

### Lỗi: "Rate limit exceeded"
- **Fix:** Đợi vài giây rồi thử lại
- **Fix:** Batch operations thành nhóm nhỏ hơn

### Lỗi: "Invalid JSON"
- **Fix:** Kiểm tra data có đúng format không
- **Fix:** Đảm bảo JSON fields được stringify đúng cách

---

## 📚 Tài Liệu Tham Khảo

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Prisma Documentation](https://www.prisma.io/docs)
