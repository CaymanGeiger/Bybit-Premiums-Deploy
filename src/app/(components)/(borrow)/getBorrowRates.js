"use server"

const url = process.env.BACKEND_URL ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL
export async function getCoinBorrowRatesApi() {
    const response = await fetch(`${url}/borrowrates?timestamp=${new Date().getTime()}`);
    return response.json();
}
