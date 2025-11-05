import https from 'https'

// Helper function to make HTTPS request with SSL fix
function makeHttpsRequest(endpoint: string): Promise<Response> {
  return new Promise((resolve) => {
    const url = new URL(endpoint)

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Skip SSL verification for expired certificates (development only)
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    }

    const req = https.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        try {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            const parsed = JSON.parse(data)
            resolve(Response.json({ data: parsed }, { status: 200 }))
          } else {
            resolve(Response.json(
              {
                error: `Failed to fetch: ${res.statusCode} ${res.statusMessage}`,
                details: data
              },
              { status: res.statusCode || 500 }
            ))
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError)
          resolve(Response.json(
            {
              error: "Failed to parse response",
              details: parseError instanceof Error ? parseError.message : "Unknown error"
            },
            { status: 500 }
          ))
        }
      })
    })

    req.on('error', (error) => {
      console.error("Error fetching:", error)
      resolve(Response.json(
        {
          error: "Failed to fetch",
          details: error.message,
          message: "Unable to connect to API. Please try again later."
        },
        { status: 500 }
      ))
    })

    // Set timeout
    req.setTimeout(10000, () => {
      req.destroy()
      resolve(Response.json(
        {
          error: "Request timeout",
          message: "API did not respond in time."
        },
        { status: 500 }
      ))
    })

    req.end()
  })
}

// Get provinces
async function getProvinces(): Promise<Response> {
  try {
    const endpoint = "https://provinces.open-api.vn/api/v1/"
    const response = await makeHttpsRequest(endpoint)
    const result = await response.json()

    // Handle different response formats
    let provinces = []
    if (Array.isArray(result.data)) {
      provinces = result.data
    } else if (Array.isArray(result)) {
      provinces = result
    } else if (result?.data && Array.isArray(result.data)) {
      provinces = result.data
    } else if (result?.provinces && Array.isArray(result.provinces)) {
      provinces = result.provinces
    }

    if (provinces.length > 0) {
      return Response.json({ data: provinces }, { status: 200 })
    } else {
      return Response.json(
        {
          error: "No provinces found in response",
          details: "Response format may have changed"
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error fetching provinces:", error)
    return Response.json(
      {
        error: "Failed to fetch provinces",
        details: error instanceof Error ? error.message : "Unknown error",
        message: "Unable to connect to provinces API. Please try again later."
      },
      { status: 500 }
    )
  }
}

// Get districts by province code
async function getDistricts(provinceCode: string): Promise<Response> {
  try {
    if (!provinceCode) {
      return Response.json(
        { error: "Province code is required for districts" },
        { status: 400 }
      )
    }

    const endpoint = `https://provinces.open-api.vn/api/v1/p/${provinceCode}?depth=2`
    const response = await makeHttpsRequest(endpoint)
    const result = await response.json()

    // Handle different response formats
    let districts = []
    if (result?.data?.districts && Array.isArray(result.data.districts)) {
      districts = result.data.districts
    } else if (result?.districts && Array.isArray(result.districts)) {
      districts = result.districts
    } else if (result?.data?.wards && Array.isArray(result.data.wards)) {
      // Some API versions use 'wards' for districts
      districts = result.data.wards
    } else if (result?.wards && Array.isArray(result.wards)) {
      districts = result.wards
    } else if (Array.isArray(result.data)) {
      districts = result.data
    } else if (Array.isArray(result)) {
      districts = result
    }

    if (districts.length > 0) {
      return Response.json({ data: districts }, { status: 200 })
    } else {
      return Response.json(
        {
          error: "No districts found in response",
          details: "Response format may have changed",
          debug: { provinceCode, responseKeys: Object.keys(result || {}) }
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error fetching districts:", error)
    return Response.json(
      {
        error: "Failed to fetch districts",
        details: error instanceof Error ? error.message : "Unknown error",
        message: "Unable to connect to districts API. Please try again later."
      },
      { status: 500 }
    )
  }
}

// Get wards by district code
async function getWards(districtCode: string): Promise<Response> {
  try {
    if (!districtCode) {
      return Response.json(
        { error: "District code is required for wards" },
        { status: 400 }
      )
    }

    const endpoint = `https://provinces.open-api.vn/api/v1/d/${districtCode}?depth=2`
    const response = await makeHttpsRequest(endpoint)
    const result = await response.json()

    // Handle different response formats
    let wards = []
    if (result?.data?.wards && Array.isArray(result.data.wards)) {
      wards = result.data.wards
    } else if (result?.wards && Array.isArray(result.wards)) {
      wards = result.wards
    } else if (Array.isArray(result.data)) {
      wards = result.data
    } else if (Array.isArray(result)) {
      wards = result
    }

    if (wards.length > 0) {
      return Response.json({ data: wards }, { status: 200 })
    } else {
      return Response.json(
        {
          error: "No wards found in response",
          details: "Response format may have changed",
          debug: { districtCode, responseKeys: Object.keys(result || {}) }
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error fetching wards:", error)
    return Response.json(
      {
        error: "Failed to fetch wards",
        details: error instanceof Error ? error.message : "Unknown error",
        message: "Unable to connect to wards API. Please try again later."
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    // Route to appropriate handler
    switch (type) {
      case 'provinces':
        return await getProvinces()
      case 'districts':
        return await getDistricts(code || '')
      case 'wards':
        return await getWards(code || '')
      default:
        return Response.json(
          { error: "Invalid type. Must be 'provinces', 'districts', or 'wards'" },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error(`Error in ${(await params).type} GET handler:`, error)
    return Response.json(
      {
        error: `Failed to fetch ${(await params).type}`,
        details: error instanceof Error ? error.message : "Unknown error",
        message: `Unable to connect to ${(await params).type} API. Please try again later.`
      },
      { status: 500 }
    )
  }
}
