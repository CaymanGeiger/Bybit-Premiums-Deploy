// import prisma from './lib/prisma';

// type borrowDataType = {
//     id: string;
//     coinId: any;
//     name: string;
//     symbol: string | null;
//     oneDayAverage: number;
//     threeDayAverage: number;
//     sevenDayAverage: number;
//     thirtyDayAverage: number;
//     ninetyDayAverage: number;
//     spotVolume: number;
// }

// type fundingDataType = {
//     id: string;
//     coinId: any;
//     name: string;
//     symbol: string | null;
//     currentRate: number;
//     oneDayAverage: number;
//     threeDayAverage: number;
//     sevenDayAverage: number;
//     thirtyDayAverage: number;
//     ninetyDayAverage: number;
//     twentyFourHourVolume: number;
// }

// async function updateOrCreateRecords(borrowData: borrowDataType, fundingData: fundingDataType) {
//     if (!borrowData || !fundingData) {
//         console.error('Data is undefined');
//         return;
//     }
//     for (const item in borrowData) {
//         // Fetch the current record based on a unique identifier, e.g., id
//         const existingRecord = await prisma.coinBorrowRate.findUnique({
//             where: { coinId: item['coin id'] }
//         });

//         if (existingRecord) {
//             // Compare relevant fields
//             const needsUpdate = (existingRecord.coinId !== item['coin id']) ||
//                 (existingRecord.coinId !== item['coin id']) ||
//                 // Add more fields to compare as needed
//                 (existingRecord.coinId !== item['coin id']);

//             // Update if any field has changed
//             if (needsUpdate) {
//                 await prisma.coinBorrowRate.update({
//                     where: { coinId: item['coin id'] },
//                     data: {
//                         // ...fields to update
//                     }
//                 });
//             }
//         } else {
//             // Create a new record if it doesn't exist
//             await prisma.yourModel.create({
//                 data: {
//                     // ...fields to create
//                 }
//             });
//         }
//     }
// }


// async function fetchDataAndUpdateDB() {
//     const apiKey = process.env.API_KEY;
//     const apiSecret = process.env.API_SECRET;

//     if (!apiKey || !apiSecret) {
//         console.error('API key or secret is undefined');
//         return;
//     }

//     try {
//         const borrowResponse = await fetch('https://bybit-premiums-api.onrender.com/borrow-rate', {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'X-Secret': apiSecret
//             }
//         });
//         const fundingResponse = await fetch('https://bybit-premiums-api.onrender.com/funding-rate', {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'X-Secret': apiSecret
//             }
//         });
//         const borrowData = await borrowResponse.json();
//         const fundingData = await fundingResponse.json();
//         await updateOrCreateRecords(borrowData);
//         await updateOrCreateRecords(fundingData);

//         console.log('Data updated successfully');
//     } catch (error) {
//         console.error('Error updating data:', error);
//     }
// }

// fetchDataAndUpdateDB();
