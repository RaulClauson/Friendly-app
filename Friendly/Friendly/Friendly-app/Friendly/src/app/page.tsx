"use client";
import Friendly_Input from "./Components/Friendly_Input/Friendly_Input";
import Cabecalho from "./Components/Cabecalho/Cabecalho";
import styles from "./page.module.css";
import Friendly_Olhos from "./Components/Friendly_Olhos/Friendly_Olhos";
import { useState } from 'react';

export default function Home() {
  const [emocao, setEmocao] = useState<number>(0); // Estado para a emoção

  // Função para atualizar a emoção, que pode ser passada para Friendly_Input
  const handleEmocaoChange = (novaEmocao: number) => {
    setEmocao(novaEmocao);
  };

  return (
    <main className={styles.main} id="main">
      <Cabecalho titulo='FRIENDLY' />
      <Friendly_Olhos emocao={emocao} /> {/* Passando a emoção para Friendly_Olhos */}
      <Friendly_Input onChange={handleEmocaoChange} /> {/* Passando a função para Friendly_Input */}
    </main>
  );
}
