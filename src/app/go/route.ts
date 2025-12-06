import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");
        const product = searchParams.get("product") || "Unknown product";
        const store = searchParams.get("store") || "Unknown store";
        const user = searchParams.get("u") || "guest";

        if (!url || !url.startsWith("http")) {
            console.warn("Invalid redirect URL:", { url, product, store, user });
            // Redirect to home or error page instead of crashing
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Fire-and-forget logging
        const baseUrl = new URL(req.url).origin;
        fetch(`${baseUrl}/api/logClick`, {
            method: "POST",
            body: JSON.stringify({
                url,
                product,
                store,
                user,
                clickedAt: Date.now(),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => {
            console.error("logClick error:", err);
        });

        return NextResponse.redirect(url);
    } catch (err) {
        console.error("GO ROUTE FATAL ERROR:", err);
        return NextResponse.redirect(new URL('/', req.url));
    }
}
