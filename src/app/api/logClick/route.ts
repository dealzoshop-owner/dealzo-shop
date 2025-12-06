import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // your Firestore setup
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        await addDoc(collection(db, "clicks"), body);

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Click logging failed:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
