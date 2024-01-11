import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        return;
    }
    try {
        const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });

        if (!borrowResponse.ok) {
            throw new Error(`HTTP error! status: ${borrowResponse.status}`);
        }
        const borrowData = await borrowResponse.json();
        return NextResponse.json(borrowData);
        // createOrUpdateBorrowData(borrowData);
        // return;
    } catch (error) {
        console.error('Error fetching data:', error);    }
}
