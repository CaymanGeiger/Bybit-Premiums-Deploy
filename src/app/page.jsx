// import styles from './page.module.css'
// import prisma from '../../lib/prisma'
// import CoinFundingRates from './(components)/(funding)/CoinFundingRates'
// import CoinBorrowRates from './(components)/(borrow)/CoinBorrowRates'
// import Logo from './(components)/(logo)/Logo'

// async function getCoinFundingRates() {
//   const response = await prisma.coinFundingRate.findMany()
//   return response;
// }

// async function getCoinBorrowRates() {
//   const response = await prisma.coinBorrowRate.findMany()
//   return response;
// }

// export default async function Home() {
//   const coinFundingRates = await getCoinFundingRates();
//   const coinBorrowRates = await getCoinBorrowRates();
//   console.log(coinFundingRates);
//   return (
//     <main className={styles.main}>
//       <div className={styles.mainDivOne}>
//         {/* <h1 className={styles.title}>
//           Bybit Premiums
//         </h1> */}
//         <Logo />
//       </div>
//       <div className={styles.mainDivTwo}>
//             <CoinFundingRates
//               coinFundingRates={coinFundingRates}
//             />
//             <CoinBorrowRates
//               coinBorrowRates={coinBorrowRates}
//             />
//       </div>
//     </main>
//   )
// }
