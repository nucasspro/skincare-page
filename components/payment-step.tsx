"use client"

import { CreditCard, Wallet, Building2, Check } from "lucide-react"
import { useState } from "react"

interface PaymentStepProps {
  onBack: () => void
  onContinue: (paymentMethod: "cod" | "bank") => void
}

export function PaymentStep({ onBack, onContinue }: PaymentStepProps) {
  const [selectedPayment, setSelectedPayment] = useState<"cod" | "bank" | null>(null)

  const paymentMethods = [
    {
      id: "cod" as const,
      title: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán bằng tiền mặt khi nhận được hàng",
      icon: Wallet,
      details: "Nhân viên giao hàng sẽ thu tiền mặt khi bạn nhận được sản phẩm."
    },
    {
      id: "bank" as const,
      title: "Chuyển khoản qua ngân hàng",
      description: "Chuyển khoản trực tiếp vào tài khoản ngân hàng",
      icon: Building2,
      details: "Thông tin chuyển khoản sẽ được gửi đến email của bạn sau khi đặt hàng."
    }
  ]

  const bankInfo = {
    accountNumber: "1234567890",
    accountName: "CÔNG TY TNHH CELLIC",
    bank: "Ngân hàng Techcombank",
    branch: "Chi nhánh Hà Nội"
  }

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Payment Methods */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 h-heading">Phương thức thanh toán</h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            const isSelected = selectedPayment === method.id

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedPayment(method.id)}
                className={`
                  w-full text-left p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 transition-all duration-200
                  ${isSelected
                    ? "border-gray-900 bg-gray-50 shadow-md"
                    : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
                  }
                `}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div
                    className={`
                      w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                      ${isSelected ? "bg-gray-900 text-white" : "bg-stone-100 text-gray-600"}
                    `}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`
                            text-sm sm:text-base font-semibold mb-1 transition-colors
                            ${isSelected ? "text-gray-900" : "text-gray-700"}
                          `}
                        >
                          {method.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 mb-1 sm:mb-2 p-desc">{method.description}</p>
                        <p className="text-[11px] sm:text-xs text-stone-500 p-desc">{method.details}</p>
                      </div>

                      {/* Radio indicator */}
                      <div
                        className={`
                          w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${isSelected
                            ? "border-gray-900 bg-gray-900"
                            : "border-stone-300 bg-white"
                          }
                        `}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Bank Transfer Info - Show when bank transfer is selected */}
        {selectedPayment === "bank" && (
          <div className="mt-4 sm:mt-5 md:mt-6 p-4 sm:p-5 bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl animate-in slide-in-from-top-4 fade-in duration-300">
            <h4 className="text-xs sm:text-sm font-bold text-blue-900 mb-3 sm:mb-4 uppercase tracking-wide">
              Thông tin chuyển khoản
            </h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <span className="text-blue-800 font-medium">Số tài khoản:</span>
                <span className="text-blue-900 font-bold font-mono break-all sm:break-normal">{bankInfo.accountNumber}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <span className="text-blue-800 font-medium">Chủ tài khoản:</span>
                <span className="text-blue-900 font-semibold break-all sm:break-normal">{bankInfo.accountName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <span className="text-blue-800 font-medium">Ngân hàng:</span>
                <span className="text-blue-900 break-all sm:break-normal">{bankInfo.bank}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <span className="text-blue-800 font-medium">Chi nhánh:</span>
                <span className="text-blue-900 break-all sm:break-normal">{bankInfo.branch}</span>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-blue-200">
              <p className="text-[11px] sm:text-xs text-blue-700 p-desc">
                ⚠️ Vui lòng chuyển khoản đúng số tiền và ghi rõ mã đơn hàng trong nội dung chuyển khoản.
                Thông tin chi tiết sẽ được gửi đến email sau khi đặt hàng.
              </p>
            </div>
          </div>
        )}

        {/* COD Info - Show when COD is selected */}
        {selectedPayment === "cod" && (
          <div className="mt-4 sm:mt-5 md:mt-6 p-4 sm:p-5 bg-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-green-900 mb-1.5 sm:mb-2">Thanh toán khi nhận hàng</h4>
                <ul className="text-[11px] sm:text-xs text-green-800 space-y-0.5 sm:space-y-1 p-desc">
                  <li>• Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng</li>
                  <li>• Nhân viên giao hàng sẽ thu tiền và cung cấp hóa đơn</li>
                  <li>• Không cần thanh toán trước, an toàn và tiện lợi</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 border-2 border-stone-300 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-stone-50 hover:border-stone-400 transition-all duration-200 text-sm sm:text-base"
        >
          ← Quay lại
        </button>
        <button
          type="button"
          onClick={() => selectedPayment && onContinue(selectedPayment)}
          disabled={!selectedPayment}
          className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          Xác nhận đơn hàng
          <span className="text-lg sm:text-xl">→</span>
        </button>
      </div>

      {/* Security Info */}
      <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-stone-500 p-desc">
        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Thông tin thanh toán được bảo mật</span>
      </div>
    </div>
  )
}

