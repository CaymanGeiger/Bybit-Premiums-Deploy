import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bybit Premiums',
  description: 'All Your Stats In One Place',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" sizes='16x16' href="/favicon.png"/>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
