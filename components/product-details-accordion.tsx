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
                className={`px-6 md:px-8 py-4 text-base font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
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
                    Cellic được phát triển dựa trên nền tảng khoa học da liễu hiện đại, với công thức độc quyền kết hợp giữa các hoạt chất bảo vệ tiến tiến và chiết xuất sinh học tự nhiên, nhằm mang đến khả năng chống nắng tối ưu, bảo về da khỏi tác hại của tia UV và ô nhiễm môi trường.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900">Công nghệ chính</h3>

                  <div className="space-y-4">
                    <div className="pb-4 border-b border-stone-100 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
                          1
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Hệ thống màng lọc tia UV thế hệ mới</h4>
                          <p className="text-stone-700 text-sm leading-relaxed">
                            Sự kết hợp giữa Uvinul A Plus, Tinosorb S, và Zinc Oxide đang vị hạt phủ silane giúp tạo nên lớp bảo vệ phổ rộng, ngăn chặn cả tia UVA và UVB, ổn định dưới ánh sáng mạnh và duy trị hiệu quả lâu dài trên da.
                          </p>
                          <p className="text-stone-600 text-sm mt-2 italic">→ Công dụng: Giảm thiểu nguy cơ sạm nâm, lão hoá sớm và tổn thương DNA tế bào da.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pb-4 border-b border-stone-100 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
                          2
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Phức hợp chống oxy hóa sinh học (Bio-Antioxidant Complex)</h4>
                          <p className="text-stone-700 text-sm leading-relaxed">
                            Chứa Vitamin E, Niacinamide (Vitamin B3) và chiết xuất cá hồi giàu peptide tự nhiên, giúp trung hòa gốc tự do, tăng cường hàng rào bảo vệ da và hỗ trợ tái tạo tế bào mới.
                          </p>
                          <p className="text-stone-600 text-sm mt-2 italic">→ Công dụng: Làm dịu da, giảm kích ứng do nắng, phục hồi độ dẫn hồi và sáng mịn tự nhiên.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
                          3
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Hệ đặn truyền công nghệ vi bao (Encapsulation Technology)</h4>
                          <p className="text-stone-700 text-sm leading-relaxed">
                            Các hoạt chất chống nắng và dưỡng chất được bao vì mô bằng công nghệ Encap-Lipid, giúp phân bố đồng đều, thâm thấu tốt nhưng không gây bít tắc lỗ chân lông.
                          </p>
                          <p className="text-stone-600 text-sm mt-2 italic">→ Công dụng: Cảm giác nhẹ, thoáng, không nhờn rít – phù hợp với cả da nhạy cảm.</p>
                        </div>
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
          <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thành phần chính</h3>
              <p className="text-stone-700 leading-relaxed mb-6">
                Công thức được phát triển với những thành phần an toàn, hiệu quả và được kiểm chứng lâm sàn:
              </p>

              <div className="space-y-3 grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Uvinul A Plus (5%)</div>
                    <p className="text-sm text-stone-700">Chống UV dài, ổn định và an toàn cho da</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Tinosorb S (3%)</div>
                    <p className="text-sm text-stone-700">Bảo vệ phổ rộng UVA/UVB thế hệ mới</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Zinc Oxide (8%)</div>
                    <p className="text-sm text-stone-700">Chống UV vật lý, an toàn và lành tính</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Vitamin E (2%)</div>
                    <p className="text-sm text-stone-700">Chống oxy hóa mạnh, bảo vệ da</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Niacinamide (5%)</div>
                    <p className="text-sm text-stone-700">Cân bằng độ ẩm, giảm bóng nhờn</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Centella Asiatica</div>
                    <p className="text-sm text-stone-700">Làm dịu, phục hồi da tổn thương</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Lưu ý:</span> Không chứa paraben, sulfate, dầu khoáng và các chất hóa học có hại. Đã được kiểm nghiệm dermatologically cho cả da nhạy cảm.
              </p>
            </div>
          </div>
        )}

        {/* Cách sử dụng Tab */}
        {activeTab === "usage" && (
          <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Hướng dẫn sử dụng</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white font-semibold">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Làm sạch da</h4>
                    <p className="text-stone-700 text-sm">Rửa mặt bằng sữa rửa mặt nhẹ nhàng, sau đó lau khô hoàn toàn</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white font-semibold">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Thoa serum/toner</h4>
                    <p className="text-stone-700 text-sm">Nếu sử dụng serum hoặc toner, hãy thoa trước khi sử dụng kem chống nắng</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white font-semibold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Thoa kem chống nắng</h4>
                    <p className="text-stone-700 text-sm">Lấy một lượng khoảng đậu phộng (hạt lạc), phân bố đều lên toàn mặt, cổ và vùng tai</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white font-semibold">
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Để khô tự nhiên</h4>
                    <p className="text-stone-700 text-sm">Để kem tự khô trong 2-3 phút trước khi trang điểm hoặc tiếp xúc với ánh nắng</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white font-semibold">
                      5
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Tái thoa định kỳ</h4>
                    <p className="text-stone-700 text-sm">Tái thoa mỗi 2-3 giờ, hoặc ngay sau khi bơi/đổ mồ hôi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Buổi sáng</h4>
                <p className="text-sm text-green-800">Sử dụng sau các sản phẩm chăm sóc da và trước trang điểm</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Buổi chiều</h4>
                <p className="text-sm text-purple-800">Thoa trước khi ra ngoài hoặc lên phố</p>
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
