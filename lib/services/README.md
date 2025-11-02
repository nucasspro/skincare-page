# Services Directory Structure

Tổ chức lại thư mục services để tách biệt admin, Prisma và Google Sheets.

## 📁 Cấu trúc

```
lib/services/
├── admin/                          # Admin services
│   ├── category-service.ts
│   ├── comment-service.ts
│   ├── order-service.ts
│   ├── product-service.ts
│   ├── review-service.ts
│   ├── user-service.ts
│   └── index.ts
│
├── data-sources/                   # Data source abstraction
│   ├── data-source.interface.ts    # Interface cho data sources
│   ├── index.ts                    # Factory để switch data source
│   │
│   ├── prisma/                     # Prisma implementation
│   │   ├── prisma-data-source.ts
│   │   └── index.ts
│   │
│   └── google-sheets/              # Google Sheets implementation
│       ├── google-sheets-service.ts      # Low-level Google Sheets API
│       ├── google-sheets-data-source.ts  # Data source implementation
│       └── index.ts
│
├── product-data-service.ts         # Product service layer (abstraction)
└── README.md
```

## 🎯 Mục đích

1. **Admin services** (`admin/`): Services cho admin panel
2. **Data sources** (`data-sources/`): Abstraction layer để switch giữa Prisma và Google Sheets
3. **Prisma** (`data-sources/prisma/`): Prisma implementation - tất cả code liên quan Prisma
4. **Google Sheets** (`data-sources/google-sheets/`): Google Sheets implementation - tất cả code liên quan Google Sheets

## 🚀 Cách sử dụng

### 1. Switch Data Source

Thêm vào `.env.local`:

```env
# Sử dụng Prisma (default)
DATA_SOURCE=prisma

# Hoặc sử dụng Google Sheets
DATA_SOURCE=google-sheets
```

### 2. Sử dụng Product Data Service

```typescript
import { productDataService } from '@/lib/services/product-data-service'

// Get all products (tự động dùng Prisma hoặc Google Sheets)
const products = await productDataService.getAllProducts()

// Get product by ID
const product = await productDataService.getProductById('product-id')

// Create product
const newProduct = await productDataService.createProduct({...})

// Update product
const updated = await productDataService.updateProduct({...})

// Delete product
await productDataService.deleteProduct('product-id')
```

### 3. Direct Data Source Access

Nếu cần truy cập trực tiếp:

```typescript
import { dataSource } from '@/lib/services/data-sources'

// dataSource sẽ tự động chọn Prisma hoặc Google Sheets
// dựa trên DATA_SOURCE env variable
const products = await dataSource.getAllProducts()
```

### 4. Access Prisma hoặc Google Sheets riêng

```typescript
// Prisma only
import { PrismaDataSource } from '@/lib/services/data-sources/prisma'
const prismaSource = new PrismaDataSource()
const products = await prismaSource.getAllProducts()

// Google Sheets only
import { GoogleSheetsDataSource } from '@/lib/services/data-sources/google-sheets'
import { googleSheetsService } from '@/lib/services/data-sources/google-sheets'
const sheetsSource = new GoogleSheetsDataSource()
const products = await sheetsSource.getAllProducts()
```

## 🔄 Cách hoạt động

1. **Factory Pattern**: `data-sources/index.ts` sẽ tạo instance dựa trên `DATA_SOURCE` env
2. **Service Layer**: `product-data-service.ts` wrap data source với error handling
3. **Interface**: Tất cả data sources implement `IDataSource` interface

## 📝 Thêm Data Source mới

1. Tạo folder mới trong `data-sources/` (ví dụ: `data-sources/mongodb/`)
2. Tạo class implement `IDataSource` interface
3. Thêm vào factory trong `data-sources/index.ts`

```typescript
// lib/services/data-sources/mongodb/mongodb-data-source.ts
export class MongoDataSource implements IDataSource {
  // Implementation
}

// lib/services/data-sources/index.ts
case 'mongodb':
  return new MongoDataSource()
```

## ⚙️ Error Handling

Service tự động handle errors và throw với message rõ ràng.

## 💡 Best Practices

1. **Luôn dùng `productDataService`** thay vì truy cập trực tiếp data source
2. **Không hardcode data source** trong code, dùng env variable
3. **Tách biệt Prisma và Google Sheets** vào folders riêng để dễ maintain
4. **Test với cả hai data sources** trước khi deploy
