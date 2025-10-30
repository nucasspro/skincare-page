"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation isTransparent={false} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900">Liên hệ với chúng tôi</h1>
            <p className="text-lg text-stone-600">
              Chúng tôi rất muốn nghe từ bạn. Gửi tin nhắn cho chúng tôi và chúng tôi sẽ trả lời trong thời gian sớm nhất.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information - Left */}
              <div className="space-y-8">
                {/* Email */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  </div>
                  <p className="text-stone-600 ml-13">
                    <a href="mailto:support@cellic.com" className="hover:text-gray-900 transition-colors">
                      support@cellic.com
                    </a>
                  </p>
                  <p className="text-sm text-stone-500 ml-13">Phản hồi trong 24 giờ</p>
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gray-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Điện thoại</h3>
                  </div>
                  <p className="text-stone-600 ml-13">
                    <a href="tel:+84123456789" className="hover:text-gray-900 transition-colors">
                      +84 (123) 456-789
                    </a>
                  </p>
                  <p className="text-sm text-stone-500 ml-13">Thứ 2 - Thứ 6, 9:00 - 18:00</p>
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Địa chỉ</h3>
                  </div>
                  <p className="text-stone-600 ml-13">
                    123 Đường Skincare<br />
                    Quận 1, TP.HCM<br />
                    Việt Nam
                  </p>
                </div>
              </div>

              {/* Contact Form - Right */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="Nhập email của bạn"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                      Chủ đề
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="Chủ đề của thông điệp"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                      Tin nhắn
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                      placeholder="Nhập tin nhắn của bạn..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
                  >
                    Gửi tin nhắn
                  </button>

                  {/* Success Message */}
                  {isSubmitted && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">✓ Tin nhắn của bạn đã được gửi thành công!</p>
                      <p className="text-sm text-green-700 mt-1">Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất.</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Response Time */}
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-semibold">24</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Phản hồi nhanh</h3>
                <p className="text-stone-600">Chúng tôi phản hồi trong vòng 24 giờ</p>
              </div>

              {/* Available Support */}
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-semibold">7</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Hỗ trợ mọi lúc</h3>
                <p className="text-stone-600">Dịch vụ hỗ trợ 7 ngày/tuần</p>
              </div>

              {/* Professional Team */}
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto">
                  <span className="text-xl font-semibold">∞</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Đội chuyên gia</h3>
                <p className="text-stone-600">Được hỗ trợ bởi các chuyên gia da liễu</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
