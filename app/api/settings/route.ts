import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import type { SettingRecord } from '@/lib/types/setting'
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

// GET public settings
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const group = searchParams.get('group')
    const key = searchParams.get('key')

    const db = await getDb()
    const settingsCollection = db.collection<SettingRecord>('settings')

    // Build filter - only public settings
    const filter: any = { isPublic: true }

    if (key) {
      filter.key = key
    } else if (group) {
      filter.group = group
    }

    const settings = await settingsCollection.find(filter).toArray()

    // If requesting by key, return single setting
    if (key) {
      const setting = settings[0]
      if (!setting) {
        return NextResponse.json(
          { error: 'Setting not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        data: transformSetting(setting)
      })
    }

    return NextResponse.json({
      data: settings.map(transformSetting)
    })
  } catch (error) {
    console.error('Error fetching public settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}
