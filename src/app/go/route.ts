import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");
        const product = searchParams.get("product");
        const store = searchParams.get("store") || "UnknownStore";
        const user = searchParams.get("u") || "guest";

        if (!url) {
            return NextResponse.redirect(new URL('/', req.url)); // Redirect home if no URL
        }

        // 🔥 Fire-and-forget logging
        // We don't await this because we want the redirect to be fast
        // In Vercel Edge/Serverless, this might be cut off, but for standard Node runtime it often works.
        // For critical logging, using a queue or awaiting (with slight delay) is better.
        // Here we use fetch to our own API.
        const baseUrl = new URL(req.url).origin;
        fetch(`${baseUrl}/api/logClick`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product,
                store,
                user,
                affiliateLink: url,
                clickedAt: Date.now(),
            }),
        }).catch(err => console.error("Logging failed", err));

        // 🔁 Finally redirect to external affiliate URL
        return NextResponse.redirect(url);

    } catch (err) {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
}
