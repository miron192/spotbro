import { NextRequest, NextResponse } from "next/server";
import { updateUser } from "@/lib/updateUser";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("API received body:", body);

  const { id, ...userData } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }

  try {
    const updated = await updateUser(id, userData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
