"use client"

import { getProductTitleFont, getProductDescriptionFont } from "@/lib/utils/font-utils"
import { useState } from "react"
import { Plus } from "lucide-react"

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface FAQSectionProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
}

export function FAQSection({
  title = "Câu hỏi thường gặp",
  subtitle = "Tìm câu trả lời cho những câu hỏi phổ biến về sản phẩm và quy trình chăm sóc da của chúng tôi",
  items,
}: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={getProductTitleFont("text-4xl md:text-5xl text-gray-900 tracking-tight mb-4 uppercase")}>
            {title}
          </h2>
          <p className={getProductDescriptionFont("text-lg text-gray-600")}>
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-stone-50 transition-colors text-left"
              >
                <h3 className={getProductTitleFont("text-lg text-gray-900 pr-4")}>
                  {item.question}
                </h3>
                <Plus
                  className={`w-5 h-5 text-stone-900 flex-shrink-0 transition-transform ${
                    expandedId === item.id ? "rotate-45" : ""
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="border-t border-stone-200 px-6 py-5 bg-stone-50">
                  <p className={getProductDescriptionFont("text-gray-700 leading-relaxed")}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
