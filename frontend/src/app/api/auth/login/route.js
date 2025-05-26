import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { identifier, password } = await request.json();

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            }
        );

        const data = await response.json();
        
        if (!response.ok) {
            const errorMessage = data.error?.message || data.message || "Inloggning misslyckades";
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
        console.error("Login API error:", err);
        return NextResponse.json({ error: "Ett oväntat fel inträffade vid inloggning" }, { status: 500 });
    }
}