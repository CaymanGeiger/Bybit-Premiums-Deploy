"use server";
import styles from "./page.module.css";
import CoinFundingRates from "./(funding)/CoinFundingRates";
import Nav from "../(components)/(nav)/(coinbase)/NavCoinbase";
import Footer from "../(components)/(footer)/Footer";

let loadingData = true;
// const url = process.env.BACKEND_URL
//   ? process.env.BACKEND_URL
//   : process.env.NEXT_PUBLIC_BACKEND_URL;
const url = "http://localhost:3001";
async function getCoinFundingRates() {
  loadingData = true;
  const response = await fetch(
    `${url}/coinbase-funding-rates?timestamp=${new Date().getTime()}`,
    {
      cache: "no-cache",
    }
  );
  return response.json();
}

export default async function Home() {
  const coinFundingRates = await getCoinFundingRates();

  return (
    <>
      <main className={styles.main}>
        <Nav />
        <div className={styles.mainDivTwo}>
          <CoinFundingRates coinFundingRates={coinFundingRates} />
        </div>
      </main>
      <div
        style={{ display: "flex", alignItems: "flex-end", minWidth: "1000px" }}
      >
        <Footer />
      </div>
    </>
  );
}
