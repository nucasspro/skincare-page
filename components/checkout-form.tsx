"use client"

import { getDistricts, getProvinces, getWards, type District, type Province, type Ward } from "@/lib/location-service"
import { Building2, Loader2, MapPin, Phone, User } from "lucide-react"
import { useEffect, useState } from "react"

interface CheckoutFormData {
  name: string
  email: string
  phone: string
  streetAddress: string
  provinceCode: number | null
  districtCode: number | null
  wardCode: number | null
}

export function CheckoutForm() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
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
  const [loadingMessage, setLoadingMessage] = useState("Đang tải dữ liệu...")

  // Load provinces on mount
  useEffect(() => {
    const loadProvinces = async () => {
      setLoadingMessage("Đang tải tỉnh/thành phố...")
      const data = await getProvinces()
      setProvinces(data || [])
      setLoading(false)
    }
    loadProvinces()
  }, [])

  // Load districts when province changes
  useEffect(() => {
    if (formData.provinceCode) {
      const loadDistricts = async () => {
        setLoadingMessage("Đang tải quận/huyện...")
        const data = await getDistricts(formData.provinceCode!)
        setDistricts(data || [])
        setWards([]) // Clear wards
        setFormData((prev) => ({ ...prev, districtCode: null, wardCode: null }))
      }
      loadDistricts()
    }
  }, [formData.provinceCode])

  // Load wards when district changes
  useEffect(() => {
    if (formData.districtCode) {
      const loadWards = async () => {
        setLoadingMessage("Đang tải xã/phường...")
        const data = await getWards(formData.districtCode!)
        setWards(data || [])
        setFormData((prev) => ({ ...prev, wardCode: null }))
      }
      loadWards()
    }
  }, [formData.districtCode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (["provinceCode", "districtCode", "wardCode"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) : null }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
    // Handle checkout submission
  }

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
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-600" />}
        {label}
      </label>
      <input
        type={type}
        {...props}
        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white hover:border-stone-300"
      />
    </div>
  )

  const SelectField = ({
    icon: Icon,
    label,
    options,
    disabled,
    ...props
  }: {
    icon?: any
    label: string
    options: any[]
    disabled?: boolean
    [key: string]: any
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-600" />}
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          disabled={disabled || loading}
          className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white hover:border-stone-300 disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {disabled && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
        )}
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 space-y-4 text-center max-w-md">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto" />
            <p className="text-lg font-semibold text-gray-900">{loadingMessage}</p>
            <p className="text-sm text-stone-600">Vui lòng chờ...</p>
          </div>
        </div>
      )}

      {/* Personal Information Section */}
      <div className="bg-gradient-to-br from-white to-stone-50 rounded-2xl p-8 border border-stone-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h3>
        </div>

        <div className="space-y-5">
          <InputField
            icon={User}
            label="Họ và tên *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên của bạn"
            required
          />

          <div className="grid gap-5">
            <InputField
              icon={Phone}
              label="Số điện thoại *"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
              required
            />
          </div>
        </div>
      </div>

      {/* Address Information Section */}
      <div className="bg-gradient-to-br from-white to-stone-50 rounded-2xl p-8 border border-stone-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Địa chỉ giao hàng</h3>
        </div>

        <div className="space-y-5">
          <InputField
            icon={Building2}
            label="Số nhà, tên đường *"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Ví dụ: 123 Đường ABC, Lô A"
            required
          />

          <div className="grid md:grid-cols-3 gap-5">
            <SelectField
              icon={MapPin}
              label="Tỉnh/Thành phố *"
              name="provinceCode"
              value={formData.provinceCode || ""}
              onChange={handleChange}
              disabled={false}
              required
              options={[
                { value: "", label: "Chọn tỉnh/thành phố" },
                ...provinces.map((p) => ({ value: p.code, label: p.name })),
              ]}
            />

            <SelectField
              icon={MapPin}
              label="Quận/Huyện *"
              name="districtCode"
              value={formData.districtCode || ""}
              onChange={handleChange}
              disabled={!formData.provinceCode}
              required
              options={[
                { value: "", label: "Chọn quận/huyện" },
                ...districts.map((d) => ({ value: d.code, label: d.name })),
              ]}
            />

            <SelectField
              icon={MapPin}
              label="Xã/Phường *"
              name="wardCode"
              value={formData.wardCode || ""}
              onChange={handleChange}
              disabled={!formData.districtCode}
              required
              options={[
                { value: "", label: "Chọn xã/phường" },
                ...wards.map((w) => ({ value: w.code, label: w.name })),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Address Preview */}
      {formData.streetAddress && formData.provinceCode && formData.districtCode && formData.wardCode && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 flex-1">
              <p className="text-sm font-bold text-blue-900">📍 Địa chỉ giao hàng của bạn:</p>
              <p className="text-base text-blue-800 font-semibold">
                {formData.streetAddress}
              </p>
              <div className="space-y-1 text-sm text-blue-700">
                <p>
                  <span className="font-semibold">Phường/Xã:</span> {wards.find(w => w.code === formData.wardCode)?.name}
                </p>
                <p>
                  <span className="font-semibold">Quận/Huyện:</span> {districts.find(d => d.code === formData.districtCode)?.name}
                </p>
                <p>
                  <span className="font-semibold">Tỉnh/Thành phố:</span> {provinces.find(p => p.code === formData.provinceCode)?.name}
                </p>
              </div>
            </div>
            <div className="bg-blue-600 text-white rounded-full p-2 flex-shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Data Status Info */}
      <div className="text-xs text-stone-500 space-y-1">
        <p>✓ Provinces loaded: {provinces.length > 0 ? `${provinces.length} items` : "pending"}</p>
        <p>✓ Districts loaded: {districts.length > 0 ? `${districts.length} items` : "pending"}</p>
        <p>✓ Wards loaded: {wards.length > 0 ? `${wards.length} items` : "pending"}</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang tải...
          </>
        ) : (
          <>
            Tiếp tục thanh toán
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </>
        )}
      </button>

      {/* Security Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-stone-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Thông tin của bạn được bảo vệ bằng mã hóa SSL</span>
      </div>
    </form>
  )
}
