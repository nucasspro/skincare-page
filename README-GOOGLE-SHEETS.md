# Hướng dẫn setup Google Sheets để lưu đơn hàng

## Bước 1: Tạo Google Sheet mới

1. Vào [Google Sheets](https://sheets.google.com)
2. Tạo Sheet mới với tên "Orders" hoặc bất kỳ tên nào bạn muốn
3. Tạo header row trong Sheet 1 (dòng đầu tiên):
   ```
   A1: Timestamp
   B1: Order Number
   C1: Customer Name
   D1: Phone
   E1: Address
   F1: Payment Method
   G1: Items
   H1: Total Items
   I1: Total Price
   ```

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click vào **Tools** > **Script editor**
2. Xóa code mặc định
3. Copy toàn bộ nội dung từ file `google-apps-script.txt` và paste vào
4. Lưu lại (File > Save hoặc Ctrl+S)
5. Đặt tên project: "Order Saver" hoặc tên bất kỳ

## Bước 3: Deploy Web App

1. Click vào **Deploy** > **New deployment**
2. Chọn icon **Select type** > chọn **Web app**
3. Điền thông tin:
   - **Description**: "Order Saver API" (tùy chọn)
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Authorize permissions (nếu được hỏi)
6. Copy **Web app URL** (sẽ có dạng: `https://script.google.com/macros/s/...`)

## Bước 4: Cấu hình Environment Variable

1. Tạo file `.env.local` trong root project (nếu chưa có)
2. Thêm dòng sau:
   ```
   GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR-WEB-APP-URL/exec
   ```
   (Thay `YOUR-WEB-APP-URL` bằng URL bạn đã copy ở bước 3)

3. Restart dev server để áp dụng thay đổi

## Bước 5: Test

1. Chạy checkout flow trên website
2. Hoàn thành đơn hàng
3. Kiểm tra Google Sheet - đơn hàng sẽ xuất hiện trong Sheet

## Lưu ý

- Google Apps Script có giới hạn số request (100,000 requests/100 giây)
- Dữ liệu được lưu tự động khi checkout thành công
- Nếu có lỗi, check Console của browser để xem chi tiết
- Web app URL không bao giờ hết hạn trừ khi bạn xóa deployment

## Troubleshooting

- **Lỗi 403**: Kiểm tra lại "Who has access" phải là "Anyone"
- **Lỗi 500**: Kiểm tra lại script code trong Google Apps Script
- **Không có dữ liệu**: Kiểm tra lại environment variable `GOOGLE_SHEETS_WEB_APP_URL`
