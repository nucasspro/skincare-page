"use client"

import { getDistricts, getProvinces, getWards, type District, type Province, type Ward } from "@/lib/location-service"
import { Building2, CheckCircle2, ChevronDown, Loader2, MapPin, Phone, User } from "lucide-react"
import { useEffect, useState } from "react"
import { CustomSelect } from "./custom-select"

interface CheckoutFormData {
  name: string
  phone: string
  streetAddress: string
  provinceCode: number | null
  districtCode: number | null
  wardCode: number | null
}

// InputField component defined outside to prevent re-creation on every render
const InputField = ({
  icon: Icon,
  label,
  type = "text",
  ...props
}: {
  icon?: any
  label: string
  type?: string
  [key: string]: any
}) => (
  <div className="group">
      <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-2.5">
      {Icon && (
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-focus-within:text-gray-900 transition-colors duration-200 flex-shrink-0" />
      )}
      <span className="p-desc text-gray-700">{label}</span>
    </label>
    <input
      type={type}
      {...props}
      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 border border-stone-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all duration-200 bg-white hover:border-stone-300 text-gray-900 placeholder:text-stone-400 text-sm sm:text-[15px] leading-relaxed shadow-sm focus:shadow-md"
      style={{
        fontFamily: "var(--font-inter), sans-serif"
      }}
    />
  </div>
)

interface CheckoutFormProps {
  onStepChange?: (step: number, data?: {
    name: string
    phone: string
    streetAddress: string
    provinceName?: string
    districtName?: string
    wardName?: string
  }) => void
  currentStep?: number
}

