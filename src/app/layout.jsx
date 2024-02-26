import { Metadata } from 'next'
import { Toaster } from "./(components)/(reusable)/Toaster";
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bybit Premiums - All Your Stats In One Place",
  description:
    "Explore comprehensive statistics and analytics for Bybit trading. Stay ahead with all your essential trading stats in one place. We display funding rates and borrows rates for the bybit market!",
  type: "website",
  url: "https://bybitpremiums.com",
  icons: {
    icon: "/icon.png",
  },
};

const structuredData = {
  "@context": "http://schema.org",
  "@type": "FinancialProduct",
  "name": "Bybit Premiums - Funding and Borrow Rates",
  "description": "Real-time Bybit funding and borrow rates for market traders.",
  "provider": {
    "@type": "Organization",
    "name": "Bybit Premiums",
    "url": "https://bybitpremiums.com"
  }
};

const structuredDataString = JSON.stringify(structuredData);

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script
        id="google_script1"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS_KEY}`}
      />
      <Script
        id="google_script2"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.ANALYTICS_KEY}', {
              page_path: window.location.pathname,
              });
            `,
        }}
      />
      <Script
        id='structured-data'
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      ></Script>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
