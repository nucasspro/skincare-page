export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const provinceCode = searchParams.get("code")

    if (!provinceCode) {
      return Response.json({ error: "Province code is required" }, { status: 400 })
    }

    const response = await fetch(
      `https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`,
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

    // API returns { code, name, ..., wards: [...] }
    // Note: 'wards' actually contains districts/wards data with division_type
    // Extract wards array which contains the district/ward list
    const districts = data?.wards || []

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
