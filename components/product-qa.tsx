"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Sản phẩm này có phù hợp với da nhạy cảm không?",
    answer:
      "Có! Công thức của chúng tôi đã được bác sĩ da liễu kiểm nghiệm và phù hợp với mọi loại da, kể cả da nhạy cảm. Chúng tôi sử dụng các thành phần dịu nhẹ, không gây kích ứng và tránh các chất gây dị ứng phổ biến.",
  },
  {
    question: "Một chai sản phẩm dùng được bao lâu?",
    answer:
      "Với việc sử dụng thường xuyên (2-3 giọt, hai lần mỗi ngày), một chai 30ml thường dùng được 2-3 tháng, mang lại giá trị tuyệt vời cho sản phẩm chăm sóc da cao cấp.",
  },
  {
    question: "Tôi có thể dùng sản phẩm này với các serum khác không?",
    answer:
      "Serum này kết hợp rất tốt với các sản phẩm khác. Thoa sau bước làm sạch và trước các loại kem đậm đặc hơn. Đợi 30 giây giữa các lớp để hấp thụ tối ưu.",
  },
  {
    question: "Khi nào tôi sẽ thấy kết quả?",
    answer:
      "Hầu hết người dùng nhận thấy da ẩm mượt và sáng hơn trong vòng 7 ngày. Đối với lợi ích chống lão hóa như giảm nếp nhăn, nên sử dụng đều đặn trong 4-6 tuần.",
  },
  {
    question: "Sản phẩm có không thử nghiệm trên động vật và thuần chay không?",
    answer:
      "Có! Chúng tôi tự hào là thương hiệu 100% không thử nghiệm trên động vật và thuần chay. Chúng tôi không bao giờ thử nghiệm trên động vật và tất cả thành phần đều có nguồn gốc thực vật hoặc tổng hợp.",
  },
  {
    question: "Chính sách đổi trả của bạn như thế nào?",
    answer:
      "Chúng tôi cung cấp chính sách hoàn tiền trong 30 ngày cho sản phẩm chưa mở. Nếu bạn không hài lòng, hãy liên hệ đội ngũ chăm sóc khách hàng để được hoàn tiền đầy đủ.",
  },
]

export function ProductQA() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-3xl font-light text-gray-900">Câu hỏi thường gặp</h2>
        <p className="text-stone-600">Mọi thông tin bạn cần biết về sản phẩm này</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-white border border-stone-200 rounded-xl px-6"
          >
            <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-stone-700 pb-5 leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-10">
        <p className="text-stone-600 mb-4">Vẫn còn thắc mắc?</p>
        <button className="text-gray-900 font-medium hover:text-stone-600 transition-colors underline underline-offset-4">
          Liên hệ đội ngũ chăm sóc khách hàng
        </button>
      </div>
    </div>
  )
}
