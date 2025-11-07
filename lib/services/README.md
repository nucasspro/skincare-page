# Services Directory Structure

Tổ chức lại thư mục services để tách biệt admin và MongoDB data source.

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
│   ├── index.ts                    # MongoDB data source factory
│   │
│   └── mongodb/                    # MongoDB implementation
│       ├── mongodb-client.ts       # MongoDB Prisma client (optional)
│       ├── mongodb-data-source.ts  # MongoDB native driver implementation
│       └── index.ts
│
├── product-data-service.ts         # Product service layer (abstraction)
└── README.md
```

## 🎯 Mục đích

1. **Admin services** (`admin/`): Services cho admin panel
2. **Data sources** (`data-sources/`): MongoDB data source abstraction
3. **MongoDB** (`data-sources/mongodb/`): MongoDB implementation sử dụng native MongoDB driver

## 🚀 Cách sử dụng

### 1. Sử dụng Product Data Service

```typescript
import { productDataService } from '@/lib/services/product-data-service'

// Get all products (tự động dùng MongoDB)
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

### 2. Direct Data Source Access

Nếu cần truy cập trực tiếp:

```typescript
import { dataSource } from '@/lib/services/data-sources'

// dataSource sử dụng MongoDB
const products = await dataSource.getAllProducts()
```

### 3. Access MongoDB Data Source trực tiếp

```typescript
import { MongoDataSource } from '@/lib/services/data-sources/mongodb'
const mongoSource = new MongoDataSource()
const products = await mongoSource.getAllProducts()
```

## 🔄 Cách hoạt động

1. **MongoDB Only**: `data-sources/index.ts` luôn trả về MongoDB data source
2. **Service Layer**: `product-data-service.ts` wrap data source với error handling
3. **Interface**: MongoDB data source implement `IDataSource` interface
4. **Native Driver**: Sử dụng MongoDB native driver để tối ưu performance

## ⚙️ Error Handling

Service tự động handle errors và throw với message rõ ràng.

## 💡 Best Practices

1. **Luôn dùng `productDataService`** thay vì truy cập trực tiếp data source
2. **MongoDB Native Driver**: Sử dụng native MongoDB driver để tối ưu performance
3. **Error Handling**: Service layer tự động handle errors và throw với message rõ ràng
4. **Type Safety**: Sử dụng TypeScript interfaces để đảm bảo type safety
