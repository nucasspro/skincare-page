import { NextResponse } from 'next/server'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'

interface Settings {
  siteTitle: string
  siteDescription: string
  ogImage: string
  updatedAt: number
}

// GET settings
export async function GET() {
  try {
    const db = await getDb()
    const settingsCollection = db.collection<Settings>('settings')
    
    // Get settings or return defaults
    const settings = await settingsCollection.findOne({})
    
    if (!settings) {
      // Return default settings
      return NextResponse.json({
        data: {
          siteTitle: 'Cellic - Mỹ phẩm chăm sóc da',
          siteDescription: 'Mỹ phẩm chăm sóc da chất lượng cao',
          ogImage: '',
          updatedAt: Math.floor(Date.now() / 1000),
        }
      })
    }

    return NextResponse.json({
      data: {
        siteTitle: settings.siteTitle || '',
        siteDescription: settings.siteDescription || '',
        ogImage: settings.ogImage || '',
        updatedAt: settings.updatedAt || Math.floor(Date.now() / 1000),
      }
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// PUT update settings
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { siteTitle, siteDescription, ogImage } = body

    if (!siteTitle || !siteDescription) {
      return NextResponse.json(
        { error: 'Site title and description are required' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const settingsCollection = db.collection<Settings>('settings')
    
    const updatedSettings: Settings = {
      siteTitle,
      siteDescription,
      ogImage: ogImage || '',
      updatedAt: Math.floor(Date.now() / 1000),
    }

    // Upsert settings (update if exists, insert if not)
    await settingsCollection.updateOne(
      {},
      { $set: updatedSettings },
      { upsert: true }
    )

    return NextResponse.json({
      message: 'Settings updated successfully',
      data: updatedSettings
    })
  } catch (error: any) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update settings' },
      { status: 500 }
    )
  }
}

