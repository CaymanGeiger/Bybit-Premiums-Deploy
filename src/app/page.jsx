"use server";
import styles from './page.module.css'
import CoinFundingRates from './(components)/(funding)/CoinFundingRates'
import CoinBorrowRates from './(components)/(borrow)/CoinBorrowRates'
import Nav from './(components)/(nav)/Nav'
import Link from 'next/link';


const url = process.env.BACKEND_URL ? process.env.BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;
async function getCoinFundingRates() {
  const response = await fetch(`${url}/fundingrates?timestamp=${new Date().getTime()}`, {
      cache: 'no-cache',
  });
  return response.json();
}

async function getCoinBorrowRates() {
const response = await fetch(`${url}/borrowrates?timestamp=${new Date().getTime()}`, {
    cache: 'no-cache',
});
return response.json();
}


export default async function Home() {
  const coinFundingRates = await getCoinFundingRates();
  const coinBorrowRates = await getCoinBorrowRates();

  return (
    <main className={styles.main}>
      <div className={styles.mainDivOne}>

      </div>
      <div className={styles.mainDivTwo}>
            <CoinFundingRates
              coinFundingRates={coinFundingRates}
            />
            <CoinBorrowRates
              coinBorrowRates={coinBorrowRates}
            />
      </div>
      <Link href="/about" className={styles.aboutLink}>
          About Bybit Premiums
      </Link>
    </main>
  )
}
