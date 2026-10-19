"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type HeroBackgroundVideoProps = {
  src: string;
  poster: string;
  pauseLabel: string;
  playLabel: string;
};

export function HeroBackgroundVideo({
  src,
  poster,
  pauseLabel,
  playLabel,
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;

      if (preference.matches) {
        video.pause();
      } else {
        void video.play().catch(() => setIsPlaying(false));
      }
    };

    syncPlayback();
    preference.addEventListener("change", syncPlayback);
    return () => preference.removeEventListener("change", syncPlayback);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? pauseLabel : playLabel}
        title={isPlaying ? pauseLabel : playLabel}
        className="absolute bottom-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/40 bg-secondary/55 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-secondary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hidden md:bottom-6 md:right-6"
      >
        {isPlaying ? <Pause aria-hidden="true" size={17} fill="currentColor" /> : <Play aria-hidden="true" size={17} fill="currentColor" />}
      </button>
    </>
  );
}
