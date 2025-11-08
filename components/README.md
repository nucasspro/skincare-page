# Components Directory Structure

Thư mục components đã được tổ chức lại để dễ quản lý và bảo trì hơn.

## Cấu trúc thư mục

```
components/
├── admin/              # Admin components (không thay đổi)
│   ├── dashboard/
│   ├── action-buttons.tsx
│   ├── admin-layout.tsx
│   └── ...
│
├── checkout/           # Checkout & Order components
│   ├── checkout-form.tsx
│   ├── checkout-stepper.tsx
│   ├── payment-step.tsx
│   └── order-confirmation.tsx
│
├── product/            # Product detail components
│   ├── product-info.tsx
│   ├── product-card.tsx
│   ├── product-image-gallery.tsx
│   ├── product-feature.tsx
│   ├── product-qa.tsx
│   ├── product-details-accordion.tsx
│   ├── product-3d-showcase.tsx
│   └── similar-products.tsx
│
├── product-listing/    # Product listing components
│   ├── best-sellers.tsx
│   └── products-hero.tsx
│
├── cart/               # Shopping cart components
│   └── cart-dropdown.tsx
│
├── navigation/         # Navigation components
│   ├── navigation.tsx
│   └── navigation-filter-bar.tsx
│
├── search/             # Search components
│   └── search-modal.tsx
│
├── layout/             # Layout components
│   └── footer.tsx
│
├── hero/               # Hero & Promo components
│   ├── video-hero.tsx
│   ├── promo-slider.tsx
│   ├── promotion-banner.tsx
│   ├── promotion-banner-wrapper.tsx
│   └── nature-banner-slider.tsx
│
├── content/            # Marketing & Content components
│   ├── brand-story-preview.tsx
│   ├── real-results.tsx
│   ├── before-after-reviews.tsx
│   ├── social-media-showcase.tsx
│   ├── featured-article.tsx
│   └── pr-articles.tsx
│
├── feature/            # Feature components
│   ├── feature-highlight.tsx
│   └── faq-section.tsx
│
├── shared/             # Shared utility components
│   ├── custom-select.tsx
│   ├── rich-text-editor.tsx
│   ├── language-switcher.tsx
│   ├── scroll-to-top.tsx
│   ├── theme-provider.tsx
│   ├── parallax-provider-wrapper.tsx
│   └── recently-viewed.tsx
│
└── ui/                 # UI primitives (Radix UI)
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    └── ...
```

## Quy tắc import

### Import từ các thư mục con:

```typescript
// ✅ Đúng - Import từ thư mục con
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { ProductInfo } from "@/components/product/product-info"
import { Navigation } from "@/components/navigation/navigation"
import { Footer } from "@/components/layout/footer"

// ❌ Sai - Import trực tiếp từ components root (cũ)
import { CheckoutForm } from "@/components/checkout-form"
```

### Các components đặc biệt:

- **Navigation**: Có cả `export default` và `export function Navigation`
  ```typescript
  import Navigation from "@/components/navigation/navigation"
  // hoặc
  import { Navigation } from "@/components/navigation/navigation"
  ```

- **PromoSlider**: Có `export default`
  ```typescript
  import PromoSlider from "@/components/hero/promo-slider"
  ```

## Lợi ích của cấu trúc mới

1. **Tổ chức rõ ràng**: Mỗi nhóm components được nhóm theo chức năng
2. **Dễ tìm kiếm**: Biết component thuộc nhóm nào để tìm nhanh hơn
3. **Dễ bảo trì**: Các components liên quan được đặt gần nhau
4. **Scalable**: Dễ dàng thêm components mới vào đúng thư mục
5. **Tránh conflict**: Giảm khả năng trùng tên file

## Migration Notes

Tất cả imports đã được cập nhật tự động. Nếu bạn thấy lỗi import, vui lòng kiểm tra:

1. Đường dẫn import có đúng format `@/components/{folder}/{component}` không
2. Component có export đúng không (named export vs default export)
3. File có tồn tại trong thư mục mới không

## Thêm component mới

Khi thêm component mới, hãy đặt vào đúng thư mục:

- **Product-related**: `components/product/`
- **Checkout-related**: `components/checkout/`
- **Navigation-related**: `components/navigation/`
- **Marketing/Content**: `components/content/`
- **Reusable utilities**: `components/shared/`
- **UI primitives**: `components/ui/`
