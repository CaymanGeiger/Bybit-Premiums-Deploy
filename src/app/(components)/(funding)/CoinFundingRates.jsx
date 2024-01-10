"use client"
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from './coinfundingrates.module.css'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "../(reusable)/radixscroll.css";
import Image from 'next/image'



const CoinFundingRates = ({ coinFundingRates }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
    const [data, setData] = useState(coinFundingRates);
    const [stickyNamesClicked, setStickyNamesClicked] = useState(false);
    const [visibleItemsCount, setVisibleItemsCount] = useState(50);
    const incrementalLoadCount = 50;
    const isStickyNameClicked = stickyNamesClicked ? styles.active : "";

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
        let dataToSort = data;

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
        <div className={styles.fundingMainDiv}>
            <h1 className={styles.fundingMainHeader}>
                BYBIT Funding Rates
            </h1>
            <div className={styles.scrollDiv}>
            <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                        <table className={`${styles.fundingTable} ${isStickyNameClicked}`}>
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
                                                style={{ backgroundColor: stickyNamesClicked ? "rgb(255, 190, 70)" : "" }}
                                                >
                                                Sticky
                                            </button>
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('twentyFourHourVolume')}>24h Volume <strong className={styles.arrows}>{getSortIndicator('twentyFourHourVolume')}</strong></th>
                                    <th onClick={() => requestSort('oneDayAverage')}>1d <strong className={styles.arrows}>{getSortIndicator('oneDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('threeDayAverage')}>3d <strong className={styles.arrows}>{getSortIndicator('threeDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('sevenDayAverage')}>7d <strong className={styles.arrows}>{getSortIndicator('sevenDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('thirtyDayAverage')}>1m <strong className={styles.arrows}>{getSortIndicator('thirtyDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('ninetyDayAverage')}>3m <strong className={styles.arrows}>{getSortIndicator('ninetyDayAverage')}</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {sortedItems.slice(0, visibleItemsCount).filter((coinFundingRate) => {
                                        return coinFundingRate.name ||
                                            coinFundingRate.twentyFourHourVolume ||
                                            coinFundingRate.oneDayAverage ||
                                            coinFundingRate.threeDayAverage ||
                                            coinFundingRate.sevenDayAverage ||
                                            coinFundingRate.thirtyDayAverage ||
                                            coinFundingRate.ninetyDayAverage;
                                    }).map((coinFundingRate) => {
                                    let isSymbol = coinFundingRate.symbolUrl ? coinFundingRate.symbolUrl : "/noImage.png";
                                    let coinName = coinFundingRate.name.trim();
                                    const volume = coinFundingRate.twentyFourHourVolume;
                                    const newOneDay = Number((coinFundingRate.oneDayAverage * 100).toFixed(3))
                                    const newThreeDay = Number((coinFundingRate.threeDayAverage * 100).toFixed(3))
                                    const newSevenDay = Number((coinFundingRate.sevenDayAverage * 100).toFixed(3))
                                    const newThirtyDay = Number((coinFundingRate.thirtyDayAverage * 100).toFixed(3))
                                    const newNinetyDay = Number((coinFundingRate.ninetyDayAverage * 100).toFixed(3))
                                    const formattedVolume = volume >= 1000 ? Math.floor(volume)?.toLocaleString() : volume?.toString();
                                    return (
                                        <motion.tr
                                            key={coinFundingRate.id}
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
                                                    onClick={() => window.open(`https://www.bybit.com/trade/usdt/${coinName}?affiliate_id=62489`)}
                                                />
                                                <span onClick={() => window.open(`https://www.bybit.com/trade/usdt/${coinName}?affiliate_id=62489`)}>
                                                    {coinFundingRate.name}
                                                </span>
                                            </td>
                                            <td>{formattedVolume ? `$${formattedVolume}` : ""}</td>
                                            <td>{newOneDay ? `${newOneDay}%` : ""}</td>
                                            <td>{newThreeDay ? `${newThreeDay}%` : ""}</td>
                                            <td>{newSevenDay? `${newSevenDay}%` : ""}</td>
                                            <td>{newThirtyDay? `${newThirtyDay}%` : ""}</td>
                                            <td>{newNinetyDay ? `${newNinetyDay}%` : ""}</td>
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
export default CoinFundingRates;
