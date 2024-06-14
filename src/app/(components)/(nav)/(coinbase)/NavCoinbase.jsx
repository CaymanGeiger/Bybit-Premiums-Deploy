"use server";
import styles from "../nav.module.css";
import Logo from "../../(logo)/(coinbase)/LogoCoinbase";

export default async function Nav() {
  return (
    <div className={styles.navMain}>
      <Logo />
    </div>
  );
}
