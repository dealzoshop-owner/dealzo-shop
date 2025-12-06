import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
    try {
        let body: any = {};
        try {
            body = await req.json();
        } catch (err) {
            console.error("logClick invalid JSON:", err);
            return NextResponse.json(
                { error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        const { url, product, store, user, clickedAt } = body;

        if (!url || !url.startsWith("http")) {
            console.warn("logClick ignoring bad URL:", url);
            return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
        }

        // Attempt to log to Firestore, but don't crash if it fails
        try {
            await addDoc(collection(db, "clicks"), {
                url,
                product: product || null,
                store: store || null,
                user: user || null,
                clickedAt: clickedAt || Date.now(),
            });
        } catch (dbError) {
            console.error("Firestore write failed:", dbError);
            // Return 200 anyway so we don't block the client/redirect
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err: any) {
        console.error("logClick FATAL ERROR:", err);
        // Never throw 500 to user, just record internally
        return NextResponse.json(
            { ok: false, error: "logging-failed" },
            { status: 200 }
        );
    }
}
