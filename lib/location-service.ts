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

// Promise cache để tránh concurrent requests
const pendingRequests: Record<string, Promise<any>> = {}

/**
 * Lấy danh sách tất cả tỉnh/thành phố
 */
export async function getProvinces(): Promise<Province[]> {
  // Return cached data if available
  if (cache["provinces"]) {
    return cache["provinces"]
  }

  // Return pending request if one is already in progress
  if (pendingRequests["provinces"]) {
    return pendingRequests["provinces"]
  }

  // Create new request
  const requestPromise = (async () => {
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
      // Remove from pending on error so we can retry
      delete pendingRequests["provinces"]
      return []
    } finally {
      // Clean up pending request after completion
      delete pendingRequests["provinces"]
    }
  })()

  // Store pending request
  pendingRequests["provinces"] = requestPromise

  return requestPromise
}

/**
 * Lấy danh sách quận/huyện theo mã tỉnh
 */
export async function getDistricts(provinceCode: number): Promise<District[]> {
  const cacheKey = `districts-${provinceCode}`

  // Return cached data if available
  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  // Return pending request if one is already in progress
  if (pendingRequests[cacheKey]) {
    return pendingRequests[cacheKey]
  }

  // Create new request
  const requestPromise = (async () => {
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
      // Remove from pending on error so we can retry
      delete pendingRequests[cacheKey]
      return []
    } finally {
      // Clean up pending request after completion
      delete pendingRequests[cacheKey]
    }
  })()

  // Store pending request
  pendingRequests[cacheKey] = requestPromise

  return requestPromise
}

/**
 * Lấy danh sách xã/phường theo mã quận
 */
export async function getWards(districtCode: number): Promise<Ward[]> {
  const cacheKey = `wards-${districtCode}`

  // Return cached data if available
  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  // Return pending request if one is already in progress
  if (pendingRequests[cacheKey]) {
    return pendingRequests[cacheKey]
  }

  // Create new request
  const requestPromise = (async () => {
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
      // Remove from pending on error so we can retry
      delete pendingRequests[cacheKey]
      return []
    } finally {
      // Clean up pending request after completion
      delete pendingRequests[cacheKey]
    }
  })()

  // Store pending request
  pendingRequests[cacheKey] = requestPromise

  return requestPromise
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
  Object.keys(pendingRequests).forEach((key) => delete pendingRequests[key])
}
