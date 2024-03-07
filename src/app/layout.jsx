import { Toaster } from "./(components)/(reusable)/Toaster";
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';
import Script from 'next/script'
import Nav from './(components)/(nav)/Nav'

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
  },
  "keywords": "Bybit Premiums, borrow rates, funding rates, margin trading, trade borrow rates Bybit",
  "og:title": "About Bybit Premiums - Trade Smarter",
  "og:description": "Discover Bybit Premiums for real-time borrow and funding rates to enhance your trading decisions.",
  "og:image": "/icon.png",
  "og:url": "http://www.bybitpremiums.com",
  "og:type": "website",
};

const AboutUsStructuredData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "Bybit Premiums",
    "url": "http://www.example.com/about-us",
    "description": "Leading platform for real-time borrow rates and funding rates for Bybit traders.",
    "logo": "http://www.example.com/logo.png"
}

const structuredDataString = JSON.stringify(structuredData);
const aboutUsStructuredDataString = JSON.stringify(AboutUsStructuredData);

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
      <Script
        id='about-us-structured-data'
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: aboutUsStructuredDataString }}
      ></Script>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
