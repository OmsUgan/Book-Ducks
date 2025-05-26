import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 });
    }

    const response = await fetch(
        `${process.env.STRAPI_API_URL}/api/wishlists/${params.documentId}`,
        {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    if (response.status === 204) {
        return NextResponse.json({ success: true });
    }

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.error?.message || data.message || 'Okänt fel' }, { status: response.status });
    }

    return NextResponse.json({ success: true });
}