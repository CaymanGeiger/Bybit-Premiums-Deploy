"use client"
import styles from "./login.module.css"
import { useState } from 'react';
import Login from "./Login"


export default function LoginButton() {
    const [loginOpened, setLoginOpened] = useState(false);


    return (
        <div>
            <div
            onClick={() => setLoginOpened(!loginOpened)}
            className={`${styles.btn} ${styles["from-center"]}`}
            >
                Login
            </div>
                <div className={`${loginOpened ? `${styles.loginDiv} ${styles.loginDivOpened}` : `${styles.loginDiv} ${styles.loginDivClosed}`}`}>

                {/* <button className={`${loginOpened ? `${styles.closeButtonLogin} ${styles.closeButtonLoginOpened}` : `${styles.closeButtonLogin} ${styles.closeButtonLoginClosed}`}`}>
                        close
                </button> */}
                <h5 onClick={() => setLoginOpened(false)} className={styles.closeIcon}>
                    X
                </h5>
                    <Login />
                </div>
            <div
            onClick={() => setLoginOpened(false)}
            className={`${styles.loginOverlay} ${loginOpened ? styles.overlayOpened : styles.overlayClosed}`}
            ></div>
        </div>
    )
}
