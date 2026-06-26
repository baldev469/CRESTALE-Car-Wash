import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    
    // Check against the environment variable you added
    // If you named it something else, you can update this name
    const ownerKey = process.env.OWNER_KEY || process.env.ADMIN_KEY || "crestale344";

    if (key === ownerKey) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid key" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
