"use client"
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from './coinborrowrates.module.css'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "../(reusable)/radixscroll.css";
import Image from 'next/image'


const CoinBorrowRates = ({ coinBorrowRates }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'spotVolume', direction: 'ascending' });
    const [data, setData] = useState(coinBorrowRates);
    const [visibleItemsCount, setVisibleItemsCount] = useState(100);
    const incrementalLoadCount = 100;
    const [stickyNamesClicked, setStickyNamesClicked] = useState(false);
    const [lastClickedData, setLastClickedData] = useState(null);

    const isStickyNameClicked = stickyNamesClicked ? styles.active : "";

    const getSortIndicator = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return '';
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (lastClickedData === key) {
            direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
            setLastClickedData(key);
            setSortConfig({ key, direction });
        } else if (lastClickedData !== key) {
            setLastClickedData(key);
            setSortConfig({ key, direction });
        }
    }


    const sortedItems = React.useMemo(() => {

        let sortableItems = [...data];
        sortableItems.sort((a, b) => {
            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortConfig.direction === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            } else {
                return sortConfig.direction === 'ascending' ? (valueA || 0) - (valueB || 0) : (valueB || 0) - (valueA || 0);
            }
        });

        return sortableItems;
    }, [data, sortConfig]);


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
                        <table className={`${styles.borrowTable} ${isStickyNameClicked}`}>
                            <colgroup>
                                <col style={{ width: "16%", minWidth: "125px" }} />
                                <col style={{ width: "14%", minWidth: "100px" }} />
                                <col style={{ width: "14%", minWidth: "80px" }} />
                                <col style={{ width: "14%", minWidth: "80px" }} />
                                <col style={{ width: "14%", minWidth: "80px" }} />
                                <col style={{ width: "14%", minWidth: "80px" }} />
                                <col style={{ width: "14%", minWidth: "80px" }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>
                                        <div className={styles.tableThNameDiv}>
                                            <div onClick={() => requestSort('name')} className={styles.tableThName}>
                                                Name
                                                <strong className={styles.arrows}>{getSortIndicator('name')}</strong>
                                            </div>
                                            <button
                                                className={styles.stickyNamesButton}
                                                onClick={() => setStickyNamesClicked(!stickyNamesClicked)}
                                                style={{ backgroundColor: stickyNamesClicked ? "rgb(255, 190, 70)" : "", color: stickyNamesClicked ? "white" : "" }}                                                >
                                                Sticky
                                            </button>
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('spotVolume')}>24h Volume <strong className={styles.arrows}>{getSortIndicator('spotVolume')}</strong></th>
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
                                        // const newOneDay = Number((coinBorrowRate.oneDayAverage * 100).toFixed(3))
                                        // const newThreeDay = Number((coinBorrowRate.threeDayAverage * 100).toFixed(3))
                                        // const newSevenDay = Number((coinBorrowRate.sevenDayAverage * 100).toFixed(3))
                                        // const newThirtyDay = Number((coinBorrowRate.thirtyDayAverage * 100).toFixed(3))
                                        // const newNinetyDay = Number((coinBorrowRate.ninetyDayAverage * 100).toFixed(3))
                                        const formattedVolume = volume >= 1000 ? Math.floor(volume)?.toLocaleString() : volume?.toString();
                                        return (
                                            <motion.tr
                                                key={coinBorrowRate.id}
                                                layout
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 100 }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <td className={styles.tdSymbolAndName}>
                                                    <Image
                                                        width={18}
                                                        height={18}
                                                        src={isSymbol}
                                                        alt='coin symbol'
                                                        onClick={() => window.open(`https://www.bybit.com/en/trade/spot/${coinName}/USDT?affiliate_id=62489`)}
                                                    />
                                                    <span onClick={() => window.open(`https://www.bybit.com/en/trade/spot/${coinName}/USDT?affiliate_id=62489`)}>
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
