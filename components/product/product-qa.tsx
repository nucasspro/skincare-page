"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getProductTitleFont, getProductDescriptionFont } from "@/lib/utils/font-utils"

const faqs = [
  {
    question: "Sản phẩm có phù hợp với da nhạy cảm không?",
    answer:
      "Hoàn toàn phù hợp bạn nhé! Công thức Cellic được phát triển dưới sự tư vấn của các chuyên gia da liễu, không chứa cồn, hương liệu hay silicones nặng. Các thành phần dịu nhẹ như Kim Ngân Hoa và PDRN và cả công nghệ Microbiome giúp làm dịu và phục hồi hàng rào bảo vệ tự nhiên, để da nhạy cảm cũng cảm thấy an toàn và dễ chịu khi sử dụng mỗi ngày.",
  },
  {
    question: "Có thể dùng chung với serum không?",
    answer:
      "Có nhé bạn ơi! Kem chống nắng Cellic hoạt động hài hòa với các bước dưỡng khác. Bạn chỉ cần để serum thấm vào da khoảng 30 giây trước khi thoa kem chống nắng là da đã sẵn sàng để được bảo vệ suốt ngày dài rồi.",
  },
  {
    question: "Kem chống nắng có bị trôi khi hoạt động nhiều và đổ mồ hôi không?",
    answer:
      "Cellic Bright Matte Sunscreen được thiết kế với công nghệ Booster và kết cấu Smart Oil Control, giúp lớp chống nắng bám vững và ổn định ngay cả khi da đổ mồ hôi nhẹ. Chất kem mỏng nhẹ, nhanh khô, không để lại cảm giác nhờn rít, giúp da luôn thoáng mịn và được bảo vệ bền vững suốt nhiều giờ hoạt động.",
  },
]

export interface ProductQAProps {
  limit?: number
}

export function ProductQA({ limit }: ProductQAProps) {
  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <h2 className={getProductTitleFont("text-3xl md:text-4xl text-gray-900 uppercase")}>Câu hỏi thường gặp</h2>
        <p className={getProductDescriptionFont("text-stone-600 text-base")}>Mọi thông tin bạn cần biết về sản phẩm này</p>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="space-y-4 mb-16">
        {displayedFaqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden"
          >
            <AccordionTrigger className={getProductTitleFont("text-left text-gray-900 hover:no-underline px-6 py-5 hover:bg-stone-50 transition-colors")}>
              <span className="pr-4">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className={getProductDescriptionFont("text-stone-700 px-6 pb-6 pt-0 leading-relaxed text-[15px]")}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 md:p-10">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className={getProductTitleFont("text-xl text-gray-900")}>Vẫn còn thắc mắc?</h3>
          <p className={getProductDescriptionFont("text-stone-600 text-sm")}>
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>
          <button className={getProductTitleFont("mt-4 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:shadow-lg hover:scale-105 duration-300 inline-flex items-center gap-2")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Liên hệ ngay
          </button>
        </div>
      </div>
    </div>
  )
}
