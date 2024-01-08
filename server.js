// / IMPORTS FOR SERVER (I INCLUDED DESCRIPTIONS FOR EACH FUNCITON!!)
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cron = require('node-cron');
const morgan = require('morgan');
const prisma = require('./lib/prisma');
// const util = require('util');

let PQueue;

async function loadPQueue() {
    PQueue = (await import('p-queue')).default;
    // You can now use PQueue here or call other functions that depend on PQueue
}

loadPQueue();

// const { default: test } = require('node:test');





// TO SET UP THE SERVER
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));






// **EVERY 10-15 MINUTE FETCHES FOR DATA AND 1-2 A WEEK FOR IMAGES**
// ------------------------------------------------------------------------------------------------------------
// **LINE ABOVE MEANS THE START OF THE 10-15 MINUTE FETCHES AND IMAGE CODE**

// EVERY 1-2 A WEEK FOR IMAGES
const getSymbolImages = async () => {
    // I NEED TO CALL THIS EITHER EVERYTIME A NEW TABLE IS ADDED FOR
    // A COIN OR ONCE OR TWICE A WEEK AND PULL ALL COINS WITHOUT URLS AND
    // LOOK THEM UP BY ID IN COIN GECK
    try {
        const response = await fetch('');
        const data = await response.json();
        const images = data.result.map((symbol) => {
            return {
                symbol: symbol.name,
                image: symbol.image
            };
        });
        return images;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// EVERY 10-15 MINUTE SCHEDULER*
// REMOVE ONE * TO MAKE IT RUN ON MINUTES AGAIN 3 * * * * * MEANS EVERY 3 SECONDS
cron.schedule('0 0 0,8,16 * * *', () => {
    console.log('Fetching and updating data every 10 minutes');

    // const testFetch = async () => {
    // const response = await fetch('http://localhost:3001/api/bybitfunding');
    // // console.log(response)

    // const data = await response.json();
    // console.log(data)
    // }
    // testFetch();
    // fetchFundingRateData();
    fetchFundingRateData();
});



// SYMBOL ID IS THE JSON FOR FUNDING COIN ID IS THE JSON FOR BORROW
// CREATE OR UPDATE FOR FUNDING
const createOrUpdateFundingData = async (fundingData) => {
    console.log("createHit");

    const queue = new PQueue({ concurrency: 5 }); // Adjust concurrency as needed

    const coinIds = [...new Set(Object.values(fundingData).flat().map(item => item['symbol id']).filter(id => id !== undefined))];
    const existingRecords = await prisma.coinFundingRate.findMany({
        where: { coinId: { in: coinIds } }
    });
    const recordsMap = new Map(existingRecords.map(record => [record.coinId, record]));

    for (const key in fundingData) {
        if (fundingData.hasOwnProperty(key)) {
            let itemsArray = fundingData[key];

            if (Array.isArray(itemsArray)) {
                for (const item of itemsArray) {
                    queue.add(() => processItem(item, recordsMap));
                }
            } else {
                console.error(`Expected an array for key ${key}, but received:`, itemsArray);
            }

        }
    }

    await queue.onIdle();
}




function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

let completed = 0;
const processItem = async (item, recordsMap) => {
    await delay(1200);
    const existingRecord = recordsMap.get(item['symbol id']);
    const itemResponse = await fetch(`https://api.bybit.com/v2/public/tickers?symbol=${item.symbol}`);
    const itemData = await itemResponse.json();
    const nestedItemData = itemData.result[0];

    // Update database with the fetched data
    if (existingRecord) {
        await prisma.coinFundingRate.update({
            where: { coinId: item['symbol id'] },
            data: {
                coinId: item && item['symbol id'] || null,
                name: item && item.symbol || null,
                oneDayAverage: item && item['one day'] || null,
                threeDayAverage: item && item['three days'] || null,
                sevenDayAverage: item && item.week || null,
                thirtyDayAverage: item && item.month || null,
                ninetyDayAverage: item && item['three months'] || null,
            }
        });
        // console.log(nestedItemData)
        await prisma.coinFundingRate.update({
            where: { coinId: item['symbol id'] },
            data: {
                twentyFourHourVolume: nestedItemData && parseFloat(nestedItemData['turnover_24h']) || null,
                lastTickDirection: nestedItemData && nestedItemData['last_tick_direction'] || null,
            }
        });
    } else {
        await prisma.coinFundingRate.create({
            data: {
                coinId: item && item['symbol id'] || null,
                name: item && item.symbol || null,
                oneDayAverage: item && item['one day'] || null,
                threeDayAverage: item && item['three days'] || null,
                sevenDayAverage: item && item.week || null,
                thirtyDayAverage: item && item.month || null,
                ninetyDayAverage: item && item['three months'] || null,
            }
        });
        await prisma.coinFundingRate.update({
            where: { coinId: item['symbol id'] },
            data: {
                twentyFourHourVolume: nestedItemData && parseFloat(nestedItemData['turnover_24h']) || null,
                lastTickDirection: nestedItemData && nestedItemData['last_tick_direction'] || null,
            }
        });
    };
    completed += 1
    console.log("WRITE WAS COMPLETED", completed)
}



// CREATE OR UPDATE FOR BORROW
const createOrUpdateBorrowData = async (borrowData) => {
    for (const item in borrowData) {
        const existingRecord = await prisma.coinBorrowRate.findUnique({
            where: { coinId: item['coin id'] }
        });

        if (existingRecord) {
            // Compare relevant fields belown (Add as many as you want <3)
            const needsUpdate =
                (existingRecord.coinId !== item['coin id']) ||
                (existingRecord.coinId !== item['coin id']) ||
                (existingRecord.coinId !== item['coin id']);

            // Update if any field has changed
            if (needsUpdate) {
                await prisma.coinBorrowRate.update({
                    where: { coinId: item['coin id'] },
                    data: {
                        // ...fields to update
                    }
                });
            }
            // This will create it if it doesn't exist
        } else {

            await prisma.yourModel.create({
                data: {

                }
            });
        }
    }
}


// THIS FETCHES THE DATA FOR FUNDING API AT BOTTOM OF PAGE AND UPDATES IT AND CALLS TO THE FUNCTIONS ABOVE TO UPDATE THE DATA
const fetchFundingRateData = async () => {
    console.log("fundingFetch hit")
    try {
        const fundingResponse = await fetch('http://localhost:3001/api/bybitfunding');
        console.log(fundingResponse)
        // const borrowResponse = await fetch('http://localhost:3001/api/bybitborrow');
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ADD THIS BACK BELOEW || !borrowResponse.ok    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!fundingResponse.ok) {
            throw new Error('Failed to fetch data');
        } else {
            const fundingData = await fundingResponse.json();
            createOrUpdateFundingData(fundingData);
            // console.log(fundingData)
            // console.log(util.inspect(fundingData, { showHidden: false, depth: null }));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


// THIS FETCHES THE DATA FOR BORROW API AT BOTTOM OF PAGE AND UPDATES IT AND CALLS TO THE FUNCTIONS ABOVE TO UPDATE THE DATA
const fetchBorrowRateData = async () => {
    try {
        const borrowResponse = await fetch('http://localhost:3001/api/bybitborrow');
        // const borrowResponse = await fetch('http://localhost:3001/api/bybitborrow');
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ADD THIS BACK BELOEW || !borrowResponse.ok    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!borrowResponse.ok) {
            throw new Error('Failed to fetch data');
        } else {
            const borrowData = await borrowResponse.json();
            createOrUpdateBorrowData(borrowData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


// THIS FETCHES THE DATA FOR TICKERS API AT BOTTOM OF PAGE AND UPDATES IT AND CALLS TO THE FUNCTIONS ABOVE TO UPDATE THE DATA
// const fetchTickersRateData = async () => {
//     try {
//         const tickersResponse = await fetch('http://localhost:3001/api/tickers');
//         // const borrowResponse = await fetch('http://localhost:3001/api/bybitborrow');
//         // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ADD THIS BACK BELOEW || !borrowResponse.ok    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//         if (!tickersResponse.ok) {
//             throw new Error('Failed to fetch data');
//         } else {
//             const tickersData = await tickersResponse.json();
//             return tickersData;
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };
// **END LINE BELOW IS THE ENDING OF 10-15 FETCHES**
// ------------------------------------------------------------------------------------------------------------








// **API FETCHES**
// ----------------------------------------------------------------------------------------------------------------------
// **LINE ABOVE MEANS THE START OF THE API FETCHES**

// TICKER FETCHS ONE FOR API END POINT (FRONT END TESTING)
// app.get('/api/tickers', async (req, res) => {
//     try {
//         const response = await fetch('https://api.bybit.com/v2/public/tickers?symbol=BTCUSDT');
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// ONLY FUNDING FETCH
app.get('/api/bybitfunding', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        res.status(400).json({ error: 'API key or secret is missing' });
        return;
    }
    try {
        const fundingResponse = await fetch('https://bybit-premiums-api.onrender.com/funding-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });

        if (!fundingResponse.ok) {
            throw new Error(`HTTP error! status: ${fundingResponse.status}`);
        }

        const fundingData = await fundingResponse.json();
        res.json(fundingData);
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ONLY BORROW FETCH
app.get('/api/bybitborrow', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        res.status(400).json({ error: 'API key or secret is missing' });
        return;
    }
    try {
        const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });

        if (!borrowResponse.ok) {
            throw new Error(`HTTP error! status: ${borrowResponse.status}`);
        }

        const borrowData = await borrowResponse.json();
        res.json(borrowData);
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// BOTH BORROW AND FUNDING FETCH TOGETHER
app.get('/api/bybitall', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        res.status(500).json({ error: 'API key or secret is undefined' });
        return;
    }

    try {
        const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });
        const fundingResponse = await fetch('https://bybit-premiums-api.onrender.com/funding-rate', {
            headers: {
                'apikey': apiKey,
                'secret': apiSecret
            }
        });

        if (!borrowResponse.ok || !fundingResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const borrowData = await borrowResponse.json();
        const fundingData = await fundingResponse.json();
        const combinedData = {
            borrowData,
            fundingData
        };

        res.json(combinedData);
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// **END LINE BELOW IS THE ENDING OF API FETCHES**
// ----------------------------------------------------------------------------------------------------------------------




// TO LISTEN IN
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
