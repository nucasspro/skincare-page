import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import type { SettingRecord } from '@/lib/types/setting'
import { createSettingSchema, validateSettingValue } from '@/lib/validations/setting-schemas'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

/**
 * Transform MongoDB document to Setting format
 */
function transformSetting(doc: any): any {
  return {
    id: doc._id?.toString() || doc.id,
    key: doc.key,
    value: doc.value,
    type: doc.type,
    description: doc.description || null,
    group: doc.group || null,
    isPublic: doc.isPublic || false,
    createdAt: doc.createdAt || 0,
    updatedAt: doc.updatedAt || 0,
  }
}

// GET all settings
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const group = searchParams.get('group')

    const db = await getDb()
    const settingsCollection = db.collection<SettingRecord>('settings')

    // Build filter
    const filter: any = {}
    if (group) {
      filter.group = group
    }

    const settings = await settingsCollection.find(filter).toArray()

    return NextResponse.json({
      data: settings.map(transformSetting)
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// POST create new setting
export async function POST(request: Request) {
  try {
    const body = await validateRequestBody(request, createSettingSchema)

    // Validate value based on type
    if (!validateSettingValue(body.value, body.type)) {
      return NextResponse.json(
        { error: `Giá trị không hợp lệ cho kiểu ${body.type}` },
        { status: 400 }
      )
    }

    const db = await getDb()
    const settingsCollection = db.collection<SettingRecord>('settings')

    // Check if key already exists
    const existing = await settingsCollection.findOne({ key: body.key })
    if (existing) {
      return NextResponse.json(
        { error: `Setting với key "${body.key}" đã tồn tại` },
        { status: 400 }
      )
    }

    const now = Math.floor(Date.now() / 1000)
    const newSetting: any = {
      _id: new ObjectId(),
      key: body.key,
      value: body.value,
      type: body.type,
      description: body.description || null,
      group: body.group || null,
      isPublic: body.isPublic || false,
      createdAt: now,
      updatedAt: now,
    }

    await settingsCollection.insertOne(newSetting)

    return NextResponse.json({
      message: 'Setting created successfully',
      data: transformSetting(newSetting)
    }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation error')) {
      return handleValidationError(error)
    }
    console.error('Error creating setting:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create setting' },
      { status: 500 }
    )
  }
}
