# Hướng dẫn sử dụng Font trong dự án

## Tổng quan

Dự án hiện sử dụng các font sau:
- **Quicksand** (local) – Font chính cho nội dung, đoạn văn, tiêu đề h3, mô tả sản phẩm.
- **Kodchasan** (local, Light/ExtraLight) – Font dành cho thanh menu category, badge, bộ lọc.
- **Aeonik Extended Pro** (local) – Font nhấn mạnh cho hero video headline (BRIGHT BEAUTY).
- **Fragment** (local) – Font cho slogan đặc biệt.
- **Inter** (Google Fonts) – Fallback cho hệ thống (được giữ dưới dạng dự phòng).

## 1. Font được định nghĩa

### Font Quicksand
- **File**: `Quicksand-VariableFont_wght.ttf`
- **CSS Variable**: `--font-quicksand`
- **Vị trí lưu**: `public/font/`
- **Vai trò**: Content, mô tả, tiêu đề h3, body text.

### Font Kodchasan
- **File**: `Kodchasan-ExtraLight.ttf`, `Kodchasan-Light.ttf`
- **CSS Variable**: `--font-kodchasan`
- **Vị trí lưu**: `public/font/`
- **Vai trò**: Category pills, badge, bộ lọc.

### Font Aeonik Extended Pro
- **File**: `aeonikextendedprovf.ttf`, `aeonikextendedprovf-italic.ttf`
- **CSS Variable**: `--font-air`
- **Vị trí lưu**: `public/font/`
- **Vai trò**: Hero headline/video highlight.

### Font Fragment
- **File**: `PPFragment-GlareVariable.ttf`
- **CSS Variable**: `--font-fragment`
- **Vị trí lưu**: `public/font/`
- **Vai trò**: Slogan nghệ thuật/đặc biệt.

### Font Inter
- **Nguồn**: Google Fonts
- **CSS Variable**: `--font-inter`
- **Vai trò**: Fallback.

## 2. Quy tắc sử dụng Font

### ✅ Font Quicksand – Nội dung & tiêu đề h3

**Dùng cho:**
- Nội dung bài viết, mô tả, đoạn văn bản.
- Tiêu đề cấp h3 trong card sản phẩm hoặc section nội dung.
- Giá, thông tin chi tiết sản phẩm.

**Cách sử dụng:**
```tsx
<h3 className="h-heading">Serum Làm Sáng Da</h3>
<p className="p-desc">Công thức tiên tiến giúp làm sáng da.</p>
<div className="font-quicksand">Văn bản tuỳ chỉnh</div>
```

Các hàm util tương ứng:
- `getBodyContentFont(...)`
- `getProductTitleFont(...)`
- `getProductDescriptionFont(...)`
- `getNavigationFont(...)` (menu chính, uppercase, tracking rộng)

### ✅ Font Kodchasan – Category / Badge / Filter

**Dùng cho:**
- Nút filter category trên trang sản phẩm.
- Badge phân loại, tag menu dạng pill.

**Cách sử dụng:**
```tsx
<button className={getCategoryFont("px-4 py-2 rounded-full")}>
  Da dầu
</button>
```

Font được khai báo với cả weight ExtraLight (200) và Light (300) để phù hợp thiết kế.

### ✅ Font Fragment – Slogan

**Dùng cho:**
- Slogan tại Brand Story hoặc các điểm nhấn đặc biệt.
- Câu quote mang tính nhấn mạnh.

**Cách sử dụng:**
```tsx
<div className="slogan">Khoa học gặp gỡ thiên nhiên</div>
```

### ✅ Font Aeonik Extended Pro – Hero video heading

**Dùng cho:**
- Tiêu đề lớn trong hero video: “BRIGHT BEAUTY”.
- Các điểm nhấn cần nét chữ kéo dài (sử dụng qua `getHeroVideoHeadingFont`).

### ✅ Font Inter – Fallback

- Vẫn load trong dự án để dự phòng; không dùng trực tiếp cho content.

## 3. Utility Classes có sẵn

Dự án đã định nghĩa sẵn các utility classes:

| Class | Font | Style | Size | Use Case |
|-------|------|-------|------|----------|
| `.h-heading` | Quicksand | Bold uppercase | Tuỳ biến | Tiêu đề H3 / sản phẩm |
| `.p-desc` | Quicksand | Regular | Body | Description (Mô tả) |
| `.nav-link` | Quicksand | Semibold uppercase | Tuỳ biến | Navigation (Menu) |
| `.tag-small` | Quicksand | Semibold uppercase | 0.875rem | Tag nhỏ / badge |
| `.slogan` | Fragment | Normal | Tuỳ biến | Slogan |
| `.font-quicksand` | Quicksand | Variable | Tuỳ biến | Custom content |
| `.font-kodchasan` | Kodchasan | Light / ExtraLight | Tuỳ biến | Category filter |
| `.font-fragment` | Fragment | Normal | Tuỳ biến | Slogan đặc biệt |

## 4. Ví dụ thực tế theo đúng quy tắc

### Example 1: Product Section
```tsx
<section>
  {/* Tiêu đề H3 - Quicksand Bold */}
  <h2 className="h-heading">Serum Làm Sáng Da Cao Cấp</h2>
  
  {/* Description - Quicksand Regular */}
  <p className="p-desc">
    Công thức tiên tiến với vitamin C và axit hyaluronic giúp làm sáng da.
  </p>
  
  {/* Tag - Quicksand Uppercase */}
  <span className="tag-small">Bán chạy</span>
</section>
```

