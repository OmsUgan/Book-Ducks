import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 });
    }

    const { bookId, userId } = await request.json();

    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/wishlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            book: bookId,
            user: userId
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error?.message || data.message || "Strapi-error";
      return NextResponse.json({ error: msg }, { status: response.status });
    }

    return NextResponse.json({ rating: data.data });
  } catch (err) {
    console.error('Wishlist API error:', err)
    return NextResponse.json({ error: 'Ett oväntat fel vid sparande av en bok i listan' }, { status: 500 });
  }
}