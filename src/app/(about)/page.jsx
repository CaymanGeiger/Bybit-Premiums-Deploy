import React from 'react';
import './AboutUs.css';
import Link from 'next/link';
import Head from 'next/head';

export default function AboutUs() {
    return (
            <>
                    {/* <Head>
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
                    </Head> */}
                <div className="about-us">
                    <header>
                        <h1>About Bybit Premiums</h1>
                    </header>
                    <section className="our-services">
                        <h2>Our Services</h2>
                        <p>
                            Bybit Premiums is at the forefront of providing accurate and real-time <strong>borrow rates and funding rates</strong> for traders looking to <strong>trade Bybit premiums</strong>. Our platform updates all rates throughout the day, ensuring you have the most current information at your fingertips.
                        </p>
                        <p>
                            Leveraging exceptional algorithms, we calculate rates with utmost accuracy, aiding in your decision-making process for <strong>trade borrow rates Bybit</strong>. Stay ahead in your trading game with Bybit Premiums.
                        </p>
                    </section>
                    <section className="why-choose-us">
                        <h2>Why Choose Us?</h2>
                        <p>
                            Our commitment to updates and precision sets us apart. You can trust <strong>Bybit Premiums</strong> to provide the latest and most accurate rates, helping you make informed trading decisions.
                        </p>
                        <p>
                            We&apos;re <strong>constantly innovating</strong>, with new features on the horizon designed to enhance your trading experience. Stay tuned for what&apos;s coming next at Bybit Premiums!
                        </p>
                    </section>
                    <section className="bybit-exchange-overview">
                    <h2>About Bybit Exchange</h2>
                    <p>
                        As a significant platform in the digital currency space, <strong>Bybit</strong> provides a range of trading services and products. From <strong>spot trading</strong> to <strong>derivatives</strong> and <strong>margin trading</strong>, we cater to a global audience and offer tools designed for all levels of trading experience.
                    </p>
                </section>
                <section className="funding-rates">
                    <h2>Understanding Funding Rates in Bybit</h2>
                    <p>
                        Funding rates in <strong>Bybit&apos;s perpetual contracts</strong> are essential for market stability. These periodic payments between buyers and sellers of perpetual contracts ensure prices remain close to the underlying spot price. Our platform helps users understand these rates to maintain effective trading strategies.
                    </p>
                </section>
                <section className="borrow-rates">
                    <h2>Borrow Rates and Margin Trading</h2>
                    <p>
                        <strong>Borrow rates</strong>, crucial in <strong>margin trading</strong>, are the interest rates paid to leverage positions. Bybit Premiums provides insights into these rates, reflecting the cost of leveraging positions and informing your trading decisions with real-time data.
                    </p>
                </section>
                <Link href="/" >
                    Return to the home page
                </Link>
                </div>
                <footer>
                        <p>Trade smarter with Bybit Premiums. Your premier source for Bybit funding and borrow rates.</p>
                </footer>
            </>
    );
}
