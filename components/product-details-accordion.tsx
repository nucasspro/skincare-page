"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ProductDetailsAccordion() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Product Details</h2>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="ingredients" className="border border-stone-200 rounded-xl px-6">
          <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">Ingredients</AccordionTrigger>
          <AccordionContent className="text-stone-700 pb-6 space-y-4">
            <p className="leading-relaxed">
              Our carefully selected ingredients work synergistically to deliver optimal results:
            </p>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-900">Hyaluronic Acid (2%):</span> Deeply hydrates and plumps
                skin, reducing the appearance of fine lines
              </div>
              <div>
                <span className="font-medium text-gray-900">Peptide Complex:</span> Supports collagen production and
                improves skin elasticity
              </div>
              <div>
                <span className="font-medium text-gray-900">Niacinamide (5%):</span> Brightens skin tone and minimizes
                pores
              </div>
              <div>
                <span className="font-medium text-gray-900">Botanical Extracts:</span> Centella Asiatica, Green Tea, and
                Chamomile soothe and protect
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-to-use" className="border border-stone-200 rounded-xl px-6">
          <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">How to Use</AccordionTrigger>
          <AccordionContent className="text-stone-700 pb-6 space-y-4">
            <ol className="space-y-3 list-decimal list-inside">
              <li className="leading-relaxed">
                <span className="font-medium text-gray-900">Cleanse:</span> Start with clean, dry skin
              </li>
              <li className="leading-relaxed">
                <span className="font-medium text-gray-900">Apply:</span> Dispense 2-3 drops onto fingertips and gently
                press into face and neck
              </li>
              <li className="leading-relaxed">
                <span className="font-medium text-gray-900">Pat:</span> Gently pat until fully absorbed
              </li>
              <li className="leading-relaxed">
                <span className="font-medium text-gray-900">Follow:</span> Continue with your moisturizer and sunscreen
                (AM routine)
              </li>
            </ol>
            <p className="text-sm text-stone-600 pt-2">
              Use morning and evening for best results. Can be layered with other serums.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="benefits" className="border border-stone-200 rounded-xl px-6">
          <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">Benefits</AccordionTrigger>
          <AccordionContent className="text-stone-700 pb-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Immediate Benefits</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>Instant hydration boost</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>Smoother, softer skin texture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>Radiant, dewy glow</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Long-term Benefits</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>Reduced fine lines and wrinkles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>Improved skin elasticity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 mt-1">•</span>
                    <span>More even skin tone</span>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="clinical-results" className="border border-stone-200 rounded-xl px-6">
          <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">Clinical Results</AccordionTrigger>
          <AccordionContent className="text-stone-700 pb-6 space-y-4">
            <p className="leading-relaxed">Based on a 4-week clinical study with 100 participants:</p>
            <div className="grid md:grid-cols-3 gap-6 pt-4">
              <div className="text-center space-y-2">
                <div className="text-4xl font-light text-gray-900">98%</div>
                <div className="text-sm text-stone-600">Reported improved hydration</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-light text-gray-900">92%</div>
                <div className="text-sm text-stone-600">Noticed smoother texture</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-light text-gray-900">87%</div>
                <div className="text-sm text-stone-600">Saw reduced fine lines</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
