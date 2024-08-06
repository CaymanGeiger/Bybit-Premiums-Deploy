import React from "react";
import "./AboutUs.css";
import Link from "next/link";
import Head from "next/head";
import Nav from "../(components)/(nav)/(bybit)/NavBybit";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Bybit Premiums - Trade Smarter</title>
        <script type="application/ld+json">
          {`
                            {
                                "@context": "http://schema.org",
                                "@type": "Organization",
                                "name": "Bybit Premiums",
                                "url": "http://www.example.com/about-us",
                                "description": "Leading platform for real-time borrow rates and funding rates for Bybit traders.",
                                "logo": "http://www.example.com/logo.png"
                            }
                        `}
        </script>
      </Head>
      <Nav />
      <div className="about-us">
        <section className="our-services">
          <h2>Our Services</h2>
          <p>
            Bybit Premiums offers traders precise and real-time data on
            <strong>borrow rates</strong> and <strong>funding rates</strong>{" "}
            specifically for trading on <strong>Bybit</strong>. Our platform is
            <strong>continuously updated throughout the day</strong>, ensuring
            you have access to the most accurate and current historical average
            information whenever you need it.
          </p>
        </section>
        <section className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <p>
            Leveraging exceptional algorithms, we calculate rates with utmost
            accuracy, aiding in your decision-making process for{" "}
            <strong>trade borrow rates Bybit</strong>. Stay ahead in your
            trading game with Bybit Premiums.
          </p>
        </section>
        <section className="bybit-exchange-overview">
          <h2>About Bybit Exchange</h2>
          <p>
            With advanced data analytics, we calculate these rates with the
            <strong>highest accuracy possible</strong>, empowering you to make
            informed trading decisions on Bybit. Bybit Premiums keeps you ahead
            in the fast-paced world of crypto trading. As one of the leading
            exchanges in the digital currency space, Bybit offers a
            comprehensive range of{" "}
            <strong>trading services and products</strong>, from spot trading to
            derivatives and margin trading. We cater to traders of all
            experience levels, providing data that&apos;
            s essential for your
            trading success.
          </p>
        </section>
        <section className="funding-rates">
          <h2>Understanding Funding Rates in Bybit</h2>
          <p>
            Funding rates in Bybit&apos;s perpetual contracts are crucial for
            maintaining market stability. These periodic payments between long
            and short positions help keep contract prices aligned with the
            underlying spot price. Bybit Premiums helps you grasp these rates,
            enabling you to{" "}
            <strong>develop effective trading strategies</strong> and manage
            your perpetual contracts relative to their spot counterparts.
          </p>
        </section>
        <section className="borrow-rates">
          <h2>Borrow Rates and Margin Trading</h2>
          <p>
            Borrow rates are a key factor in margin trading, representing the
            interest cost of borrowing a spot asset. Bybit Premiums delivers
            valuable insights into these rates, helping you understand the cost
            of leveraged positions and{" "}
            <strong>make well-informed trading decisions</strong>.
          </p>
        </section>
        <Link href="/">Return to the home page</Link>
      </div>
      <footer>
        <p>
          Trade smarter with Bybit Premiums. Your premier source for Bybit
          funding and borrow rates.
        </p>
      </footer>
    </>
  );
}
