"use client";
import { useState, useEffect, useRef } from "react";
import Menu from "./Components/Menu/Menu";
import Rodape from "./Components/Rodape/Rodape";
import Loading from "./Components/Loading/Loading";
import styles from "./page.module.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a network request or some loading task
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (or when data finishes loading)
    }, 2000); // You can adjust the time or trigger this based on data fetching

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <html lang="pt-br">
      <body>
        {loading ? (
          <Loading /> // Show the loading animation while loading is true
        ) : (
          <>
            <Menu />
            <main className={styles.main}>
              {children}
              <Rodape />
            </main>
          </>
        )}
      </body>
    </html>
  );
}
