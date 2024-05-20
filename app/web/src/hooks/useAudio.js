import { useEffect, useRef } from "react";

/**
 * Custom hook to manage audio playback based on the theme and sound settings.
 *
 * @param {string} urlLight - The URL of the audio file for the light theme.
 * @param {string} urlDark - The URL of the audio file for the dark theme.
 * @param {string} theme - Current theme setting ('light' or 'dark').
 * @param {boolean} play - Whether the audio should be played or paused.
 * @param {number} volume - Volume level (0.0 to 1.0).
 * @param {boolean} loop - Whether the audio should loop.
 */
const useAudio = (urlLight, urlDark, theme, play, volume, loop = true) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Function to load and play audio
    function loadAndPlay(url) {
      if (!audioRef.current || audioRef.current.src !== url) {
        audioRef.current = new Audio(url);
        audioRef.current.loop = loop; // Set looping based on the loop parameter
        audioRef.current.volume = isFinite(volume) ? volume : 0.5;
      }
      if (play) {
        audioRef.current
          .play()
          .catch((error) => console.error("Playback was prevented:", error));
      }
    }

    // Ensure the audio object is set up correctly based on the theme
    if (theme === "light") {
      loadAndPlay(urlLight);
    } else {
      loadAndPlay(urlDark);
    }

    // Play or pause the audio based on the play flag
    if (!play && audioRef.current) {
      audioRef.current.pause();
    }

    // Cleanup function to pause sound when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [urlLight, urlDark, theme, play, loop]); // Note: `volume` is removed from this useEffect dependencies

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isFinite(volume) ? volume : 0.5; // Safely set the volume
    }
  }, [volume]); // This useEffect only runs when `volume` changes

  return audioRef;
};

export default useAudio;
