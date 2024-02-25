"use client"
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from './coinborrowrates.module.css'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "../(reusable)/radixscroll.css";
import Image from 'next/image'
import { toast } from "sonner";
import { getCoinBorrowRatesApi } from './getBorrowRates';
import LoadingTable from '../(reusable)/LoadingTable'


const formatRate = (rate) => {
    if (!isNaN(rate)) {
        const number = parseFloat(rate);
        return number.toFixed(3);
    }
    return "";
};


const CoinBorrowRates = () => {
    const [sortConfig, setSortConfig] = useState({ key: "spotVolume", direction: 'descending' });
    const [data, setData] = useState([]);
    const [visibleItemsCount, setVisibleItemsCount] = useState(100);
    const incrementalLoadCount = 100;
    const [stickyNamesClicked, setStickyNamesClicked] = useState(false);
    const [gettingData, setGettingData] = useState(true);
    const [isClientSide, setIsClientSide] = useState(false);
    const isStickyNameClicked = stickyNamesClicked ? styles.active : "";
    const [lastClickedData, setLastClickedData] = useState(null);
    const [watchlist, setWatchlist] = useState([]);


    useEffect(() => {
        setIsClientSide(true);
        const savedWatchlist = JSON.parse(localStorage.getItem('Borrow_watchlist')) || [];
        setWatchlist(savedWatchlist);

        const fetchData = async () => {
            try {
                const data = await getCoinBorrowRatesApi();
                setData(data);
                setGettingData(false);
            } catch (error) {
                console.error("Error fetching borrow rates:", error);
            }
        };
        fetchData();

    }, []);


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
        if (!Array.isArray(data) || sortConfig.key === null) {
            return data;
        }

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




    const handleWatchlistChange = (coin) => {
        let updatedWatchlist = [...watchlist];
        if (watchlist.includes(coin.id)) {
            updatedWatchlist = updatedWatchlist.filter(watchlistId => watchlistId !== coin.id);
            toast.error(`Removed ${coin.name} From Watchlist.`);
        } else {
            updatedWatchlist.push(coin.id);
            toast.success(`Added ${coin.name} To Watchlist.`);
        }
        setWatchlist(updatedWatchlist);
        localStorage.setItem('Borrow_watchlist', JSON.stringify(updatedWatchlist));
    };


    const sortedAndFilteredItems = sortedItems.filter((coinBorrowRate) => {
        return coinBorrowRate.name !== undefined && coinBorrowRate.name !== null &&
            coinBorrowRate.spotVolume !== undefined && coinBorrowRate.spotVolume !== null &&
            coinBorrowRate.oneDayAverage !== undefined && coinBorrowRate.oneDayAverage !== null &&
            coinBorrowRate.threeDayAverage !== undefined && coinBorrowRate.threeDayAverage !== null &&
            coinBorrowRate.sevenDayAverage !== undefined && coinBorrowRate.sevenDayAverage !== null &&
            coinBorrowRate.thirtyDayAverage !== undefined && coinBorrowRate.thirtyDayAverage !== null &&
            coinBorrowRate.ninetyDayAverage !== undefined && coinBorrowRate.ninetyDayAverage !== null;
    });

    const watchlistItems = sortedAndFilteredItems.filter(item => watchlist.includes(item.id));
    const nonWatchlistItems = sortedAndFilteredItems.filter(item => !watchlist.includes(item.id));
    const finalItemsToDisplay = [...watchlistItems, ...nonWatchlistItems].slice(0, visibleItemsCount);


    if (!isClientSide) {
        return <div></div>;
    }

    return (
        <div className={styles.borrowMainDiv}>
            <h1 className={styles.borrowMainHeader}>
                BYBIT Borrow Rates
            </h1>
            {gettingData ? <LoadingTable /> :
            <div className={styles.scrollDiv}>
                <ScrollArea.Root className="ScrollAreaRoot">
                    <ScrollArea.Viewport className="ScrollAreaViewport">
                        <table className={`${styles.borrowTable} ${isStickyNameClicked}`}>
                            <colgroup>
                                <col style={{ width: "15%", minWidth: "160px" }} />
                                <col style={{ width: "12.14%", minWidth: "120px" }} />
                                <col style={{ width: "12.14%", minWidth: "80px" }} />
                                <col style={{ width: "12.14%", minWidth: "80px" }} />
                                <col style={{ width: "12.14%", minWidth: "80px" }} />
                                <col style={{ width: "12.14%", minWidth: "80px" }} />
                                <col style={{ width: "12.14%", minWidth: "80px" }} />
                                <col style={{ width: "12.14%", minWidth: "80px" }} />
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
                                    <th onClick={() => requestSort('spotVolume')}>Spot Volume <strong className={styles.arrows}>{getSortIndicator('spotVolume')}</strong></th>
                                    <th onClick={() => requestSort('oneDayAverage')}>1d <strong className={styles.arrows}>{getSortIndicator('oneDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('threeDayAverage')}>3d <strong className={styles.arrows}>{getSortIndicator('threeDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('sevenDayAverage')}>7d <strong className={styles.arrows}>{getSortIndicator('sevenDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('thirtyDayAverage')}>1m <strong className={styles.arrows}>{getSortIndicator('thirtyDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('ninetyDayAverage')}>3m <strong className={styles.arrows}>{getSortIndicator('ninetyDayAverage')}</strong></th>
                                    <th onClick={() => requestSort('yearAverage')}>1y <strong className={styles.arrows}>{getSortIndicator('yearAverage')}</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {finalItemsToDisplay.map((coinBorrowRate) => {
                                        const handleCoinClick = (coinName) => {
                                            if (typeof gtag === 'function') {
                                                gtag('event', 'select_content', {
                                                    'content_type': 'coin',
                                                    'item_id': coinName
                                                });
                                            }
                                            window.open(`https://www.bybit.com/en/trade/spot/${coinName}/USDT?affiliate_id=62489`);
                                        };
                                        const isInWatchlist = watchlist.includes(coinBorrowRate.id);
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
                                                        onClick={() => handleCoinClick(coinBorrowRate.name)}
                                                    />
                                                    <span onClick={() => handleCoinClick(coinBorrowRate.name)}>
                                                        {coinBorrowRate.name}
                                                    </span>
                                                    {isInWatchlist ?
                                                        <h5 className={styles.watchListMinus} onClick={() => handleWatchlistChange(coinBorrowRate)}>-</h5> :
                                                        <h5 className={styles.watchListPlus} onClick={() => handleWatchlistChange(coinBorrowRate)}>+</h5>
                                                    }
                                                </td>
                                                <td>{formattedVolume ? `$${formattedVolume}` : ""}</td>
                                                <td>{formatRate(coinBorrowRate.oneDayAverage)}%</td>
                                                <td>{formatRate(coinBorrowRate.threeDayAverage)}%</td>
                                                <td>{formatRate(coinBorrowRate.sevenDayAverage)}%</td>
                                                <td>{formatRate(coinBorrowRate.thirtyDayAverage)}%</td>
                                                <td>{formatRate(coinBorrowRate.ninetyDayAverage)}%</td>
                                                <td>{formatRate(coinBorrowRate.yearAverage)}%</td>
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
            }
        </div>
    );
}

export default CoinBorrowRates;
