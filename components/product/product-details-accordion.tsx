"use client"

import { getProductTitleFont, getProductDescriptionFont } from "@/lib/utils/font-utils"
import Image from "next/image"
import { useState } from "react"

interface ProductDetailsAccordionProps {
  productSlug?: string
}

export function ProductDetailsAccordion({ productSlug }: ProductDetailsAccordionProps = {}) {
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "usage">("details")
  const isBrightMatte = productSlug === "bright-matte-sunscreen"

  const tabs = [
    { id: "details", label: "Chi tiết sản phẩm" },
    { id: "ingredients", label: "Thành phần", },
    { id: "usage", label: "Cách sử dụng" }
  ] as const

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="border-b border-stone-200 mb-6 sm:mb-7 md:mb-8">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={getProductTitleFont(
                  `px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base transition-all relative whitespace-nowrap uppercase ${activeTab === tab.id
                    ? "text-gray-900"
                    : "text-stone-600 hover:text-gray-900"
                  }`
                )}
              >
                {tab.label}
                {/* Bottom border for active tab */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-4 sm:py-5 md:py-6 lg:py-8 w-full overflow-x-hidden">
        {/* Chi tiết sản phẩm Tab - 2 Column Layout */}
        {activeTab === "details" && (
          <div className="animate-fadeIn w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-stretch">
              {/* Left Column - Content */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
                {isBrightMatte ? (
                  <>
                    {/* Introduction */}
                    <div className="min-w-0">
                      <p className={getProductDescriptionFont("text-sm sm:text-base md:text-lg text-stone-700 leading-relaxed break-words")}>
                        Kem chống nắng thế hệ mới ứng dụng công nghệ Nano và Booster cho hiệu quả chống nắng SPF50+ PA++++ cao, kết hợp PDRN và chiết xuất thiên nhiên giúp phục hồi, cân bằng da, nâng tone tự nhiên và kiểm soát dầu mịn lì cả ngày.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                      {/* Feature 1 */}
                      <div className="pb-3 sm:pb-3.5 md:pb-4 border-b border-stone-100">
                        <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                          <span className={getProductTitleFont("flex-shrink-0 w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-[10px] sm:text-[11px] md:text-xs flex items-center justify-center")}>
                            1
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={getProductTitleFont("text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base break-words")}>Hiệu quả chống nắng kéo dài 8h</h4>
                            <ul className="space-y-2 text-stone-700 text-xs sm:text-sm leading-relaxed">
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Công nghệ Nano kết hợp <strong>Ultrafine Titanium Dioxide</strong> và <strong>Nano Zinc Oxide</strong> giúp phân tán hạt chống nắng siêu mịn, tạo màng lọc phổ rộng bảo vệ toàn diện khỏi UVA, UVB và ánh sáng xanh HEV.
                                </span>
                              </li>
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Công nghệ <strong>booster</strong> tăng cường khả năng phản xạ – hấp thụ tia UV, giúp chống nắng liên tục suốt 8 giờ, đạt chuẩn <strong>SPF 50+ PA++++</strong>.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Feature 2 */}
                      <div className="pb-3 sm:pb-3.5 md:pb-4 border-b border-stone-100">
                        <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                          <span className={getProductTitleFont("flex-shrink-0 w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-[10px] sm:text-[11px] md:text-xs flex items-center justify-center")}>
                            2
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={getProductTitleFont("text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base break-words")}>Cân bằng và phục hồi da</h4>
                            <ul className="space-y-2 text-stone-700 text-xs sm:text-sm leading-relaxed">
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Công nghệ <strong>Micro Biome</strong> với <strong>Propanediol</strong> giúp cân bằng hệ vi sinh da, duy trì hàng rào bảo vệ tự nhiên và hỗ trợ hoạt động của các lợi khuẩn trên bề mặt da.
                                </span>
                              </li>
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Bổ sung <strong>PDRN rau má</strong> – hoạt chất phục hồi tế bào, <strong>Lavender Extract</strong> và <strong>Lonicera Japonica</strong> giúp kháng viêm, giảm kích ứng.
                                </span>
                              </li>
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Công thức lành tính: <strong>Không cồn – Không hương liệu – Không silicones nặng – Không cay mắt – Không bít tắc lỗ chân lông</strong>.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Feature 3 */}
                      <div>
                        <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                          <span className={getProductTitleFont("flex-shrink-0 w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 rounded-full bg-gray-900 text-white text-[10px] sm:text-[11px] md:text-xs flex items-center justify-center")}>
                            3
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={getProductTitleFont("text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base break-words")}>Nâng tone & kiềm dầu 8h</h4>
                            <ul className="space-y-2 text-stone-700 text-xs sm:text-sm leading-relaxed">
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Hiệu ứng <strong>Soft Focus</strong> giúp che phủ nhẹ khuyết điểm, nâng tone sáng hồng tự nhiên và duy trì màu da ổn định, không xuống tone vào cuối ngày.
                                </span>
                              </li>
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Hạt nano siêu mịn giúp lớp kem tán đều, mịn lì, nhẹ mặt, mang lại hiệu ứng <strong>matte tự nhiên</strong>, không bóng nhờn.
                                </span>
                              </li>
                              <li className={getProductDescriptionFont("flex items-start gap-2")}>
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-900 mt-2" />
                                <span className="break-words min-w-0">
                                  Công nghệ <strong>Smart Oil Control</strong> kiểm soát bã nhờn thông minh, cho cảm giác khô thoáng, thoải mái suốt cả ngày.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="min-w-0">
                      <h3 className={getProductTitleFont("text-lg sm:text-xl md:text-2xl text-gray-900 mb-3 sm:mb-4 break-words uppercase")}>Giới thiệu sản phẩm</h3>
                      <p className={getProductDescriptionFont("text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed break-words")}>
                        Bảo vệ, làm dịu và nuôi dưỡng làn da dưới nắng, Cellic Bright Matte Sunscreen giúp da luôn thoáng nhẹ, sáng mịn và khỏe mạnh nhờ công nghệ chống nắng thông minh và chiết xuất thiên nhiên lành tính.
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="pb-3 sm:pb-4 border-b border-stone-100">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className={getProductTitleFont("flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-900 text-white text-[10px] sm:text-xs flex items-center justify-center")}>
                            1
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={getProductTitleFont("text-gray-900 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base break-words")}>Hiệu quả màng lọc chống nắng ưu việt</h4>
                            <p className={getProductDescriptionFont("text-xs sm:text-sm text-stone-700 leading-relaxed break-words")}>
                              Ứng dụng công nghệ Nano và Booster cùng 4 màng lọc phổ rộng SPF 50+/ PA++++ bảo vệ da an toàn trước ánh sáng năng lượng cao nhìn thấy được HEV.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pb-3 sm:pb-4 border-b border-stone-100">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className={getProductTitleFont("flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-900 text-white text-[10px] sm:text-xs flex items-center justify-center")}>
                            2
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={getProductTitleFont("text-gray-900 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base break-words")}>Lớp finish mỏng nhẹ và kiềm dầu</h4>
                            <p className={getProductDescriptionFont("text-xs sm:text-sm text-stone-700 leading-relaxed break-words")}>
                              Công nghệ Smart Oil Control cùng các hạt nano siêu mịn giúp kem thấm nhanh, cho lớp nền ráo, mịn, tự nhiên, hạn chế bóng nhờn suốt cả ngày dài.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className={getProductTitleFont("flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-900 text-white text-[10px] sm:text-xs flex items-center justify-center")}>
                            3
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={getProductTitleFont("text-gray-900 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base break-words")}>Thành phần dịu nhẹ và lành tính</h4>
                            <p className={getProductDescriptionFont("text-xs sm:text-sm text-stone-700 leading-relaxed break-words")}>
                              Chứa thành phần PDRN, chiết xuất kim ngân hoa và công nghệ Microbiome cân bằng hệ vi sinh cho da, tăng cường sức đề kháng khi hoạt động dưới ánh nắng. Không cồn, không hương liệu, không silicone nặng, không cay mắt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Image */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
                  <Image
                    src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop"
                    alt="Sản phẩm chăm sóc da"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Thành phần Tab */}
        {activeTab === "ingredients" && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 animate-fadeIn max-w-3xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
            <h3 className={getProductTitleFont("text-lg sm:text-xl md:text-2xl text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-center break-words uppercase")}>Thành phần và công nghệ</h3>

            <div className="space-y-1">
              {/* Uvinul A Plus */}
              <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5 py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 border-b border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="flex-shrink-0 pt-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={getProductTitleFont("text-gray-900 text-xs sm:text-sm md:text-base mb-1 sm:mb-1.5 md:mb-2 break-words")}>Uvinul® A Plus</h4>
                  <p className={getProductDescriptionFont("text-stone-600 text-xs sm:text-sm leading-relaxed break-words")}>
                    Màng lọc UVA thế hệ mới, bảo vệ da khỏi tác nhân gây lão hoá và tổn thương do tia UVA dài, duy trì hiệu quả chống nắng ổn định suốt nhiều giờ.
                  </p>
                </div>
              </div>

              {/* Công nghệ Microbiome */}
              <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5 py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 border-b border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="flex-shrink-0 pt-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="8" r="2" fill="currentColor" />
                    <circle cx="12" cy="16" r="2" fill="currentColor" />
                    <circle cx="8" cy="12" r="2" fill="currentColor" />
                    <circle cx="16" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={getProductTitleFont("text-gray-900 text-xs sm:text-sm md:text-base mb-1 sm:mb-1.5 md:mb-2 break-words")}>Công nghệ Microbiome</h4>
                  <p className={getProductDescriptionFont("text-stone-600 text-xs sm:text-sm leading-relaxed break-words")}>
                    Hỗ trợ cân bằng hệ vi sinh, giúp da giảm kích ứng, tăng sức đề kháng tự nhiên và làm dịu da khi hoạt động dưới ánh nắng.
                  </p>
                </div>
              </div>

              {/* Công nghệ Smart Oil Control */}
              <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5 py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 border-b border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="flex-shrink-0 pt-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 6v3M12 15v3M6 12h3M15 12h3" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={getProductTitleFont("text-gray-900 text-xs sm:text-sm md:text-base mb-1 sm:mb-1.5 md:mb-2 break-words")}>Công nghệ Smart Oil Control</h4>
                  <p className={getProductDescriptionFont("text-stone-600 text-xs sm:text-sm leading-relaxed break-words")}>
                    Giúp kiềm dầu và khô thoáng suốt cả ngày dài, phù hợp với nền da thường đến da dầu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cách sử dụng Tab */}
        {activeTab === "usage" && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 animate-fadeIn max-w-3xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
            <h3 className={getProductTitleFont("text-lg sm:text-xl md:text-2xl text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-center break-words uppercase")}>Cách sử dụng</h3>

            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-3 sm:left-4 md:left-5 lg:left-6 top-0 bottom-0 w-px bg-stone-200 hidden sm:block"></div>

              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                {/* Step 1 */}
                <div className="relative flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-6 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className={getProductTitleFont("w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-gray-900 flex items-center justify-center")}>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white">1</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5 sm:pt-1 md:pt-1.5 lg:pt-2">
                    <p className={getProductDescriptionFont("text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed break-words")}>
                      Sử dụng một lượng vừa đủ, đảm bảo che phủ toàn mặt và cổ.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-6 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className={getProductTitleFont("w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-gray-900 flex items-center justify-center")}>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white">2</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5 sm:pt-1 md:pt-1.5 lg:pt-2">
                    <p className={getProductDescriptionFont("text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed break-words")}>
                      Thao tác thoa tròn nhẹ nhàng giúp kem dàn đều và thấm vào da.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-6 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className={getProductTitleFont("w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-gray-900 flex items-center justify-center")}>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white">3</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5 sm:pt-1 md:pt-1.5 lg:pt-2">
                    <p className={getProductDescriptionFont("text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed break-words")}>
                      Sử dụng trước khi trang điểm và trước đi hoạt động dưới ánh nắng 15 phút để có lớp bảo vệ tuyệt đối cho da.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
