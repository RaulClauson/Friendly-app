"use client";
import Friendly_Input from "./Components/Friendly_Input/Friendly_Input";
import Cabecalho from "./Components/Cabecalho/Cabecalho";
import styles from "./page.module.css";
import Friendly_Olhos from "./Components/Friendly_Olhos/Friendly_Olhos";

export default function Home() {
  return (
    <main className={styles.main} id="main">
      <Cabecalho titulo='FRIENDLY'/>
      <Friendly_Olhos/>
      <Friendly_Input/>
    </main>
  );
}
