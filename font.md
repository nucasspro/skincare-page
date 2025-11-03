# Hướng dẫn sử dụng Font trong dự án

## Tổng quan

Dự án sử dụng 3 loại font chính:
- **Inter** (Google Fonts) - Font mặc định cho body text
- **Air** (Local font) - Font cho tiêu đề key
- **Air Italic** (Local font) - Font cho description, navigation, tag
- **Fragment** (Local font) - Font cho slogan

## 1. Font được định nghĩa

### Font Air
- **Link tải font**: https://drive.google.com/drive/folders/14ELVsAIAqpIkL9wxkzPykWE0Rgs3gnrK
- **File normal**: `aeonikextendedprovf.ttf`
- **File italic**: `aeonikextendedprovf-italic.ttf`
- **CSS Variable**: `--font-air`
- **Vị trí lưu**: `public/font/`

### Font Fragment
- **File**: `PPFragment-GlareVariable.ttf`
- **CSS Variable**: `--font-fragment`
- **Vị trí lưu**: `public/font/`

### Font Inter
- **Nguồn**: Google Fonts
- **CSS Variable**: `--font-inter`
- **Hỗ trợ**: Latin + Vietnamese
- Được import trong `app/layout.tsx`

## 2. Quy tắc sử dụng Font theo Backend

### ✅ Font Air (Normal) - Tiêu đề Key

**Dùng cho:**
- Tiêu đề chính (Heading key)
- Tiêu đề quan trọng
- Key headings trong các section

**Cách sử dụng:**
```tsx
<h1 className="h-heading">Sản phẩm cao cấp</h1>
<h2 className="h-heading">Bộ sưu tập nổi bật</h2>
<h3 className="h-heading">Serum Làm Sáng Da</h3>
```

**Hoặc dùng class trực tiếp:**
```tsx
<div className="font-air">Tiêu đề Key</div>
```

### ✅ Font Air Italic - Description, Navigation, Tag

**Dùng cho:**
1. **Description** (Mô tả)
2. **Navigation** (Menu điều hướng)
3. **Tag** (Size nhỏ hơn so với description)

**Cách sử dụng:**

#### Description (Mô tả):
```tsx
<p className="p-desc">
  Công thức tiên tiến với vitamin C và axit hyaluronic giúp làm sáng da.
</p>
```

#### Navigation (Menu):
```tsx
<Link href="/about" className="nav-link">Giới thiệu</Link>
<Link href="/products" className="nav-link">Sản phẩm</Link>
```

#### Tag (Size nhỏ hơn description):
```tsx
<span className="tag-small">Nổi bật</span>
<span className="tag-small">Mới</span>
<span className="tag-small">Bán chạy</span>
```

**Lưu ý**: Tag có size nhỏ hơn description. Class `.tag-small` đã được cấu hình với `font-size: 0.875rem`.

### ✅ Font Fragment - Slogan

**Dùng cho:**
- Slogan ở page Brand Story
- Slogan ở các page khác cần slogan đặc biệt
- Câu slogan quan trọng

**Cách sử dụng:**
```tsx
<div className="slogan">Khoa học gặp gỡ thiên nhiên</div>
<p className="slogan">Nơi khoa học gặp gỡ thiên nhiên</p>
```

**Hoặc dùng class trực tiếp:**
```tsx
<div className="font-fragment">Slogan đặc biệt</div>
```

### ✅ Font Inter - Body Text (Mặc định)

**Dùng cho:**
- Tất cả text thông thường
- Paragraph body
- Text không có yêu cầu đặc biệt

**Cách sử dụng:**
```tsx
// Không cần class, tự động áp dụng
<p>Đây là text thường, tự động dùng Inter</p>
<div>Text này cũng dùng Inter mặc định</div>
```

## 3. Utility Classes có sẵn

Dự án đã định nghĩa sẵn các utility classes:

| Class | Font | Style | Size | Use Case |
|-------|------|-------|------|----------|
| `.h-heading` | Air | Normal | Mặc định | Tiêu đề Key |
| `.p-desc` | Air | Italic | Mặc định | Description (Mô tả) |
| `.nav-link` | Air | Italic | Mặc định | Navigation (Menu) |
| `.tag-small` | Air | Italic | 0.875rem (nhỏ hơn) | Tag nhỏ |
| `.slogan` | Fragment | Normal | Mặc định | Slogan |
| `.font-air` | Air | Normal | Mặc định | Custom Air font |
| `.font-fragment` | Fragment | Normal | Mặc định | Custom Fragment font |

