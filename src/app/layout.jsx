import { Metadata } from 'next'
import { Toaster } from "./(components)/(reusable)/Toaster";
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';
import Script from 'next/script'

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
        <link rel="shortcut icon" sizes='16x16' href="/favicon.png" />
      </Head>
      <Script
        id='google_script1'
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_KEY}`}
      />
      <Script
        id='google_script2'
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_KEY}', {
              page_path: window.location.pathname,
              });
            `,
        }}
      />
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
