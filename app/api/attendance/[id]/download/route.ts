import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`http://localhost:5000/api/attendance/${params.id}/download`, {
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
    })

    if (response.ok) {
      const blob = await response.blob()
      return new NextResponse(blob, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="attendance_${params.id}.pdf"`,
        },
      })
    } else {
      return NextResponse.json({ message: "Failed to download attendance" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error downloading attendance:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

