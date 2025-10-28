"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is this suitable for sensitive skin?",
    answer:
      "Yes! Our formula is dermatologist-tested and suitable for all skin types, including sensitive skin. We use gentle, non-irritating ingredients and avoid common allergens.",
  },
  {
    question: "How long does one bottle last?",
    answer:
      "With regular use (2-3 drops twice daily), one 30ml bottle typically lasts 2-3 months, making it an excellent value for premium skincare.",
  },
  {
    question: "Can I use this with other serums?",
    answer:
      "This serum layers beautifully with other products. Apply it after cleansing and before heavier creams. Wait 30 seconds between layers for optimal absorption.",
  },
  {
    question: "When will I see results?",
    answer:
      "Most users notice improved hydration and radiance within 7 days. For anti-aging benefits like reduced fine lines, consistent use for 4-6 weeks is recommended.",
  },
  {
    question: "Is this product cruelty-free and vegan?",
    answer:
      "Yes! We are proud to be 100% cruelty-free and vegan. We never test on animals and all our ingredients are plant-based or synthetic.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee for unopened products. If you're not satisfied, contact our customer service team for a full refund.",
  },
]

export function ProductQA() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-3xl font-light text-gray-900">Frequently Asked Questions</h2>
        <p className="text-stone-600">Everything you need to know about this product</p>
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
        <p className="text-stone-600 mb-4">Still have questions?</p>
        <button className="text-gray-900 font-medium hover:text-stone-600 transition-colors underline underline-offset-4">
          Contact our customer service team
        </button>
      </div>
    </div>
  )
}
