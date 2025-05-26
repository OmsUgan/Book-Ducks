import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const userResponse = await fetch(
    `${process.env.STRAPI_API_URL}/api/users/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  await new Promise(time => setTimeout(time, 1000));

  if (!userResponse.ok) {
    return NextResponse.json({ user: null }, { status: userResponse.status });
  }

  const meData = await userResponse.json();
  const userId = meData.id ?? meData.data?.id;

  const response = await fetch(
    `${process.env.STRAPI_API_URL}/api/users/${userId}?pLevel=4`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return NextResponse.json(null , { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json({ data });
}