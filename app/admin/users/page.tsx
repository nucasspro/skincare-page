'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { adminUserService, type User } from '@/lib/services/admin'
import { ActionButtons } from '@/components/admin/action-buttons'
import { Plus, RefreshCw, Save, Users, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    role: 'user',
  })

  const fetchUsers = async (showToast = false) => {
    try {
      setLoading(true)
      const users = await adminUserService.getAllUsers()
      setUsers(users)
      if (showToast) {
        toast.success('Đã làm mới dữ liệu')
      }
    } catch (error) {
      toast.error('Không thể tải danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email.trim() || !formData.name.trim()) {
      toast.error('Email và tên là bắt buộc')
      return
    }

    try {
      if (editingUser) {
        await adminUserService.updateUser(editingUser.id, formData)
        toast.success('Cập nhật người dùng thành công')
      } else {
        await adminUserService.createUser(formData)
        toast.success('Tạo người dùng thành công')
      }
      resetForm()
      fetchUsers()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể lưu người dùng')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      address: user.address || '',
      role: user.role,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return

    try {
      await adminUserService.deleteUser(id)
      toast.success('Xóa người dùng thành công')
      fetchUsers()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa người dùng')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingUser(null)
    setFormData({
      email: '',
      name: '',
      phone: '',
      address: '',
      role: 'user',
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="h-8 w-8" />
              Quản lý Người dùng
            </h1>
            <p className="mt-2 text-gray-600">Thêm, chỉnh sửa và quản lý người dùng</p>
          </div>
          {!showForm && (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => fetchUsers(true)}
                size="sm"
                variant="outline"
                disabled={loading}
                className="rounded cursor-pointer h-9 px-4 border-[var(--admin-neutral-gray)]/50 hover:bg-[var(--admin-hover-bg)] disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
              <Button
                onClick={() => setShowForm(true)}
                variant="outline"
                className="gap-2 rounded-md bg-[var(--admin-beige)] hover:bg-[var(--admin-beige)]/80 text-neutral-900 border-[var(--admin-beige)]/50 font-medium"
              >
                <Plus className="h-4 w-4" />
                Thêm người dùng
              </Button>
            </div>
          )}
        </div>

        {showForm && (
          <Card className="p-6 border border-[var(--admin-neutral-gray)]/50 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
              </h2>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="name">Tên *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Vai trò</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Button type="submit" variant="outline" className="gap-2 rounded-sm">
                  <Save className="h-4 w-4" />
                  {editingUser ? 'Cập nhật' : 'Tạo mới'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="rounded-sm">
                  Hủy
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card className="overflow-hidden border border-[var(--admin-neutral-gray)]/50 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--admin-cool-gray)]/30 border-b-2 border-[var(--admin-neutral-gray)]/50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-32">
                    Actions
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[250px]">
                    Email
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 min-w-[200px]">
                    Tên
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-40">
                    Số điện thoại
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-800 w-32">
                    Vai trò
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[var(--admin-neutral-gray)]/30">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <div className="p-6 w-fit mx-auto mb-4 rounded-2xl bg-[var(--admin-cool-gray)]/20">
                        <Users className="h-12 w-12 text-[var(--admin-cool-gray)] mx-auto" />
                      </div>
                      <h3 className="text-base font-semibold text-neutral-900 mb-2">
                        Chưa có người dùng nào
                      </h3>
                      <p className="text-sm text-neutral-500">
                        Nhấn "Thêm người dùng" để bắt đầu
                      </p>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[var(--admin-neutral-gray)]/30 hover:bg-[var(--admin-hover-bg)] transition-colors"
                    >
                      <td className="px-4 py-4 w-32">
                        <ActionButtons
                          onEdit={() => handleEdit(user)}
                          onDelete={() => handleDelete(user.id)}
                        />
                      </td>
                      <td className="px-4 py-4 min-w-[250px]">
                        <span className="text-base font-medium text-neutral-900">
                          {user.email}
                        </span>
                      </td>
                      <td className="px-4 py-4 min-w-[200px]">
                        <span className="text-base text-neutral-900">
                          {user.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 w-40">
                        <span className="text-sm text-neutral-600">
                          {user.phone || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-4 w-32">
                        <span className={`inline-flex px-2.5 py-1 text-sm font-medium rounded-md ${
                          user.role === 'admin'
                            ? 'bg-[var(--admin-beige)]/30 text-neutral-900'
                            : 'bg-[var(--admin-cool-gray)]/30 text-neutral-700'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
