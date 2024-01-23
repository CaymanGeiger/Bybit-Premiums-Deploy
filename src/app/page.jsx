"use client"
import styles from './page.module.css'
import CoinFundingRates from './(components)/(funding)/CoinFundingRates'
import CoinBorrowRates from './(components)/(borrow)/CoinBorrowRates'
import Nav from './(components)/(nav)/Nav'


export default function Home() {

  return (
    <main className={styles.main}>
      <Nav/>
      <div className={styles.mainDivTwo}>
            <CoinFundingRates/>
            <CoinBorrowRates/>
      </div>
    </main>
  )
}
