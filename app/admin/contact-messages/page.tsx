'use client'

import { AdminLayout } from '@/components/admin/admin-layout'
import { Pagination } from '@/components/admin/pagination'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ContactMessage,
  ContactMessageStatus,
} from '@/lib/types/contact-message'
import { adminContactMessageService } from '@/lib/services/admin/contact-message-service'
import { Mail, RefreshCw, Search, MoreVertical, Eye, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

const STATUS_LABELS: Record<ContactMessageStatus, string> = {
  [ContactMessageStatus.UNREAD]: 'Chưa đọc',
  [ContactMessageStatus.READ]: 'Đã đọc',
  [ContactMessageStatus.REPLIED]: 'Đã trả lời',
  [ContactMessageStatus.ARCHIVED]: 'Lưu trữ',
}

const STATUS_CLASSES: Record<ContactMessageStatus, string> = {
  [ContactMessageStatus.UNREAD]: 'bg-blue-100 text-blue-700 border border-blue-200',
  [ContactMessageStatus.READ]: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
  [ContactMessageStatus.REPLIED]: 'bg-green-100 text-green-700 border border-green-200',
  [ContactMessageStatus.ARCHIVED]: 'bg-amber-100 text-amber-700 border border-amber-200',
}

const STATUS_OPTIONS: ({ value: 'all'; label: string } | { value: ContactMessageStatus; label: string })[] = [
  { value: 'all', label: 'Tất cả' },
  { value: ContactMessageStatus.UNREAD, label: STATUS_LABELS[ContactMessageStatus.UNREAD] },
  { value: ContactMessageStatus.READ, label: STATUS_LABELS[ContactMessageStatus.READ] },
  { value: ContactMessageStatus.REPLIED, label: STATUS_LABELS[ContactMessageStatus.REPLIED] },
  { value: ContactMessageStatus.ARCHIVED, label: STATUS_LABELS[ContactMessageStatus.ARCHIVED] },
]

const DEFAULT_PER_PAGE = 10

function formatDateTime(timestamp?: number | null): string {
  if (!timestamp) return '-'
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<'all' | ContactMessageStatus>('all')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / DEFAULT_PER_PAGE)), [total])

  const fetchMessages = async (showToast = false) => {
    try {
      if (!loading) {
        setFetching(true)
      }
      const data = await adminContactMessageService.getMessages({
        page,
        perPage: DEFAULT_PER_PAGE,
        status: statusFilter,
        search: searchQuery || undefined,
      })
      setMessages(data.items)
      setTotal(data.total)
      if (showToast) {
        toast.success('Đã làm mới dữ liệu')
      }
    } catch (error) {
      toast.error('Không thể tải danh sách tin nhắn')
    } finally {
      setLoading(false)
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearchQuery(searchInput.trim())
  }

  const handleStatusFilter = (value: 'all' | ContactMessageStatus) => {
    setStatusFilter(value)
    setPage(1)
  }

  const handleStatusChange = async (id: string, status: ContactMessageStatus) => {
    try {
      setUpdatingId(id)
      const updated = await adminContactMessageService.updateMessage(id, {
        status,
        repliedAt: status === ContactMessageStatus.REPLIED ? Math.floor(Date.now() / 1000) : null,
      })
      setMessages((prev) => prev.map((message) => (message.id === id ? updated : message)))
      if (selectedMessage?.id === id) {
        setSelectedMessage(updated)
      }
      toast.success('Đã cập nhật trạng thái tin nhắn')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể cập nhật tin nhắn')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')
    if (!confirmDelete) return

    try {
      setDeletingId(id)
      await adminContactMessageService.deleteMessage(id)
      setMessages((prev) => prev.filter((message) => message.id !== id))
      setTotal((prev) => Math.max(0, prev - 1))
      toast.success('Đã xóa tin nhắn')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể xóa tin nhắn')
    } finally {
      setDeletingId(null)
    }
  }

  const handleView = (message: ContactMessage) => {
    setSelectedMessage(message)
    setDetailOpen(true)
  }

  const handleRefresh = () => {
    fetchMessages(true)
  }

  const renderStatusBadge = (status: ContactMessageStatus) => (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASSES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Tin nhắn liên hệ</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Quản lý tin nhắn từ form liên hệ của khách hàng
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" disabled={fetching} className="cursor-pointer">
          <RefreshCw className={`mr-2 h-4 w-4 ${fetching ? 'animate-spin' : ''}`} /> Làm mới
        </Button>
      </div>

      <Card className="shadow-sm border-neutral-200">
        <CardHeader className="border-b border-neutral-200">
          <CardTitle className="text-lg font-semibold">Danh sách tin nhắn</CardTitle>
          <CardDescription>Tra cứu, lọc và xử lý các tin nhắn từ khách hàng</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSearch} className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex-1 flex items-center gap-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="Tìm theo tên, email hoặc chủ đề"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" variant="default" className="cursor-pointer">
                  Tìm kiếm
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {STATUS_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={statusFilter === option.value ? 'default' : 'outline'}
                    className={`cursor-pointer text-sm ${statusFilter === option.value ? 'bg-neutral-900 text-white hover:bg-neutral-800' : ''}`}
                    onClick={() => handleStatusFilter(option.value as 'all' | ContactMessageStatus)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </form>

            <div className="overflow-x-auto border border-neutral-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-neutral-500">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium">Người gửi</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Chủ đề</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Ngày tạo</th>
                    <th className="px-4 py-3 font-medium text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-neutral-500">
                        Đang tải dữ liệu...
                      </td>
                    </tr>
                  ) : messages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-neutral-500">
                        Không có tin nhắn nào
                      </td>
                    </tr>
                  ) : (
                    messages.map((message) => (
                      <tr key={message.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-neutral-900">{message.name}</div>
                          <div className="text-xs text-neutral-500">{message.id}</div>
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{message.email}</td>
                        <td className="px-4 py-3 text-neutral-700 truncate max-w-[220px]" title={message.subject}>
                          {message.subject}
                        </td>
                        <td className="px-4 py-3">{renderStatusBadge(message.status)}</td>
                        <td className="px-4 py-3 text-neutral-700">{formatDateTime(message.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 cursor-pointer"
                                  disabled={updatingId === message.id}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Chọn hành động</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={() => handleView(message)}
                                  className="cursor-pointer"
                                >
                                  <Eye className="h-4 w-4" /> Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {Object.values(ContactMessageStatus).map((status) => (
                                  <DropdownMenuItem
                                    key={status}
                                    onSelect={() => handleStatusChange(message.id, status)}
                                    className="cursor-pointer"
                                  >
                                    <span className="inline-flex items-center gap-2">
                                      <span className={`h-2 w-2 rounded-full ${
                                        status === ContactMessageStatus.UNREAD
                                          ? 'bg-blue-500'
                                          : status === ContactMessageStatus.REPLIED
                                            ? 'bg-green-500'
                                            : status === ContactMessageStatus.ARCHIVED
                                              ? 'bg-amber-500'
                                              : 'bg-neutral-400'
                                      }`} />
                                      {STATUS_LABELS[status]}
                                    </span>
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={() => handleDelete(message.id)}
                                  className="text-destructive focus:bg-red-50 focus:text-destructive cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" /> Xóa tin nhắn
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={total}
              itemsPerPage={DEFAULT_PER_PAGE}
              onPageChange={setPage}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open)
          if (!open) {
            setSelectedMessage(null)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-neutral-500" />
              Chi tiết tin nhắn
            </DialogTitle>
            {selectedMessage && (
              <DialogDescription>
                Tin nhắn từ {selectedMessage.name} - {selectedMessage.email}
              </DialogDescription>
            )}
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Người gửi</p>
                  <p className="text-neutral-900 font-medium mt-1">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Email</p>
                  <p className="text-neutral-900 font-medium mt-1">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Chủ đề</p>
                  <p className="text-neutral-900 font-medium mt-1">{selectedMessage.subject}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Trạng thái</p>
                  <div className="mt-1">{renderStatusBadge(selectedMessage.status)}</div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Ngày tạo</p>
                  <p className="text-neutral-900 font-medium mt-1">{formatDateTime(selectedMessage.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Cập nhật lần cuối</p>
                  <p className="text-neutral-900 font-medium mt-1">{formatDateTime(selectedMessage.updatedAt)}</p>
                </div>
                {selectedMessage.repliedAt ? (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Thời gian trả lời</p>
                    <p className="text-neutral-900 font-medium mt-1">{formatDateTime(selectedMessage.repliedAt)}</p>
                  </div>
                ) : null}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Nội dung</p>
                <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-neutral-800 whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
