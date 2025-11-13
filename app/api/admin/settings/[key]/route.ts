import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import type { SettingRecord } from '@/lib/types/setting'
import { updateSettingSchema, validateSettingValue } from '@/lib/validations/setting-schemas'
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

// GET setting by key
export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key: rawKey } = await params
    const key = decodeURIComponent(rawKey)

    const db = await getDb()
    const settingsCollection = db.collection<SettingRecord>('settings')

    const setting = await settingsCollection.findOne({ key })

    if (!setting) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      data: transformSetting(setting)
    })
  } catch (error) {
    console.error('Error fetching setting:', error)
    return NextResponse.json(
      { error: 'Failed to fetch setting' },
      { status: 500 }
    )
  }
}

// PUT update setting by key
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key: rawKey } = await params
    const key = decodeURIComponent(rawKey)
    const body = await validateRequestBody(request, updateSettingSchema)

    const db = await getDb()
    const settingsCollection = db.collection<SettingRecord>('settings')

    // Check if setting exists
    const existing = await settingsCollection.findOne({ key })
    if (!existing) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      )
    }

    // If value or type is being updated, validate the value
    const newType = body.type || existing.type
    const newValue = body.value !== undefined ? body.value : existing.value

    if (body.value !== undefined && !validateSettingValue(newValue, newType)) {
      return NextResponse.json(
        { error: `Giá trị không hợp lệ cho kiểu ${newType}` },
        { status: 400 }
      )
    }

    // Build update object
    const updateData: any = {
      updatedAt: Math.floor(Date.now() / 1000),
    }

    if (body.value !== undefined) updateData.value = body.value
    if (body.type !== undefined) updateData.type = body.type
    if (body.description !== undefined) updateData.description = body.description || null
    if (body.group !== undefined) updateData.group = body.group || null
    if (body.isPublic !== undefined) updateData.isPublic = body.isPublic

    await settingsCollection.updateOne(
      { key },
      { $set: updateData }
    )

    // Fetch updated setting
    const updated = await settingsCollection.findOne({ key })

    return NextResponse.json({
      message: 'Setting updated successfully',
      data: transformSetting(updated!)
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation error')) {
      return handleValidationError(error)
    }
    console.error('Error updating setting:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update setting' },
      { status: 500 }
    )
  }
}

// DELETE setting by key
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key: rawKey } = await params
    const key = decodeURIComponent(rawKey)

    const db = await getDb()
    const settingsCollection = db.collection<SettingRecord>('settings')

    // Check if setting exists
    const existing = await settingsCollection.findOne({ key })
    if (!existing) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      )
    }

    await settingsCollection.deleteOne({ key })

    return NextResponse.json({
      message: 'Setting deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting setting:', error)
    return NextResponse.json(
      { error: 'Failed to delete setting' },
      { status: 500 }
    )
  }
}
