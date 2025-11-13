'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { adminSettingService } from '@/lib/services/admin/setting-service'
import type { CreateSettingData, Setting } from '@/lib/types/setting'
import { SettingType } from '@/lib/types/setting'
import { Edit, Plus, Save, Settings, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SETTING_TYPES: { value: SettingType; label: string }[] = [
  { value: SettingType.STRING, label: 'Chuỗi' },
  { value: SettingType.NUMBER, label: 'Số' },
  { value: SettingType.IMAGE, label: 'Hình ảnh (URL)' },
  { value: SettingType.BOOLEAN, label: 'Boolean' },
  { value: SettingType.JSON, label: 'JSON' },
]

const COMMON_GROUPS = ['contact', 'seo', 'social', 'general', 'appearance']

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<Setting[]>([])
  const [filteredSettings, setFilteredSettings] = useState<Setting[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null)
  const [formData, setFormData] = useState<CreateSettingData>({
    key: '',
    value: '',
    type: SettingType.STRING,
    description: '',
    group: '',
    isPublic: false,
  })

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const data = await adminSettingService.getAllSettings()
      setSettings(data)
      setFilteredSettings(data)
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

  useEffect(() => {
    let filtered = settings

    // Filter by group
    if (selectedGroup !== 'all') {
      filtered = filtered.filter((s) => s.group === selectedGroup)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.key.toLowerCase().includes(query) ||
          s.value.toLowerCase().includes(query) ||
          s.description?.toLowerCase().includes(query) ||
          s.group?.toLowerCase().includes(query)
      )
    }

    setFilteredSettings(filtered)
  }, [settings, selectedGroup, searchQuery])

  const handleCreate = () => {
    setEditingSetting(null)
    setFormData({
      key: '',
      value: '',
      type: SettingType.STRING,
      description: '',
      group: '',
      isPublic: false,
    })
    setShowForm(true)
  }

  const handleEdit = (setting: Setting) => {
    setEditingSetting(setting)
    setFormData({
      key: setting.key,
      value: setting.value,
      type: setting.type,
      description: setting.description || '',
      group: setting.group || '',
      isPublic: setting.isPublic,
    })
    setShowForm(true)
  }

  const handleDelete = async (key: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa setting "${key}"?`)) {
      return
    }

    try {
      await adminSettingService.deleteSetting(key)
      toast.success('Đã xóa setting thành công')
      fetchSettings()
    } catch (error) {
      console.error('Error deleting setting:', error)
      toast.error('Không thể xóa setting')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.key.trim()) {
      toast.error('Key là bắt buộc')
      return
    }

    if (!formData.value.trim()) {
      toast.error('Value là bắt buộc')
      return
    }

    // Validate key format (snake_case)
    if (!/^[a-z0-9_]+$/.test(formData.key)) {
      toast.error('Key chỉ được chứa chữ thường, số và dấu gạch dưới')
      return
    }

    try {
      setSaving(true)

      if (editingSetting) {
        // Update existing setting
        await adminSettingService.updateSetting(editingSetting.key, {
          value: formData.value,
          type: formData.type,
          description: formData.description || undefined,
          group: formData.group || undefined,
          isPublic: formData.isPublic,
        })
        toast.success('Đã cập nhật setting thành công')
      } else {
        // Create new setting
        await adminSettingService.createSetting(formData)
        toast.success('Đã tạo setting thành công')
      }

      setShowForm(false)
      fetchSettings()
    } catch (error: any) {
      console.error('Error saving setting:', error)
      toast.error(error.message || 'Không thể lưu setting')
    } finally {
      setSaving(false)
    }
  }

  const getGroups = (): string[] => {
    const groups = new Set(settings.map((s) => s.group).filter((g): g is string => Boolean(g)))
    return Array.from(groups).sort()
  }

  const renderValueInput = () => {
    switch (formData.type) {
      case SettingType.BOOLEAN:
        return (
          <select
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        )
      case SettingType.JSON:
        return (
          <Textarea
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder='{"key": "value"}'
            className="w-full min-h-[120px] font-mono text-sm"
          />
        )
      case SettingType.IMAGE:
        return (
          <div className="space-y-2">
            <Input
              type="url"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full"
            />
            {formData.value && (
              <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                <img
                  src={formData.value}
                  alt="Preview"
                  className="w-full h-auto max-h-48 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>
        )
      case SettingType.NUMBER:
        return (
          <Input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder="0"
            className="w-full"
          />
        )
      default:
        return (
          <Input
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder="Nhập giá trị"
            className="w-full"
          />
        )
    }
  }

  const formatValue = (setting: Setting): string => {
    if (setting.type === SettingType.BOOLEAN) {
      return setting.value === 'true' ? 'True' : 'False'
    }
    if (setting.type === SettingType.IMAGE) {
      return setting.value ? '🔗 URL' : 'Chưa có'
    }
    if (setting.type === SettingType.JSON) {
      try {
        const parsed = JSON.parse(setting.value)
        return JSON.stringify(parsed, null, 2).substring(0, 50) + '...'
      } catch {
        return setting.value.substring(0, 50)
      }
    }
    return setting.value.length > 50 ? setting.value.substring(0, 50) + '...' : setting.value
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
              <Settings className="h-8 w-8" />
              Cài đặt
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Quản lý các cài đặt hệ thống (liên hệ, SEO, mạng xã hội, v.v.)
            </p>
          </div>
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm setting
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <Label className="text-sm font-medium mb-2 block">Tìm kiếm</Label>
                <Input
                  placeholder="Tìm theo key, value, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="min-w-[200px]">
                <Label className="text-sm font-medium mb-2 block">Nhóm</Label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                >
                  <option value="all">Tất cả</option>
                  {getGroups().map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Danh sách Settings ({filteredSettings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSettings.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                {searchQuery || selectedGroup !== 'all' ? 'Không tìm thấy setting nào' : 'Chưa có setting nào. Hãy tạo setting mới.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-100 border-b-2 border-neutral-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-800">Key</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-800">Value</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-800">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-800">Group</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-800">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-800 w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredSettings.map((setting) => (
                      <tr key={setting.id} className="hover:bg-neutral-50">
                        <td className="px-4 py-3">
                          <code className="text-sm font-mono bg-neutral-100 px-2 py-1 rounded">
                            {setting.key}
                          </code>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-700 max-w-md truncate">
                          {formatValue(setting)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {SETTING_TYPES.find((t) => t.value === setting.type)?.label || setting.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-600">
                          {setting.group || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-600 max-w-xs truncate">
                          {setting.description || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(setting)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(setting.key)}
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Dialog */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{editingSetting ? 'Sửa Setting' : 'Thêm Setting Mới'}</CardTitle>
                    <CardDescription>
                      {editingSetting
                        ? 'Cập nhật thông tin setting'
                        : 'Tạo setting mới để quản lý cấu hình hệ thống'}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Key */}
                  <div className="space-y-2">
                    <Label htmlFor="key">
                      Key <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="key"
                      value={formData.key}
                      onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                      placeholder="contact_phone"
                      disabled={!!editingSetting}
                      className="w-full font-mono"
                    />
                    <p className="text-xs text-neutral-500">
                      Chỉ được chứa chữ thường, số và dấu gạch dưới (snake_case)
                    </p>
                  </div>

                  {/* Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">
                      Type <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as SettingType })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                    >
                      {SETTING_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Value */}
                  <div className="space-y-2">
                    <Label htmlFor="value">
                      Value <span className="text-red-500">*</span>
                    </Label>
                    {renderValueInput()}
                  </div>

                  {/* Group */}
                  <div className="space-y-2">
                    <Label htmlFor="group">Group</Label>
                    <Input
                      id="group"
                      value={formData.group || ''}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      placeholder="contact, seo, social, etc."
                      className="w-full"
                      list="groups"
                    />
                    <datalist id="groups">
                      {COMMON_GROUPS.map((group) => (
                        <option key={group} value={group} />
                      ))}
                    </datalist>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Mô tả về setting này"
                      className="w-full"
                    />
                  </div>

                  {/* Is Public */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="isPublic" className="cursor-pointer">
                      Public (có thể truy cập không cần auth)
                    </Label>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Hủy
                    </Button>
                    <Button type="submit" disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Đang lưu...' : editingSetting ? 'Cập nhật' : 'Tạo mới'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
