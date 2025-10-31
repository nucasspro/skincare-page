export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const provinceCode = searchParams.get("code")

    if (!provinceCode) {
      return Response.json({ error: "Province code is required" }, { status: 400 })
    }

    // Use API v1 - get province with depth=2 to get districts
    const response = await fetch(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      }
    )

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText)
      return Response.json(
        { error: `Failed to fetch districts: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // API v1 with depth=2 returns: 
    // { code, name, ..., districts: [{ code, name, ..., wards: [...] }] }
    // Extract districts array - each district has its own wards
    let districts = []
    
    if (data?.districts && Array.isArray(data.districts)) {
      // If districts field exists
      districts = data.districts
    } else if (data?.wards && Array.isArray(data.wards)) {
      // Some API versions use 'wards' for districts
      districts = data.wards
    }

    // Debug log to help troubleshoot
    console.log("Districts API Response for province", provinceCode, ":", {
      hasDistricts: !!data?.districts,
      hasWards: !!data?.wards,
      districtsCount: districts.length,
      responseKeys: Object.keys(data || {}),
      sample: districts[0]
    })

    // Return consistent format: { data: [...] }
    return Response.json({ data: districts }, { status: 200 })
  } catch (error) {
    console.error("Error fetching districts:", error)
    return Response.json(
      { error: "Failed to fetch districts", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
