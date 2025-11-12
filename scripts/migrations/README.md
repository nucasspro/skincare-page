# Migration Scripts

This directory contains migration scripts to update the database schema and migrate existing data.

## Prerequisites

1. Make sure your `.env` file has the correct `MONGODB_URI` and `MONGODB_DB_NAME` (if needed)
2. Install dependencies: `pnpm install` or `npm install`

## Available Migrations

### 1. Add Soft Delete Fields

**File:** `add-soft-delete-fields.ts`

**Purpose:** Adds `isDeleted` and `deletedAt` fields to all collections (products, categories, orders, reviews, comments)

**What it does:**
- Adds `isDeleted: false` to all existing records
- Adds `deletedAt: null` to all existing records
- Updates `updatedAt` timestamp

**Usage:**
```bash
npx tsx scripts/migrations/add-soft-delete-fields.ts
```

**When to run:** After updating schema to include `isDeleted` and `deletedAt` fields

---

### 2. Migrate Category to CategoryId

**File:** `migrate-category-to-categoryid.ts`

**Purpose:** Migrates existing `category` field (string) to `categoryId` (ObjectId reference) for Products

**What it does:**
- Maps category names to category IDs from categories collection
- Updates products with `categoryId` field
- Keeps `category` field for backward compatibility

**Usage:**
```bash
npx tsx scripts/migrations/migrate-category-to-categoryid.ts
```

**When to run:** After adding `categoryId` relation to Product schema

**Note:** This script keeps the old `category` field for backward compatibility. You can remove it later after verifying everything works.

---

## Running All Migrations

To run all migrations in order:

```bash
# 1. Add soft delete fields
npx tsx scripts/migrations/add-soft-delete-fields.ts

# 2. Migrate category to categoryId
npx tsx scripts/migrations/migrate-category-to-categoryid.ts
```

## Verification

After running migrations, verify the changes:

1. **Check soft delete fields:**
```javascript
// In MongoDB shell or Compass
db.products.findOne({ isDeleted: { $exists: true } })
db.categories.findOne({ isDeleted: { $exists: true } })
```

2. **Check categoryId migration:**
```javascript
// In MongoDB shell or Compass
db.products.findOne({ categoryId: { $exists: true } })
```

## Rollback

These migrations are designed to be safe and non-destructive:
- Soft delete migration only adds fields, doesn't remove anything
- Category migration keeps the old `category` field for backward compatibility

If you need to rollback:
1. Remove `isDeleted` and `deletedAt` fields manually
2. Remove `categoryId` field and keep using `category` field

## Best Practices

1. **Backup your database** before running migrations
2. **Test migrations on a staging database** first
3. **Run migrations during low-traffic periods** if possible
4. **Verify data integrity** after each migration
5. **Monitor logs** for any errors or warnings

