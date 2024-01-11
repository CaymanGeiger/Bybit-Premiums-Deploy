import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'
import PQueue from 'p-queue';

export async function GET(req, res) {

    if (!req.headers === "FETCH_BORROW_DATA") {
        return NextResponse.error(new Error('FETCH_BORROW_DATA is missing or not set to true'));
    }
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

    if (!apiKey || !apiSecret) {
        console.error('API key or secret is undefined');
        return NextResponse.error(new Error('API key or secret is missing'));
    }

    try {
        const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
            headers: { 'apikey': apiKey, 'secret': apiSecret }
        });

        if (!borrowResponse.ok) {
            console.error('Error fetching data:', borrowResponse.statusText);
            return NextResponse.error(new Error('Borrow response failed'));
        }

        const borrowData = await borrowResponse.json();
        // createOrUpdateBorrowData(borrowData);
        return NextResponse.json(borrowData);

        // return res.status(200).json({ message: 'Borrow data successfully updated' });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(new Error('Borrow response failed'));
    }
}


const createOrUpdateBorrowData = async (borrowData) => {
    console.log("Updating/Creating Borrow Rates Now....");

    const queue = new PQueue({ concurrency: 5 });
    let borrowCurrentItemIndex = 0;
    let stopBorrowProcessing = false;

    const coinIds = [...new Set(Object.values(borrowData).flat().map(item => item['coin id']).filter(id => id !== undefined))];
    const existingRecords = await prisma.coinBorrowRate.findMany({
        where: { coinId: { in: coinIds } }
    });
    const recordsMap = new Map(existingRecords.map(record => [record.coinId, record]));

    for (const key in borrowData) {
        if (borrowData.hasOwnProperty(key)) {
            let itemsArray = borrowData[key];

            if (Array.isArray(itemsArray)) {
                for (const item of itemsArray) {
                    // queue.add(() => processBorrowItem(item, recordsMap));
                    borrowCurrentItemIndex++;
                    if (borrowCurrentItemIndex === borrowData.length - 1) {
                        stopBorrowProcessing = true;
                        break;
                    }
                }
                if (stopBorrowProcessing) {
                    break;
                }
            } else {
                console.error(`Expected an array for key ${key}, but received:`, borrowData);
            }
        }
    }
    await queue.onIdle();
    borrowCurrentItemIndex = 0;
    stopBorrowProcessing = false;
    console.log("Borrow Update/Create Complete, Getting Borrow Logos Now...");
    // filterOutBorrowUSDT();
}


// function delay(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }


// let borrowCompleted = 0;
// const processBorrowItem = async (item, recordsMap) => {
//     let coinTrim = item.coin.trim()
//     await delay(1200);
//     const existingRecord = recordsMap.get(item['coin id']);
//     const itemResponse = await fetch(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${coinTrim}USDT`);
//     const itemData = await itemResponse.json();

//     let updateCondition = {};


//     if (item.coinId) {
//         updateCondition.coinId = item.coinId;
//     } else if (coinTrim) {
//         updateCondition.name = coinTrim;
//     }

//     if (existingRecord) {
//         await prisma.coinBorrowRate.update({
//             where: updateCondition,
//             data: {
//                 coinId: item && item['coin id'] || null,
//                 name: item && coinTrim || null,
//                 oneDayAverage: item && item['one day'] || null,
//                 threeDayAverage: item && item['three days'] || null,
//                 sevenDayAverage: item && item.week || null,
//                 thirtyDayAverage: item && item.month || null,
//                 ninetyDayAverage: item && item['three months'] || null,
//             }
//         });
//         try {
//             const nestedItemData = itemData.result.list[0];
//             await prisma.coinBorrowRate.update({
//                 where: updateCondition,
//                 data: {
//                     spotVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
//                 }
//             });
//         } catch (e) {
//             console.error("issue", e)
//         }
//     } else {
//         try {
//             await prisma.coinBorrowRate.create({
//                 data: {
//                     coinId: item && item['coin id'] || null,
//                     name: item && coinTrim || null,
//                     oneDayAverage: item && item['one day'] || null,
//                     threeDayAverage: item && item['three days'] || null,
//                     sevenDayAverage: item && item.week || null,
//                     thirtyDayAverage: item && item.month || null,
//                     ninetyDayAverage: item && item['three months'] || null,
//                 }
//             });
//             try {
//                 const nestedItemData = itemData.result.list[0];
//                 await prisma.coinBorrowRate.update({
//                     where: updateCondition,
//                     data: {
//                         spotVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
//                     }
//                 });
//             } catch (e) {
//                 console.error("issue", e)
//             }
//         } catch (error) {
//             console.error("An error occurred while creating a record:", error);
//         }
//     };
//     borrowCompleted += 1
//     console.log("BORROW WRITE WAS COMPLETED", borrowCompleted)
// }
