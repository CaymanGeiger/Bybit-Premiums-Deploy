"use client"
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from './coinfundingrates.module.css'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "../(reusable)/radixscroll.css";
import Image from 'next/image'
import { toast } from "sonner";
import { getCoinFundingRatesApi }  from "./getFundingRates"
import LoadingTable from '../(reusable)/LoadingTable'
import './loading.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'


const formatRate = (rate) => {
    if (rate === 'NaN' || rate === null) return "";
    if (!isNaN(rate)) {
        const number = parseFloat(rate);
        return `${number.toFixed(2)}%`;
    }
    return "";
};

function formatVolume(volume) {
    volume = Number(volume);

    if (volume >= 1e9) {
    return (volume / 1e9).toFixed(2) + 'b';
    }

    else if (volume >= 1e6) {
    return (volume / 1e6).toFixed(2) + 'm';
    }

    else if (volume >= 1e3) {
    return (volume / 1e3).toFixed(2) + 'k';
    }

    else {
    return volume.toString();
    }
}

const CoinFundingRates = () => {
    const [sortConfig, setSortConfig] = useState({ key: "twentyFourHourVolume", direction: 'descending' });
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
        const savedWatchlist = JSON.parse(localStorage.getItem('funding_watchlist')) || [];
        setWatchlist(savedWatchlist);

        const fetchData = async () => {
            try {
                const data = await getCoinFundingRatesApi();
                setData(data);
                setGettingData(false);
            } catch (error) {
                console.error("Error fetching funding rates:", error);
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
        localStorage.setItem('funding_watchlist', JSON.stringify(updatedWatchlist));
    };


    const sortedAndFilteredItems = sortedItems.filter((coinFundingRate) => {
    return coinFundingRate.name !== undefined && coinFundingRate.name !== null &&
            coinFundingRate.twentyFourHourVolume !== undefined && coinFundingRate.twentyFourHourVolume !== null &&
            coinFundingRate.oneDayAverage !== undefined && coinFundingRate.oneDayAverage !== null &&
            coinFundingRate.threeDayAverage !== undefined && coinFundingRate.threeDayAverage !== null &&
            coinFundingRate.sevenDayAverage !== undefined && coinFundingRate.sevenDayAverage !== null &&
            coinFundingRate.thirtyDayAverage !== undefined && coinFundingRate.thirtyDayAverage !== null &&
            coinFundingRate.ninetyDayAverage !== undefined && coinFundingRate.ninetyDayAverage !== null;
    });


    const watchlistItems = sortedAndFilteredItems.filter(item => watchlist.includes(item.id));
    const nonWatchlistItems = sortedAndFilteredItems.filter(item => !watchlist.includes(item.id));
    const finalItemsToDisplay = [...watchlistItems, ...nonWatchlistItems].slice(0, visibleItemsCount);


    if (!isClientSide) {
        return <div className="load-wrapp">
            <div className="load-6">
                <div className="letter-holder">
                    <div className="l-1 letter">L</div>
                    <div className="l-2 letter">o</div>
                    <div className="l-3 letter">a</div>
                    <div className="l-4 letter">d</div>
                    <div className="l-5 letter">i</div>
                    <div className="l-6 letter">n</div>
                    <div className="l-7 letter">g</div>
                    <div className="l-8 letter">.</div>
                    <div className="l-9 letter">.</div>
                    <div className="l-10 letter">.</div>
                </div>
            </div>
        </div>;
    }
    return (
        <div className={styles.fundingMainDiv}>
            <div className={styles.headerDiv}>
                <h1 className={styles.fundingMainHeader}>
                    BYBIT Funding Rates
                </h1>
                <FontAwesomeIcon icon={faCircleInfo} className={styles.infoIcon}/>
                <div className={styles.modalContent}>
                    <p>
                        Funding rates are the fees that traders pay to hold their positions in perpetual contracts.
                    </p>
                    <p>
                        The funding rate is paid every 8 hours and is used to keep the price of the perpetual contract close to the spot price.
                    </p>
                    <p>
                        When the funding rate is positive, longs pay shorts.
                    </p>
                    <p>
                        When the funding rate is negative, shorts pay longs.
                    </p>
                    <p>
                        The funding rate is determined by the difference between the perpetual contract price and the spot price.
                    </p>
                </div>
            </div>
            {gettingData ? <LoadingTable /> :
            <div className={styles.scrollDiv}>
            <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                        <table className={`${styles.fundingTable} ${isStickyNameClicked}`}>
                            <colgroup>
                                <col style={{ width: "15%", minWidth: "160px" }} />
                                <col style={{ width: "12.14%", minWidth: "80px" }} />
                                <col style={{ width: "12.14%", minWidth: "70px" }} />
                                <col style={{ width: "12.14%", minWidth: "70px" }} />
                                <col style={{ width: "12.14%", minWidth: "70px" }} />
                                <col style={{ width: "12.14%", minWidth: "70px" }} />
                                <col style={{ width: "12.14%", minWidth: "70px" }} />
                                <col style={{ width: "12.14%", minWidth: "70px" }} />
                                <col style={{ width: "12.14%", minWidth: "70px" }} />
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
                                    <th onClick={() => requestSort('twentyFourHourVolume')}>24h Volume <strong className={styles.arrows}>{getSortIndicator('twentyFourHourVolume')}</strong></th>
                                    <th onClick={() => requestSort('currentRate')}>CURRENT <strong className={styles.arrows}>{getSortIndicator('currentRate')}</strong></th>
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
                                    {finalItemsToDisplay.map((coinFundingRate) => {
                                    const handleCoinClick = (coinName) => {
                                        if (typeof gtag === 'function') {
                                            gtag('event', 'select_content', {
                                                'content_type': 'coin',
                                                'item_id': coinName
                                            });
                                        }
                                        window.open(`https://www.bybit.com/trade/usdt/${coinName}?affiliate_id=62489`);
                                    };
                                    const isInWatchlist = watchlist.includes(coinFundingRate.id);
                                    let isSymbol = coinFundingRate.symbolUrl ? coinFundingRate.symbolUrl : "/noImage.png";
                                    let coinName = coinFundingRate.name.trim();
                                    const volume = coinFundingRate.twentyFourHourVolume;
                                    const formattedVolume = formatVolume(volume);
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
                                                    onClick={() => handleCoinClick(coinFundingRate.name)}
                                                />
                                                <span onClick={() => handleCoinClick(coinFundingRate.name)}>
                                                    {coinFundingRate.name}
                                                </span>
                                                {isInWatchlist ?
                                                    <h5 className={styles.watchListMinus} onClick={() => handleWatchlistChange(coinFundingRate)}>-</h5> :
                                                    <h5 className={styles.watchListPlus} onClick={() => handleWatchlistChange(coinFundingRate)}>+</h5>
                                                }
                                            </td>
                                            <td>{formattedVolume ? `$${formattedVolume}` : ""}</td>
                                            <td>{formatRate(coinFundingRate.currentRate)}</td>
                                            <td>{formatRate(coinFundingRate.oneDayAverage)}</td>
                                            <td>{formatRate(coinFundingRate.threeDayAverage)}</td>
                                            <td>{formatRate(coinFundingRate.sevenDayAverage)}</td>
                                            <td>{formatRate(coinFundingRate.thirtyDayAverage)}</td>
                                            <td>{formatRate(coinFundingRate.ninetyDayAverage)}</td>
                                            <td>{formatRate(coinFundingRate.yearAverage)}</td>
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
export default CoinFundingRates;
