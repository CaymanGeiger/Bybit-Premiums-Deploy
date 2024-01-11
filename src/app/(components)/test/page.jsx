"use client"
import React from 'react';


const Test = () => {
    const [tickerData, setTickerData] = React.useState(null);
    const [fundingData, setFundingData] = React.useState(null);
    const [borrowData, setBorrowData] = React.useState(null);
    const [testData, setTestData] = React.useState(null);
    // console.log(tickerData)
    // console.log(fundingData)
    // console.log(borrowData)
    // console.log(testData)

    React.useEffect(() => {
        const fetchTickersData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/tickers');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setTickerData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const port = process.env.PORT || 3001


        const testNodeJsDev = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/test', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setTestData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        const fetchFundingData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/bybitfunding');
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setFundingData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchBorrowData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/bybitborrow');
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setBorrowData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // fetchBorrowData();
        // fetchFundingData();
        // fetchTickersData();

        // testNodeJsDev();
        console.log("hit")
    }, []);

    const testNodeJs = async () => {
        console.log("fetching")
        try {
            console.log("fetching2")
            const response = await fetch('/api', {
                method: 'POST'
            });
            console.log(response)

            if (!response.ok) {
                console.log("Failed")
                throw new Error(`Error: ${response.status}`);
            }
            console.log("fetching3")
            const data = await response.json();
            setTestData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>
                Test
            </h1>

            <button onClick={() => testNodeJs()}>
                Fetch Test
            </button>
        </div>
    )
}
export default Test;
