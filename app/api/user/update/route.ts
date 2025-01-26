import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const { email, username, password } = await request.json()

    // Here, we'll make a request to our Express API to update user info
    const apiResponse = await fetch("http://localhost:5000/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // You would typically include an authorization token here
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
      body: JSON.stringify({ email, username, password }),
    })

    if (apiResponse.ok) {
      const data = await apiResponse.json()
      return NextResponse.json(data)
    } else {
      const errorData = await apiResponse.json()
      return NextResponse.json({ message: errorData.message || "Failed to update user information" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating user info:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

