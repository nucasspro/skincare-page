import type {
  ContactMessage,
  ContactMessageStatus,
  UpdateContactMessageData,
} from '@/lib/types/contact-message'
import { apiClient } from '@/lib/utils/api-client'

export interface ContactMessageListResponse {
  items: ContactMessage[]
  total: number
  page: number
  perPage: number
}

export interface GetContactMessagesOptions {
  page?: number
  perPage?: number
  status?: ContactMessageStatus | 'all'
  search?: string
}

class AdminContactMessageService {
  async getMessages(options: GetContactMessagesOptions = {}): Promise<ContactMessageListResponse> {
    const params = new URLSearchParams()

    if (options.page) params.set('page', String(options.page))
    if (options.perPage) params.set('perPage', String(options.perPage))
    if (options.status && options.status !== 'all') params.set('status', options.status)
    if (options.search) params.set('search', options.search)

    const queryString = params.toString()
    const url = queryString ? `/api/admin/contact-messages?${queryString}` : '/api/admin/contact-messages'

    return apiClient.get<ContactMessageListResponse>(url, {
      defaultErrorMessage: 'Không thể tải danh sách tin nhắn',
    })
  }

  async getMessage(id: string): Promise<ContactMessage> {
    return apiClient.get<ContactMessage>(`/api/admin/contact-messages/${id}`, {
      defaultErrorMessage: 'Không thể tải tin nhắn',
    })
  }

  async updateMessage(id: string, data: UpdateContactMessageData): Promise<ContactMessage> {
    return apiClient.put<ContactMessage>(`/api/admin/contact-messages/${id}`, data, {
      defaultErrorMessage: 'Không thể cập nhật tin nhắn',
    })
  }

  async deleteMessage(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/contact-messages/${id}`, {
      defaultErrorMessage: 'Không thể xóa tin nhắn',
    })
  }
}

export const adminContactMessageService = new AdminContactMessageService()