## 4. Ví dụ thực tế theo đúng quy tắc

### Example 1: Product Section
```tsx
<section>
  {/* Tiêu đề Key - Font Air Normal */}
  <h2 className="h-heading">Serum Làm Sáng Da Cao Cấp</h2>
  
  {/* Description - Font Air Italic */}
  <p className="p-desc">
    Công thức tiên tiến với vitamin C và axit hyaluronic giúp làm sáng da.
  </p>
  
  {/* Tag - Font Air Italic (nhỏ hơn) */}
  <span className="tag-small">Bán chạy</span>
</section>
```

### Example 2: Navigation
```tsx
<nav>
  {/* Navigation links - Font Air Italic */}
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
  
  {/* Tiêu đề Key - Font Air Normal */}
  <h1 className="h-heading">Câu chuyện của chúng tôi</h1>
  
  {/* Description - Font Air Italic */}
  <p className="p-desc">
    Thành phần tự nhiên được chọn lọc kỹ lưỡng, công thức được chứng minh lâm sàng.
  </p>
</section>
```

### Example 4: Product Card
```tsx
<div className="product-card">
  {/* Tiêu đề Key - Font Air Normal */}
  <h3 className="h-heading">Radiance Renewal Serum</h3>
  
  {/* Description - Font Air Italic */}
  <p className="p-desc">Serum làm sáng da cao cấp</p>
  
  {/* Tag - Font Air Italic (nhỏ hơn) */}
  <span className="tag-small">Mới</span>
</div>
```

## 5. Checklist sử dụng Font

Khi code component, kiểm tra:

- [ ] **Tiêu đề Key** → Dùng `.h-heading` hoặc `.font-air`
- [ ] **Description** → Dùng `.p-desc` (Font Air Italic)
- [ ] **Navigation** → Dùng `.nav-link` (Font Air Italic)
- [ ] **Tag** → Dùng `.tag-small` (Font Air Italic, size nhỏ)
- [ ] **Slogan** → Dùng `.slogan` hoặc `.font-fragment`
- [ ] **Body text thường** → Không cần class (tự động Inter)

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

## 8. Download Font Air

Nếu thiếu file font Air, tải từ:
**Link**: https://drive.google.com/drive/folders/14ELVsAIAqpIkL9wxkzPykWE0Rgs3gnrK

Sau khi tải, đặt vào:
- `public/font/aeonikextendedprovf.ttf` (Normal)
- `public/font/aeonikextendedprovf-italic.ttf` (Italic)

## 9. Best Practices

1. ✅ **Luôn dùng utility classes** để đảm bảo consistency
2. ✅ **Tiêu đề Key** luôn dùng `.h-heading`
3. ✅ **Description** luôn dùng `.p-desc`
4. ✅ **Navigation** luôn dùng `.nav-link`
5. ✅ **Tag** luôn dùng `.tag-small` (nhỏ hơn description)
6. ✅ **Slogan** luôn dùng `.slogan`
7. ✅ **Body text** để mặc định, không cần class

## 10. Troubleshooting

**Vấn đề**: Font Air không hiển thị
- Kiểm tra file font có trong `public/font/`
- Tải lại font từ Google Drive link
- Kiểm tra path trong `app/fonts.ts`

**Vấn đề**: Font Italic không hoạt động
- Đảm bảo có file `aeonikextendedprovf-italic.ttf`
- Kiểm tra class có `italic` hoặc dùng `.p-desc`, `.nav-link`, `.tag-small`

**Vấn đề**: Tag size không nhỏ hơn description
- Đảm bảo dùng `.tag-small` (đã set `font-size: 0.875rem`)
- Không dùng `.p-desc` cho tag

**Vấn đề**: Slogan không đúng font
- Dùng `.slogan` hoặc `.font-fragment`
- Kiểm tra font Fragment có trong `public/font/`

## 11. Tóm tắt nhanh

```
Tiêu đề Key    → .h-heading          (Air Normal)
Description    → .p-desc             (Air Italic)
Navigation     → .nav-link           (Air Italic)
Tag            → .tag-small          (Air Italic, nhỏ hơn)
Slogan         → .slogan             (Fragment)
Body text      → (không cần class)   (Inter - mặc định)
```

