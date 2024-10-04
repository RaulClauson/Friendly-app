import { useEffect, useRef, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { BsPauseFill } from "react-icons/bs";
import { BsFillSkipEndFill } from "react-icons/bs";
import { BsFillSkipStartFill } from "react-icons/bs";
import { PiShuffleBold } from "react-icons/pi";
import { TbArrowsRight } from "react-icons/tb";
import { IoIosVolumeLow } from "react-icons/io";
import { IoIosVolumeMute } from "react-icons/io";

import './YoutubePlayer.css';

// YouTube Player API Types
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  playlistId: string;
}

const YouTubePlayer = ({ playlistId }: YouTubePlayerProps) => {
  const playerRef = useRef<YT.Player | null>(null);
  const [volume, setVolume] = useState<number>(50); // Default volume at 50%
  const [prevVolume, setPrevVolume] = useState<number>(50); // To store the previous volume
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Track if the player is playing
  const [isShuffled, setIsShuffled] = useState<boolean>(false); // Track shuffle state
  const [currentTime, setCurrentTime] = useState<number>(0); // Current time of the song
  const [duration, setDuration] = useState<number>(0); // Duration of the song
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>(""); // Current video title
  const [currentVideoArtist, setCurrentVideoArtist] = useState<string>(""); // Current video artist
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(""); // Video thumbnail URL

  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window !== "undefined") {
      const loadYouTubeAPI = () => {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);

        script.onload = () => {
          window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("player", {
              height: "0", // Hide the video portion
              width: "0", // Hide the video portion
              playerVars: {
                listType: "playlist",
                list: playlistId, // YouTube Playlist ID
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                rel: 0,
              },
              events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
              },
            });
          };
        };
      };

      loadYouTubeAPI();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [playlistId]);

  // This useEffect will run the time update function every second when the song is playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        setCurrentTime(currentTime);
        setDuration(duration);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval when unmounted
  }, [isPlaying]);

  const onPlayerReady = (event: YT.PlayerEvent) => {
    console.log("Player Ready");
    // Set initial volume when the player is ready
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
      updateVideoInfo(); // Update the thumbnail and video details when player is ready
    }
  };

  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    // Check if the player is playing or paused and update state accordingly
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      updateVideoInfo(); // Update video info when the video starts playing
    } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
    }
  };

  const updateVideoInfo = () => {
    if (playerRef.current) {
      const videoData = playerRef.current.getVideoData();
      setCurrentVideoTitle(videoData.title);
      setCurrentVideoArtist(videoData.author);

      // Update the thumbnail URL (default thumbnail size 0)
      const videoId = videoData.video_id;
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/0.jpg`);
    }
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying); // Toggle the play/pause state
    }
  };

  const nextVideo = () => {
    if (playerRef.current) {
      playerRef.current.nextVideo();
      updateVideoInfo(); // Update video info when going to the next video
    }
  };

  const previousVideo = () => {
    if (playerRef.current) {
      playerRef.current.previousVideo();
      updateVideoInfo(); // Update video info when going to the previous video
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume); // Set the YouTube player's volume
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(event.target.value, 10);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime); // Seek to the new time in the video
    }
  };

  const toggleShuffle = () => {
    if (playerRef.current) {
      const shuffleState = !isShuffled;
      playerRef.current.setShuffle(shuffleState ? 1 : 0); // Enable or disable shuffle
      setIsShuffled(shuffleState); // Update shuffle state
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (volume > 0) {
        setPrevVolume(volume); // Store current volume
        setVolume(0); // Mute
        playerRef.current.setVolume(0);
      } else {
        setVolume(prevVolume); // Restore previous volume
        playerRef.current.setVolume(prevVolume);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  return (
    <div className="YoutubePlayer">
      {/* Hidden player */}
      <div id="player" style={{ display: 'none' }}></div>

      {/* Display current video thumbnail */}
      <div className="thumbnail">
        {thumbnailUrl && <img src={thumbnailUrl} alt="Video Thumbnail" className="thumbnail_img" />}
      </div>
      <div className="musicinfo">
        <h2>{currentVideoTitle}</h2>
        <p>{currentVideoArtist}</p>
      </div>

      {/* Playback controls */}
      <div className="music_controls">
        <div className="music_time">
          <div className="controls">
            <button onClick={toggleShuffle}>
              {isShuffled ? <PiShuffleBold /> : <TbArrowsRight />}
            </button>
            <button onClick={previousVideo}><BsFillSkipStartFill /></button>
            <button onClick={togglePlayPause}>
              {isPlaying ? <BsPauseFill /> : <IoPlay />}
            </button>
            <button onClick={nextVideo}><BsFillSkipEndFill /></button>
          </div>

          {/* Time slider */}
          <div className="music_time_2">
            <div>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="wrapper2">
              <input
                className="slide_time"
                type="range"
                min="0"
                max={Math.floor(duration)}
                value={Math.floor(currentTime)}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>

        {/* Volume control */}
        <div className="music_volume">
          <div className="wrapper">
            <input
              className="slide_volume"
              id="volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <button onClick={toggleMute}>
            {volume === 0 ? <IoIosVolumeMute size={18}/> : <IoIosVolumeLow size={18}/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
