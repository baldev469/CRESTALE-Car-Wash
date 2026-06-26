import { db } from "@/db";
import { bookings } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, message } = body;

    if (!name || !phone || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [newBooking] = await db.insert(bookings).values({
      customerName: name,
      customerPhone: phone,
      serviceType: service,
      message: message || "",
    }).returning();

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allBookings = await db.query.bookings.findMany({
      orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
    });
    return NextResponse.json(allBookings);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
