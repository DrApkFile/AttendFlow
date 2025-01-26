import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  try {
    const headersList = await headers()
    const token = headersList.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const apiResponse = await fetch("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (apiResponse.ok) {
      const data = await apiResponse.json()
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ message: "Failed to fetch user information" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching user info:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

