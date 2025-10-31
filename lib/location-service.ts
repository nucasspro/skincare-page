const API_BASE_URL = "/api/locations"

export interface Province {
  code: number
  name: string
  codename?: string
  division_type?: string
  phone_code?: number
}

export interface District {
  code: number
  name: string
  codename?: string
  division_type?: string
  province_code?: number
}

export interface Ward {
  code: number
  name: string
  codename?: string
  division_type?: string
  district_code?: number
}

// Cache để tránh gọi API nhiều lần
const cache: Record<string, any> = {}

/**
 * Lấy danh sách tất cả tỉnh/thành phố
 */
export async function getProvinces(): Promise<Province[]> {
  if (cache["provinces"]) {
    return cache["provinces"]
  }

  try {
    const response = await fetch(`${API_BASE_URL}/provinces`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch provinces: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Handle both { data: [...] } and just [...]
    const provinces = data.data || data || []
    cache["provinces"] = provinces
    return provinces
  } catch (error) {
    console.error("Error fetching provinces:", error)
    return []
  }
}

/**
 * Lấy danh sách quận/huyện theo mã tỉnh
 */
export async function getDistricts(provinceCode: number): Promise<District[]> {
  const cacheKey = `districts-${provinceCode}`
  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  try {
    const response = await fetch(`${API_BASE_URL}/districts?code=${provinceCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch districts: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Handle { data: [...] } format - districts is an array
    const districts = data.data || []
    cache[cacheKey] = districts
    return districts
  } catch (error) {
    console.error(`Error fetching districts for province ${provinceCode}:`, error)
    return []
  }
}

/**
 * Lấy danh sách xã/phường theo mã quận
 */
export async function getWards(districtCode: number): Promise<Ward[]> {
  const cacheKey = `wards-${districtCode}`
  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  try {
    const response = await fetch(`${API_BASE_URL}/wards?code=${districtCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch wards: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Handle { data: [...] } format - wards is an array
    const wards = data.data || []
    cache[cacheKey] = wards
    return wards
  } catch (error) {
    console.error(`Error fetching wards for district ${districtCode}:`, error)
    return []
  }
}

/**
 * Lấy tên tỉnh từ mã tỉnh
 */
export async function getProvinceName(provinceCode: number): Promise<string> {
  const provinces = await getProvinces()
  const province = provinces.find((p) => p.code === provinceCode)
  return province?.name || ""
}

/**
 * Lấy tên quận từ mã quận
 */
export async function getDistrictName(districtCode: number, provinceCode: number): Promise<string> {
  const districts = await getDistricts(provinceCode)
  const district = districts.find((d) => d.code === districtCode)
  return district?.name || ""
}

/**
 * Lấy tên xã từ mã xã
 */
export async function getWardName(wardCode: number, districtCode: number): Promise<string> {
  const wards = await getWards(districtCode)
  const ward = wards.find((w) => w.code === wardCode)
  return ward?.name || ""
}

/**
 * Format địa chỉ đầy đủ
 */
export async function formatAddress(
  streetAddress: string,
  wardCode: number,
  districtCode: number,
  provinceCode: number
): Promise<string> {
  const province = await getProvinceName(provinceCode)
  const district = await getDistrictName(districtCode, provinceCode)
  const ward = await getWardName(wardCode, districtCode)

  return `${streetAddress}, ${ward}, ${district}, ${province}`
}

/**
 * Clear cache (dùng khi cần)
 */
export function clearLocationCache() {
  Object.keys(cache).forEach((key) => delete cache[key])
}