export function CheckoutForm({ onStepChange, currentStep = 1 }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    streetAddress: "",
    provinceCode: null,
    districtCode: null,
    wardCode: null,
  })

  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingDistricts, setLoadingDistricts] = useState(false)
  const [loadingWards, setLoadingWards] = useState(false)

  // Load provinces on mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const data = await getProvinces()
        setProvinces(data || [])
      } catch (error) {
        console.error("Error loading provinces:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProvinces()
  }, [])

  // Load districts when province changes
  useEffect(() => {
    if (formData.provinceCode) {
      const loadDistricts = async () => {
        try {
          setLoadingDistricts(true)
          setDistricts([])
          setWards([])
          setFormData((prev) => ({ ...prev, districtCode: null, wardCode: null }))
          const data = await getDistricts(formData.provinceCode!)
          console.log("Loaded districts:", {
            provinceCode: formData.provinceCode,
            districtsCount: data?.length || 0,
            districts: data
          })
          setDistricts(data || [])
        } catch (error) {
          console.error("Error loading districts:", error)
          setDistricts([])
        } finally {
          setLoadingDistricts(false)
        }
      }
      loadDistricts()
    } else {
      setDistricts([])
      setWards([])
    }
  }, [formData.provinceCode])

  // Load wards when district changes
  useEffect(() => {
    if (formData.districtCode) {
      const loadWards = async () => {
        try {
          setLoadingWards(true)
          setWards([])
          setFormData((prev) => ({ ...prev, wardCode: null }))
          const data = await getWards(formData.districtCode!)
          setWards(data || [])
        } catch (error) {
          console.error("Error loading wards:", error)
        } finally {
          setLoadingWards(false)
        }
      }
      loadWards()
    } else {
      setWards([])
    }
  }, [formData.districtCode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (["provinceCode", "districtCode", "wardCode"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) : null }))
    } else if (name === "phone") {
      // Only allow numbers for phone
      const numbersOnly = value.replace(/\D/g, "")
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!isAddressComplete) {
      return
    }

    // Get names from codes
    const provinceName = provinces.find(p => p.code === formData.provinceCode)?.name
    const districtName = districts.find(d => d.code === formData.districtCode)?.name
    const wardName = wards.find(w => w.code === formData.wardCode)?.name

    // Move to next step (payment step = 2) with data
    if (onStepChange) {
      onStepChange(2, {
        name: formData.name,
        phone: formData.phone,
        streetAddress: formData.streetAddress,
        provinceName,
        districtName,
        wardName
      })
    }

    console.log("Form data:", formData)
  }

  const isAddressComplete = formData.streetAddress && formData.provinceCode && formData.districtCode && formData.wardCode

  const SelectField = ({
    icon: Icon,
    label,
    options,
    disabled,
    loading: fieldLoading,
    ...props
  }: {
    icon?: any
    label: string
    options: any[]
    disabled?: boolean
    loading?: boolean
    [key: string]: any
  }) => {
    const isDisabled = disabled || fieldLoading || loading
    const isEmpty = !props.value || props.value === ""

    return (
      <div className="group">
        <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-2.5">
          {Icon && (
            <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200 flex-shrink-0 ${isDisabled ? "text-gray-300" : "text-gray-500 group-focus-within:text-gray-900"
              }`} />
          )}
          <span className="p-desc text-gray-700">{label}</span>
        </label>
        <div className="relative">
          <select
            {...props}
            disabled={isDisabled}
            className={`
              w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5
              border rounded-lg sm:rounded-xl
              bg-white
              text-gray-900
              appearance-none
              cursor-pointer
              pr-9 sm:pr-11
              transition-all duration-200
              font-normal
              text-sm sm:text-[15px]
              leading-relaxed
              ${isDisabled
                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                : isEmpty
                  ? "border-stone-200 text-gray-400 hover:border-stone-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none"
                  : "border-stone-200 text-gray-900 hover:border-stone-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none shadow-sm"
              }
            `}
            style={{
              fontFamily: "var(--font-inter), sans-serif"
            }}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={`
                  ${option.value === "" ? "text-gray-400" : "text-gray-900"}
                  py-2
                `}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className={`
            absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2
            pointer-events-none
            transition-transform duration-200
            ${isDisabled ? "opacity-30" : "opacity-60"}
            group-focus-within:rotate-180
          `}>
            {fieldLoading ? (
              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 animate-spin" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
            )}
          </div>

          {/* Focus indicator */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-0 ring-gray-900/20 group-focus-within:ring-2 transition-all duration-200 pointer-events-none" />
        </div>
      </div>
    )
  }

  // Show shipping form only on step 1
  if (currentStep !== 1) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Personal Information Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 h-heading">Thông tin cá nhân</h3>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <InputField
            icon={User}
            label="Họ và tên *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên của bạn"
            required
          />

          <InputField
            icon={Phone}
            label="Số điện thoại *"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0912345678"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            required
          />
        </div>
      </div>

      {/* Address Information Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 h-heading">Địa chỉ giao hàng</h3>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <InputField
            icon={Building2}
            label="Số nhà, tên đường *"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Ví dụ: 123 Đường ABC, Lô A, Tòa nhà XYZ"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <CustomSelect
              icon={MapPin}
              label="Tỉnh/Thành phố"
              value={String(formData.provinceCode || "")}
              onChange={(value) => handleChange({ target: { name: "provinceCode", value } } as any)}
              disabled={false}
              loading={loading}
              required
              placeholder="Chọn tỉnh/thành phố"
              emptyMessage="Không có dữ liệu tỉnh/thành phố"
              searchable={true}
              options={[
                { value: "", label: "-- Chọn tỉnh/thành phố --" },
                ...provinces.map((p) => ({ value: String(p.code), label: p.name })),
              ]}
            />

            <CustomSelect
              icon={MapPin}
              label="Quận/Huyện"
              value={String(formData.districtCode || "")}
              onChange={(value) => handleChange({ target: { name: "districtCode", value } } as any)}
              disabled={!formData.provinceCode || loadingDistricts}
              loading={loadingDistricts}
              required
              placeholder={formData.provinceCode ? "Chọn quận/huyện" : "Chọn tỉnh/thành phố trước"}
              emptyMessage={districts.length === 0 ? "Không có dữ liệu quận/huyện" : "Chọn quận/huyện"}
              searchable={true}
              options={[
                { value: "", label: "-- Chọn quận/huyện --" },
                ...districts.map((d) => ({ value: String(d.code), label: d.name })),
              ]}
            />

            <CustomSelect
              icon={MapPin}
              label="Xã/Phường"
              value={String(formData.wardCode || "")}
              onChange={(value) => handleChange({ target: { name: "wardCode", value } } as any)}
              disabled={!formData.districtCode || loadingWards}
              loading={loadingWards}
              required
              placeholder={formData.districtCode ? "Chọn xã/phường" : "Chọn quận/huyện trước"}
              emptyMessage={wards.length === 0 ? "Không có dữ liệu xã/phường" : "Chọn xã/phường"}
              searchable={true}
              options={[
                { value: "", label: "-- Chọn xã/phường --" },
                ...wards.map((w) => ({ value: String(w.code), label: w.name })),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Address Preview - Animated */}
      {isAddressComplete && (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="space-y-2 sm:space-y-3 flex-1">
              <p className="text-xs sm:text-sm font-bold text-green-900 uppercase tracking-wider tag-small">
                Địa chỉ giao hàng đã hoàn tất
              </p>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-sm sm:text-base text-gray-900 font-semibold p-desc">
                  {formData.streetAddress}
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-2 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-700 p-desc">
                  <span>
                    <span className="font-semibold">Phường/Xã:</span> {wards.find(w => w.code === formData.wardCode)?.name}
                  </span>
                  <span>
                    <span className="font-semibold">Quận/Huyện:</span> {districts.find(d => d.code === formData.districtCode)?.name}
                  </span>
                  <span>
                    <span className="font-semibold">Tỉnh/TP:</span> {provinces.find(p => p.code === formData.provinceCode)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !isAddressComplete}
        className="w-full py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group relative overflow-hidden text-sm sm:text-base"
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              Đang tải...
            </>
          ) : (
            <>
              Tiếp tục thanh toán
              <span className="group-hover:translate-x-1 transition-transform text-base sm:text-lg">→</span>
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>

      {/* Security Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-stone-500 p-desc">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Thông tin của bạn được bảo vệ bằng mã hóa SSL</span>
      </div>
    </form>
  )
}