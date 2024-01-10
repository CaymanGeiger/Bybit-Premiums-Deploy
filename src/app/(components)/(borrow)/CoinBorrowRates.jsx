"use client"
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from './coinborrowrates.module.css'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "../(reusable)/radixscroll.css";
import Image from 'next/image'



const CoinBorrowRates = ({ coinBorrowRates }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
    const [data, setData] = useState(coinBorrowRates);
    const [cachedData, setCachedData] = useState(null); // Initialize with null
    const [visibleItemsCount, setVisibleItemsCount] = useState(50); // Start with 10 items
    const incrementalLoadCount = 50;


    useEffect(() => {
        const cacheKey = 'coinBorrowRates';
        const storedData = localStorage.getItem(cacheKey);
        if (storedData) {
            const { data: cachedRates, timestamp } = JSON.parse(storedData);
            const isExpired = Date.now() - timestamp > 3600000; // 1 hour expiration
            if (!isExpired) {
                setCachedData(cachedRates);
            } else {
                updateCache(cacheKey, data);
            }
        }
    }, []);

    const updateCache = (key, newData) => {
        localStorage.setItem(key, JSON.stringify({ data: newData, timestamp: Date.now() }));
        setCachedData(newData); // Also update cached data state
    };

    const getSortIndicator = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return '';
    };


    const requestSort = (key) => {
        let direction = 'descending';
        if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    }


    const sortedItems = React.useMemo(() => {
        let dataToSort = cachedData || data;

        let sortableItems = [...dataToSort];
        if (sortConfig.key !== null && sortConfig.direction !== 'none') {
            sortableItems.sort((a, b) => {
                if (sortConfig.key === 'name') {
                    const valueA = a[sortConfig.key] || '';
                    const valueB = b[sortConfig.key] || '';

                    if (sortConfig.direction === 'descending') {
                        return valueB.localeCompare(valueA);
                    } else {
                        return valueA.localeCompare(valueB);
                    }
                } else {
                    const valueA = parseFloat(a[sortConfig.key]) || 0;
                    const valueB = parseFloat(b[sortConfig.key]) || 0;

                    if (sortConfig.direction === 'descending') {
                        return valueB - valueA;
                    } else {
                        return valueA - valueB;
                    }
                }
            });
        }
        return sortableItems;
    }, [coinBorrowRates, sortConfig]);



    useEffect(() => {
        if (visibleItemsCount < sortedItems.length) {
            const timer = setTimeout(() => {
                setVisibleItemsCount(visibleItemsCount + incrementalLoadCount);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [visibleItemsCount, sortedItems]);

    return (
        <div className={styles.borrowMainDiv}>
            <h1 className={styles.borrowMainHeader}>
                BYBIT Borrow Rates
            </h1>
            <div className={styles.scrollDiv}>
                <ScrollArea.Root className="ScrollAreaRoot">
                    <ScrollArea.Viewport className="ScrollAreaViewport">
                        <table>
                            <colgroup>
                                <col style={{ width: "23%", minWidth: "150px" }} />
                                <col style={{ width: "12.8", minWidth: "fit-content" }} />
                                <col style={{ width: "12.8", minWidth: "fit-content" }} />
                                <col style={{ width: "12.8", minWidth: "fit-content" }} />
                                <col style={{ width: "12.8", minWidth: "fit-content" }} />
                                <col style={{ width: "12.8", minWidth: "fit-content" }} />
                                <col style={{ width: "12.8", minWidth: "fit-content" }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th onClick={() => requestSort('name')}>Name <strong className={styles.arrows}>{getSortIndicator('name')}</strong></th>
                                    <th onClick={() => requestSort('spotVolume')}>Spot Volume <strong className={styles.arrows}>{getSortIndicator('spotVolume')}</strong></th>
                                    <th onClick={() => requestSort('oneDayAverage')}>1d <strong className={styles.arrows}>{getSortIndicator('oneDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('threeDayAverage')}>3d <strong className={styles.arrows}>{getSortIndicator('threeDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('sevenDayAverage')}>7d <strong className={styles.arrows}>{getSortIndicator('sevenDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('thirtyDayAverage')}>1m <strong className={styles.arrows}>{getSortIndicator('thirtyDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('ninetyDayAverage')}>3m <strong className={styles.arrows}>{getSortIndicator('ninetyDayAverage')}</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {sortedItems.slice(0, visibleItemsCount).filter((coinBorrowRate) => {
                                        // Add the conditions for the properties you want to check
                                        return coinBorrowRate.name ||
                                            coinBorrowRate.spotVolume ||
                                            coinBorrowRate.oneDayAverage ||
                                            coinBorrowRate.threeDayAverage ||
                                            coinBorrowRate.sevenDayAverage ||
                                            coinBorrowRate.thirtyDayAverage ||
                                            coinBorrowRate.ninetyDayAverage;
                                    }).map((coinBorrowRate) => {
                                        let isSymbol = coinBorrowRate.symbolUrl ? coinBorrowRate.symbolUrl : "/noImage.png";
                                        let coinName = coinBorrowRate.name.trim();
                                        const volume = coinBorrowRate.spotVolume;
                                        const formattedVolume = volume >= 1000 ? Math.floor(volume)?.toLocaleString() : volume?.toString();
                                        return (
                                            <motion.tr
                                                key={coinBorrowRate.id}
                                                layout
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 100 }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: "easeInOut",
                                                    delay: 0.1
                                                }}
                                            >
                                                <td className={styles.tdSymbolAndName}>
                                                    <Image
                                                        width={18}
                                                        height={18}
                                                        src={isSymbol}
                                                        alt='coin symbol'
                                                        onClick={() => window.open(`https://www.bybit.com/trade/usdt/${coinName}?affiliate_id=62489`)}
                                                    />
                                                    <span onClick={() => window.open(`https://www.bybit.com/trade/usdt/${coinName}?affiliate_id=62489`)}>
                                                        {coinBorrowRate.name}
                                                    </span>
                                                </td>
                                                <td>{formattedVolume ? `$${formattedVolume}` : ""}</td>
                                                <td>{coinBorrowRate.oneDayAverage ? `${coinBorrowRate.oneDayAverage}%` : ""}</td>
                                                <td>{coinBorrowRate.threeDayAverage ? `${coinBorrowRate.threeDayAverage}%` : ""}</td>
                                                <td>{coinBorrowRate.sevenDayAverage ? `${coinBorrowRate.sevenDayAverage}%` : ""}</td>
                                                <td>{coinBorrowRate.thirtyDayAverage ? `${coinBorrowRate.thirtyDayAverage}%` : ""}</td>
                                                <td>{coinBorrowRate.ninetyDayAverage ? `${coinBorrowRate.ninetyDayAverage}%` : ""}</td>
                                            </motion.tr>
                                        )
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                        <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                        <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner className="ScrollAreaCorner" />
                </ScrollArea.Root>
            </div>
        </div>
    );
}
export default CoinBorrowRates;
