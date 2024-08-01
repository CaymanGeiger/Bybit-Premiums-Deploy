"use server";
import styles from "../nav.module.css";
import Logo from "../../(logo)/(bybit)/LogoBybit";

export default async function Nav() {
  return (
    <div className={styles.navMain}>
      <Logo />
      <div className={styles.navLinks}>
        <a className={styles.links} href="/about">
          About
        </a>
        <a className={styles.links} href="/">
          Bybit
        </a>
        <a className={styles.links} href="/coinbase">
          Coinbase
        </a>
        <a className={styles.links} href="/gemini">
          Gemini
        </a>
      </div>
    </div>
  );
}
