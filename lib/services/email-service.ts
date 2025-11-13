import nodemailer from 'nodemailer'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import type { SettingRecord } from '@/lib/types/setting'
import type { ContactMessage } from '@/lib/types/contact-message'
import { SMTP_SETTING_KEYS, EMAIL_SETTING_KEYS } from '@/lib/constants/setting-keys'

interface TemplateReplacements {
  [key: string]: string
}

function formatDate(timestampSeconds: number | null | undefined): string {
  const date = timestampSeconds ? new Date(timestampSeconds * 1000) : new Date()
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function replacePlaceholders(template: string, replacements: TemplateReplacements): string {
  return Object.entries(replacements).reduce((acc, [key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'gi')
    return acc.replace(regex, value)
  }, template)
}

async function getSettingsMap(keys: string[]): Promise<Record<string, string>> {
  const db = await getDb()
  const settingsCollection = db.collection<SettingRecord>('settings')
  const settings = await settingsCollection
    .find({ key: { $in: keys } })
    .toArray()

  return settings.reduce<Record<string, string>>((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {})
}

class EmailService {
  private readonly defaultSubjectTemplate = 'Tin nhắn mới từ {{name}} - {{subject}}'

  private readonly defaultBodyTemplate = `
    <h2>Bạn có tin nhắn mới từ form liên hệ</h2>
    <p><strong>Tên:</strong> {{name}}</p>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Chủ đề:</strong> {{subject}}</p>
    <p><strong>Nội dung:</strong></p>
    <p>{{message}}</p>
    <p><strong>Thời gian:</strong> {{date}}</p>
  `

  async sendContactNotification(message: ContactMessage): Promise<void> {
    try {
      const smtpKeys = Object.values(SMTP_SETTING_KEYS)
      const templateKeys = Object.values(EMAIL_SETTING_KEYS)
      const settings = await getSettingsMap([...smtpKeys, ...templateKeys])

      const host = settings[SMTP_SETTING_KEYS.HOST]
      const port = settings[SMTP_SETTING_KEYS.PORT]
      const from = settings[SMTP_SETTING_KEYS.FROM]
      const to = settings[SMTP_SETTING_KEYS.TO]

      if (!host || !port || !from || !to) {
        console.warn('[EmailService] Missing SMTP configuration, skipping email notification')
        return
      }

      const portNumber = Number(port)
      const user = settings[SMTP_SETTING_KEYS.USER]
      const pass = settings[SMTP_SETTING_KEYS.PASSWORD]

      const transporter = nodemailer.createTransport({
        host,
        port: portNumber || 587,
        secure: portNumber === 465,
        auth: user && pass ? { user, pass } : undefined,
      })

      const subjectTemplate = settings[EMAIL_SETTING_KEYS.CONTACT_SUBJECT] || this.defaultSubjectTemplate
      const bodyTemplate = settings[EMAIL_SETTING_KEYS.CONTACT_BODY] || this.defaultBodyTemplate

      const replacements: TemplateReplacements = {
        name: escapeHtml(message.name),
        email: escapeHtml(message.email),
        subject: escapeHtml(message.subject),
        message: escapeHtml(message.message).replace(/\n/g, '<br />'),
        date: formatDate(message.createdAt ?? Math.floor(Date.now() / 1000)),
      }

      const subject = replacePlaceholders(subjectTemplate, replacements)
      const html = replacePlaceholders(bodyTemplate, replacements)

      await transporter.sendMail({
        from,
        to,
        subject,
        html,
      })
    } catch (error) {
      console.error('[EmailService] Failed to send contact notification email:', error)
    }
  }
}

export const emailService = new EmailService()
