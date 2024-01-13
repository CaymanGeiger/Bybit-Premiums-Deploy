
import Test from '@/app/(components)/test/page';
import prisma from '../../../../lib/prisma';
import PQueue from 'p-queue';

let newList = [];
let started = "stage0"
export const createOrUpdateBorrowData = async (borrowData) => {
    if (!Array.isArray(borrowData)) {
        console.error("Expected borrowData to be an array.");
        return;
    }
    newList = borrowData;
    started = "stage1"
    console.log("Updating/Creating Borrow Rates Now....");
    const queue = new PQueue({ concurrency: 5 });
    let borrowCurrentItemIndex = 0;
    let stopBorrowProcessing = false;
    console.log("working")
    const coinIds = [...new Set(Object.values(borrowData).flat().map(item => item['coin id']).filter(id => id !== undefined))];
    const existingRecords = await prisma.coinBorrowRate.findMany({
        where: { coinId: { in: coinIds } }
    });
    const recordsMap = new Map(existingRecords.map(record => [record.coinId, record]));
    console.log(borrowData)
    console.log(borrowData);
    for (const item of borrowData) {
        console.log("Processing item", item);
        queue.add(() => processBorrowItem(item, recordsMap));
        if (borrowCurrentItemIndex === borrowData.length - 1) {
            stopBorrowProcessing = true;
            break;
        }
        if (stopBorrowProcessing) {
            break;
        }
    }
    await queue.onIdle();
    borrowCurrentItemIndex = 0;
    stopBorrowProcessing = false;
    console.log("Borrow Update/Create Complete.");
    // filterOutBorrowUSDT();
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


// let borrowCompleted = 0;
// const processBorrowItem = async (item, recordsMap) => {
//     let coinTrim = item.coin.trim();
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
//                 ninetyDayAverage: 3 || null,
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
//             console.error("issue", e);
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
//                     ninetyDayAverage: 3 || null,
//                 }
//             });
//             try {
//                 const nestedItemData = itemData.result.list[0];
//                 await prisma.coinBorrowRate.update({
//                     where: updateCondition,
//                     data: {
//                         spotVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
//                     }
//                 })
//             } catch (e) {
//                 console.error("issue", e);
//             };
//         } catch (error) {
//             console.error("An error occurred while creating a record:", error);
//         }
//     };
//     borrowCompleted += 1;
//     console.log("BORROW WRITE WAS COMPLETED", borrowCompleted);
// }


let borrowCompleted = 0;
const processBorrowItem = async (item, recordsMap) => {
    let coinTrim = item.coin.trim();
    await delay(1200);
    const existingRecord = recordsMap.get(item['coin id']);
    // const itemResponse = await fetch(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${coinTrim}USDT`);
    // const itemData = await itemResponse.json();

    if (existingRecord) {
        await prisma.coinBorrowRate.create({
            data: {
                coinId: item && item['coin id'] || null,
                name: item && coinTrim || null,
                oneDayAverage: item && item['one day'] || null,
                threeDayAverage: item && item['three days'] || null,
                sevenDayAverage: item && item.week || null,
                thirtyDayAverage: item && item.month || null,
                ninetyDayAverage: 6 || null,
            }
        });
        // try {
        //     const nestedItemData = itemData.result.list[0];
        //     await prisma.coinBorrowRate.update({
        //         where: updateCondition,
        //         data: {
        //             spotVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
        //         }
        //     });
        // } catch (e) {
        //     console.error("issue", e);
        // }
    } else {
        try {
            await prisma.coinBorrowRate.create({
                data: {
                    coinId: item && item['coin id'] || null,
                    name: item && coinTrim || null,
                    oneDayAverage: item && item['one day'] || null,
                    threeDayAverage: item && item['three days'] || null,
                    sevenDayAverage: item && item.week || null,
                    thirtyDayAverage: item && item.month || null,
                    ninetyDayAverage: 6 || null,
                }
            });
            // try {
            //     const nestedItemData = itemData.result.list[0];
            //     await prisma.coinBorrowRate.update({
            //         where: updateCondition,
            //         data: {
            //             spotVolume: nestedItemData && parseFloat(nestedItemData.turnover24h) || null,
            //         }
            //     })
            // } catch (e) {
            //     console.error("issue", e);
            // };
        } catch (error) {
            console.error("An error occurred while creating a record:", error);
        }
    };
    borrowCompleted += 1;
    console.log("BORROW WRITE WAS COMPLETED", borrowCompleted);
}


export default function Test3() {

    return <div> Test {started}</div>
}
