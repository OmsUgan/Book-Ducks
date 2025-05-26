import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  
  const user = await response.json();

  if (!response.ok) {
    return NextResponse.json({ user: null }, { status: res.status });
  }

  return NextResponse.json({ user });
}