export async function GET() {
  try {
    const response = await fetch("https://provinces.open-api.vn/api/v2/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    })

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText)
      return Response.json(
        { error: `Failed to fetch provinces: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // API returns array directly: [ { code, name, ... }, ... ]
    // Wrap it in { data: [...] } format for consistency
    return Response.json({ data: Array.isArray(data) ? data : data.data || [] }, { status: 200 })
  } catch (error) {
    console.error("Error fetching provinces:", error)
    return Response.json(
      { error: "Failed to fetch provinces", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
