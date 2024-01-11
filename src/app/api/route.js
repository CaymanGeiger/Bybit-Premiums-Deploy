
import { NextResponse } from 'next/server';
import { createOrUpdateBorrowData } from '../(db)/borrow/writeBorrowRates';

export async function POST(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    // const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    try {
        const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
            headers: { 'apikey': apiKey, 'secret': apiSecret }
        });

        if (!borrowResponse.ok) {
            console.error('Error fetching data:', borrowResponse.statusText);
            return NextResponse.error(new Error('Borrow response failed'));
        }

        const borrowData = await borrowResponse.json();
        await createOrUpdateBorrowData(borrowData);
        return NextResponse.json(borrowData);
        // return res.status(200).json({ message: 'Borrow data successfully updated' });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(new Error('Borrow response failed'));
    }
}
