import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { username, email, password } = await request.json();

        const response = await fetch(`${process.env.STRAPI_API_URL}/api/auth/local/register`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.error?.message || data.message || "Registrering misslyckades";
            return NextResponse.json({ error: errorMessage }, { status: response.status });
        }

        const res = NextResponse.json({ user: data.user });
        res.cookies.set("token", data.jwt, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 dagar
        });

        return res;
    } catch (err) {
        console.error('Register API error:', err);
        return NextResponse.json({ error: 'Ett oväntat fel inträffade vid registrering' }, { status: 500 });
    }
}