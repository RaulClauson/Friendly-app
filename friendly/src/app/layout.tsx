"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Menu from "./Components/Menu/Menu";
import Rodape from "./Components/Rodape/Rodape";
import Loading from "./Components/Loading/Loading";
import styles from "./page.module.css";
import "./globals.css";
import YouTubePlayer from "./Components/Youtube_Music/YoutubePlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [playlistId, setPlaylistId] = useState<string>(() => {
    // Load the saved playlist ID from localStorage on component mount
    return localStorage.getItem("playlistId") || "";
  });
  const [inputUrl, setInputUrl] = useState<string>("");

  useEffect(() => {
    // Simulate a network request or some loading task
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Save the playlist ID to localStorage whenever it changes
  useEffect(() => {
    if (playlistId) {
      localStorage.setItem("playlistId", playlistId);
    }
  }, [playlistId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(new URL(inputUrl).search);
    const extractedPlaylistId = urlParams.get("list");
    if (extractedPlaylistId) {
      setPlaylistId(extractedPlaylistId);
    } else {
      alert("Invalid YouTube Music playlist URL");
    }
  };

  return (
    <html lang="pt-br">
      <head>
        <title>Friendly</title>
      </head>
      <body>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Menu />
            <main className={styles.main}>
              {children}
              <div id="">
                <form onSubmit={handleSubmit}>
                <h1>Insira o link da Playlist do YouTube Music</h1>
                  <input
                    type="text"
                    placeholder="Enter YouTube Music playlist URL"
                    value={inputUrl}
                    onChange={handleInputChange}
                  />
                  <button type="submit">Load Playlist</button>
                </form>
              </div>
              {playlistId && <YouTubePlayer playlistId={playlistId} />}
              <Rodape />
            </main>
          </>
        )}
      </body>
    </html>
  );
}
