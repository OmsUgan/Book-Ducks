import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const token = request.cookies.get("token")?.value;
  const { documentId } = await params;

  const headers = token
  ? { Authorization: `Bearer ${token}` }
  : {}

  const response = await fetch(
    `${process.env.STRAPI_API_URL}/api/books/${documentId}?pLevel=3`, { headers }
  );

  const data = await response.json();
  
  if (!response.ok) {
    return NextResponse.json({ error: data.error?.message || data.message }, { status: response.status });
  }

  return NextResponse.json(data);
}
