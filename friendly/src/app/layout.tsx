import type { Metadata } from "next";
import "./globals.css";
import Menu from "./Components/Menu/Menu";
import styles from "./page.module.css";
import Rodape from "./Components/Rodape/Rodape";

export const metadata: Metadata = {
  title: "Friendly",
  description: "Seu melhor amigo virtual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Menu></Menu>
        <main className={styles.main}>
          {children}
          <Rodape></Rodape>
        </main>
      </body>
    </html>
  );
}
