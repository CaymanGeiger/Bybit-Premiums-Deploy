import styles from './page.module.css'
import CoinFundingRates from './(components)/(funding)/CoinFundingRates'
import CoinBorrowRates from './(components)/(borrow)/CoinBorrowRates'
import Nav from './(components)/(nav)/Nav'


async function getCoinBorrowRatesApi() {
  const response = await fetch(`${process.env.BACKEND_URL}/borrowrates`);
  const data = await response.json()
  return data;
}

async function getCoinFundingRatesApi() {
  const response = await fetch(`${process.env.BACKEND_URL}/fundingrates`);
  const data = await response.json()
  return data;
}

export default async function Home() {
  const coinFundingRates = await getCoinFundingRatesApi();
  const coinBorrowRates = await getCoinBorrowRatesApi();



  return (
    <main className={styles.main}>
      <Nav/>
      <div className={styles.mainDivTwo}>
            <CoinFundingRates
              coinFundingRates={coinFundingRates}
            />
            <CoinBorrowRates
              coinBorrowRates={coinBorrowRates}
            />
      </div>
    </main>
  )
}