### Example 2: Navigation
```tsx
<nav>
  {/* Navigation links - Quicksand Semibold */}
  <Link href="/about" className="nav-link">Giới thiệu</Link>
  <Link href="/products" className="nav-link">Sản phẩm</Link>
  <Link href="/brand-story" className="nav-link">Câu chuyện thương hiệu</Link>
</nav>
```

### Example 3: Brand Story Page
```tsx
<section>
  {/* Slogan - Font Fragment */}
  <div className="slogan">Khoa học gặp gỡ thiên nhiên</div>
  
  {/* Tiêu đề H3 - Quicksand Bold */}
  <h1 className="h-heading">Câu chuyện của chúng tôi</h1>
  
  {/* Description - Quicksand Regular */}
  <p className="p-desc">
    Thành phần tự nhiên được chọn lọc kỹ lưỡng, công thức được chứng minh lâm sàng.
  </p>
</section>
```

### Example 4: Product Card
```tsx
<div className="product-card">
  {/* Tiêu đề H3 - Quicksand Bold */}
  <h3 className="h-heading">Radiance Renewal Serum</h3>
  
  {/* Description - Quicksand Regular */}
  <p className="p-desc">Serum làm sáng da cao cấp</p>
  
  {/* Tag - Quicksand Uppercase */}
  <span className="tag-small">Mới</span>
</div>
```

## 5. Checklist sử dụng Font

Khi code component, kiểm tra:

- [ ] **Tiêu đề H3 / sản phẩm** → Dùng `.h-heading` hoặc `getProductTitleFont`
- [ ] **Description / đoạn văn** → Dùng `.p-desc` hoặc `getProductDescriptionFont`
- [ ] **Navigation** → Dùng `getNavigationFont` hoặc `.nav-link`
- [ ] **Category badge / filter** → Dùng `getCategoryFont` hoặc `.font-kodchasan`
- [ ] **Slogan** → Dùng `.slogan` hoặc `.font-fragment`
- [ ] **Body text thường** → Mặc định Quicksand (`--font-sans` đã trỏ về Quicksand)

## 6. So sánh Size

```
Description (.p-desc)     → font-size: mặc định (1rem)
Tag (.tag-small)          → font-size: 0.875rem (nhỏ hơn description)
```

## 7. File cấu hình

- **Font definitions**: `app/fonts.ts`
- **Font setup**: `app/layout.tsx` (line 34)
- **Font utilities**: `app/globals.css` (lines 148-157)
- **Font files**: `public/font/`

## 8. Download font Hero (Aeonik)

Nếu thiếu file Aeonik Extended Pro cho hero, tải từ:
**Link**: https://drive.google.com/drive/folders/14ELVsAIAqpIkL9wxkzPykWE0Rgs3gnrK

Sau khi tải, đặt vào:
- `public/font/aeonikextendedprovf.ttf` (Normal)
- `public/font/aeonikextendedprovf-italic.ttf` (Italic)

## 9. Best Practices

1. ✅ **Luôn dùng utility classes** để đảm bảo consistency
2. ✅ **Tiêu đề H3 / sản phẩm** luôn dùng `.h-heading` hoặc `getProductTitleFont`
3. ✅ **Description** dùng `.p-desc` hoặc `getProductDescriptionFont`
4. ✅ **Navigation** dùng `getNavigationFont` / `.nav-link`
5. ✅ **Category badge** dùng `getCategoryFont` / `.font-kodchasan`
6. ✅ **Slogan** dùng `.slogan` / `.font-fragment`
7. ✅ **Body text** để mặc định (Quicksand)

## 10. Troubleshooting

**Vấn đề**: Font hero (Aeonik) không hiển thị
- Kiểm tra file `aeonikextendedprovf.ttf` trong `public/font/`
- Tải lại từ Google Drive link
- Kiểm tra path trong `app/fonts.ts`

**Vấn đề**: Category badge không đúng font
- Đảm bảo sử dụng `getCategoryFont` hoặc `.font-kodchasan`
- Kiểm tra biến `--font-kodchasan` đã load (app/layout.tsx)

**Vấn đề**: Content vẫn dùng font khác
- Kiểm tra có class override nào khác không
- Đảm bảo `--font-sans` đang trỏ tới Quicksand (app/globals.css)

**Vấn đề**: Slogan không đúng font
- Dùng `.slogan` hoặc `.font-fragment`
- Kiểm tra font Fragment có trong `public/font/`

## 11. Tóm tắt nhanh

```
Tiêu đề H3 / sản phẩm → .h-heading / getProductTitleFont (Quicksand Bold)
Description / body     → .p-desc / getProductDescriptionFont (Quicksand)
Navigation             → getNavigationFont / .nav-link (Quicksand Semibold Uppercase)
Category badge         → getCategoryFont / .font-kodchasan (Kodchasan Light)
Slogan                 → .slogan / .font-fragment (Fragment)
Body text mặc định     → Quicksand (qua --font-sans)
Hero video headline    → getHeroVideoHeadingFont (Aeonik)
```

