import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        return new NextResponse('API key or secret is undefined', { status: 500 });
    }

    try {
        const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });

        if (!borrowResponse.ok) {
            console.error('Error fetching data:', borrowResponse.statusText);
            return new NextResponse(borrowResponse.statusText, { status: borrowResponse.status });
        }

        const borrowData = await borrowResponse.json();
        return NextResponse.json(borrowData);

    } catch (error) {
        console.error('Error fetching data:', error);
        return new NextResponse(error.toString(), { status: 500 });
    }
}
