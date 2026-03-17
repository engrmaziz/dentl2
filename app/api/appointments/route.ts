import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // In production this would save to a database.
    // For now we log and return success.
    console.log("New appointment booking:", body);
    return NextResponse.json({ success: true, message: "Appointment request received." }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }
}
