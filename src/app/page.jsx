"use server";
import styles from "./page.module.css";
import CoinFundingRates from "./(bybit)/(funding)/CoinFundingRates";
import CoinBorrowRates from "./(bybit)/(borrow)/CoinBorrowRates";
import Nav from "./(components)/(nav)/(bybit)/NavBybit";
import Footer from "./(components)/(footer)/Footer";
import Link from "next/link";

let loadingData = true;
const url = process.env.BACKEND_URL
  ? process.env.BACKEND_URL
  : process.env.NEXT_PUBLIC_BACKEND_URL;
async function getCoinFundingRates() {
  loadingData = true;
  const response = await fetch(
    `${url}/fundingrates?timestamp=${new Date().getTime()}`,
    {
      cache: "no-cache",
    }
  );
  return response.json();
}

async function getCoinBorrowRates() {
  const response = await fetch(
    `${url}/borrowrates?timestamp=${new Date().getTime()}`,
    {
      cache: "no-cache",
    }
  );
  loadingData = false;
  return response.json();
}

export default async function Home() {
  const coinFundingRates = await getCoinFundingRates();
  const coinBorrowRates = await getCoinBorrowRates();

  return (
    <>
      <main className={styles.main}>
        <Nav />
        <div className={styles.mainDivTwo}>
          <CoinFundingRates coinFundingRates={coinFundingRates} />
          <CoinBorrowRates coinBorrowRates={coinBorrowRates} />
        </div>
      </main>
    </>
  );
}
