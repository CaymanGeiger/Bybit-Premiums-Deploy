"use server";
import styles from "../nav.module.css";
import Logo from "../../(logo)/(gemini)/LogoGemini";
import BaseNav from "../baseNav";

export default async function Nav() {
  return (
    <div className={styles.navMain}>
      <Logo />
      <BaseNav />
    </div>
  );
}
