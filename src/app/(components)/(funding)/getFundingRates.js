"use server";

const url = process.env.BACKEND_URL ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
export async function getCoinFundingRatesApi() {
    const response = await fetch(`${url}/fundingrates?timestamp=${new Date().getTime()}`);
    console.log('response', response)
    return response.json();
}
