'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Settings, Save, Globe, Image as ImageIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SettingsData {
  siteTitle: string
  siteDescription: string
  ogImage: string
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<SettingsData>({
    siteTitle: '',
    siteDescription: '',
    ogImage: '',
  })

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/settings')
      
      if (!response.ok) {
        throw new Error('Failed to fetch settings')
      }

      const result = await response.json()
      setSettings({
        siteTitle: result.data.siteTitle || '',
        siteDescription: result.data.siteDescription || '',
        ogImage: result.data.ogImage || '',
      })
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Không thể tải cài đặt')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!settings.siteTitle.trim() || !settings.siteDescription.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    try {
      setSaving(true)
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      toast.success('Đã lưu cài đặt thành công')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Không thể lưu cài đặt')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
            <div className="text-sm text-neutral-600">Đang tải cài đặt...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Cài đặt
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Quản lý thông tin SEO và chia sẻ mạng xã hội
          </p>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Thông tin SEO
              </CardTitle>
              <CardDescription>
                Cài đặt tiêu đề và mô tả website cho SEO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Site Title */}
              <div className="space-y-2">
                <Label htmlFor="siteTitle" className="text-sm font-medium">
                  Tiêu đề website <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="siteTitle"
                  value={settings.siteTitle}
                  onChange={(e) =>
                    setSettings({ ...settings, siteTitle: e.target.value })
                  }
                  placeholder="Ví dụ: Cellic - Mỹ phẩm chăm sóc da"
                  className="w-full"
                  maxLength={70}
                />
                <p className="text-xs text-neutral-500">
                  {settings.siteTitle.length}/70 ký tự (tối ưu cho SEO: 50-60 ký tự)
                </p>
              </div>

              {/* Site Description */}
              <div className="space-y-2">
                <Label htmlFor="siteDescription" className="text-sm font-medium">
                  Mô tả website <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, siteDescription: e.target.value })
                  }
                  placeholder="Ví dụ: Mỹ phẩm chăm sóc da chất lượng cao, được bác sĩ da liễu khuyên dùng"
                  className="w-full min-h-[100px]"
                  maxLength={160}
                />
                <p className="text-xs text-neutral-500">
                  {settings.siteDescription.length}/160 ký tự (tối ưu cho SEO: 120-150 ký tự)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* OG Image */}
          <Card className="border-0 shadow-md mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Hình ảnh chia sẻ (OG Image)
              </CardTitle>
              <CardDescription>
                Hình ảnh hiển thị khi chia sẻ website lên mạng xã hội (Facebook, Twitter, LinkedIn...)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ogImage" className="text-sm font-medium">
                  URL hình ảnh
                </Label>
                <Input
                  id="ogImage"
                  type="url"
                  value={settings.ogImage}
                  onChange={(e) =>
                    setSettings({ ...settings, ogImage: e.target.value })
                  }
                  placeholder="https://example.com/images/og-image.jpg"
                  className="w-full"
                />
                <p className="text-xs text-neutral-500">
                  Kích thước khuyến nghị: 1200x630px (tỷ lệ 1.91:1)
                </p>
              </div>

              {/* Preview */}
              {settings.ogImage && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Xem trước</Label>
                  <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                    <img
                      src={settings.ogImage}
                      alt="OG Image Preview"
                      className="w-full h-auto"
                      onError={(e) => {
                        e.currentTarget.src = ''
                        toast.error('Không thể tải hình ảnh. Vui lòng kiểm tra URL.')
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

