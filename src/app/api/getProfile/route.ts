import { getUserProfile } from "@/database/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error, status } = await getUserProfile();
    return new NextResponse(JSON.stringify({ data, error, status }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        data: null,
        error: `Internal server error ,${error}`,
        status: 500,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
