import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    const apiResponse = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })

    if (apiResponse.ok) {
      const data = await apiResponse.json()
      return NextResponse.json(data)
    } else {
      const errorData = await apiResponse.json()
      return NextResponse.json({ message: errorData.message || "Login failed" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

