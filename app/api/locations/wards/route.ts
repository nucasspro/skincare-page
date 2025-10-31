export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const districtCode = searchParams.get("code")

    if (!districtCode) {
      return Response.json({ error: "District code is required" }, { status: 400 })
    }

    // Use API v1 as it's more stable and well-documented
    const response = await fetch(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
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
        { error: `Failed to fetch wards: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // API returns { code, name, ..., wards: [...] }
    // Extract wards array
    const wards = data?.wards || []

    // Return consistent format: { data: [...] }
    return Response.json({ data: wards }, { status: 200 })
  } catch (error) {
    console.error("Error fetching wards:", error)
    return Response.json(
      { error: "Failed to fetch wards", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
