"use client"

import Image from "next/image"
import { useState } from "react"

export function ProductDetailsAccordion() {
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "usage">("details")

  const tabs = [
    { id: "details", label: "Chi tiết sản phẩm" },
    { id: "ingredients", label: "Thành phân", },
    { id: "usage", label: "Cách sử dụng" }
  ] as const

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-stone-200 mb-8">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 md:px-8 py-4 text-base font-medium transition-all relative whitespace-nowrap ${activeTab === tab.id
                  ? "text-gray-900"
                  : "text-stone-600 hover:text-gray-900"
                  }`}
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
      <div className="py-8 w-full">
        {/* Chi tiết sản phẩm Tab - 2 Column Layout */}
        {activeTab === "details" && (
          <div className="animate-fadeIn w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* Left Column - Content */}
              <div className="space-y-6 px-4 sm:px-6 lg:px-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Giới thiệu sản phẩm</h3>
                  <p className="text-stone-700 leading-relaxed">
                    Bảo vệ, làm dịu và nuôi dưỡng làn da dưới nắng, Cellic Bright Matte Sunscreen giúp da luôn thoáng nhẹ, sáng mịn và khỏe mạnh nhờ công nghệ chống nắng thông minh và chiết xuất thiên nhiên lành tính.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="pb-4 border-b border-stone-100">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
                        1
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Hiệu quả màng lọc chống nắng ưu việt</h4>
                        <p className="text-stone-700 text-sm leading-relaxed">
                          Ứng dụng công nghệ Nano và Booster cùng 4 màng lọc phổ rộng SPF 50+/ PA++++ bảo vệ da an toàn trước ánh sáng năng lượng cao nhìn thấy được HEV.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-stone-100">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
                        2
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Lớp finish mỏng nhẹ và kiềm dầu</h4>
                        <p className="text-stone-700 text-sm leading-relaxed">
                          Công nghệ Smart Oil Control cùng các hạt nano siêu mịn giúp kem thấm nhanh, cho lớp nền ráo, mịn, tự nhiên, hạn chế bóng nhờn suốt cả ngày dài.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
                        3
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Thành phần dịu nhẹ và lành tính</h4>
                        <p className="text-stone-700 text-sm leading-relaxed">
                          Chứa thành phần PDRN, chiết xuất kim ngân hoa và công nghệ Microbiome cân bằng hệ vi sinh cho da, tăng cường sức đề kháng khi hoạt động dưới ánh nắng. Không cồn, không hương liệu, không silicone nặng, không cay mắt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full h-full min-h-[500px]">
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

        {/* Thành phân Tab */}
        {activeTab === "ingredients" && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Thành phần và công nghệ</h3>

            <div className="space-y-1">
              {/* Uvinul A Plus */}
              <div className="flex items-start gap-5 py-6 border-b border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="flex-shrink-0 pt-1">
                  <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base mb-2">Uvinul® A Plus</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Màng lọc UVA thế hệ mới, bảo vệ da khỏi tác nhân gây lão hoá và tổn thương do tia UVA dài, duy trì hiệu quả chống nắng ổn định suốt nhiều giờ.
                  </p>
                </div>
              </div>

              {/* Công nghệ Microbiome */}
              <div className="flex items-start gap-5 py-6 border-b border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="flex-shrink-0 pt-1">
                  <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="8" r="2" fill="currentColor" />
                    <circle cx="12" cy="16" r="2" fill="currentColor" />
                    <circle cx="8" cy="12" r="2" fill="currentColor" />
                    <circle cx="16" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base mb-2">Công nghệ Microbiome</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Hỗ trợ cân bằng hệ vi sinh, giúp da giảm kích ứng, tăng sức đề kháng tự nhiên và làm dịu da khi hoạt động dưới ánh nắng.
                  </p>
                </div>
              </div>

              {/* Công nghệ Smart Oil Control */}
              <div className="flex items-start gap-5 py-6 border-b border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="flex-shrink-0 pt-1">
                  <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 6v3M12 15v3M6 12h3M15 12h3" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base mb-2">Công nghệ Smart Oil Control</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Giúp kiềm dầu và khô thoáng suốt cả ngày dài, phù hợp với nền da thường đến da dầu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cách sử dụng Tab */}
        {activeTab === "usage" && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Cách sử dụng</h3>

            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-stone-200 hidden sm:block"></div>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="relative flex gap-6 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">1</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-gray-900 leading-relaxed">
                      Sử dụng một lượng vừa đủ, đảm bảo che phủ toàn mặt và cổ.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-6 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">2</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-gray-900 leading-relaxed">
                      Thao tác thoa tròn nhẹ nhàng giúp kem dàn đều và thấm vào da.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex gap-6 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">3</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-gray-900 leading-relaxed">
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
