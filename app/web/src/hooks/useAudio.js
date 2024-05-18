import { useState, useEffect, useRef } from 'react';
import { useSettings } from "../components/Utiles/SettingsContext.jsx";

/**
 * Custom hook to manage audio playback.
 * @param {string|string[]} urls - The URL or URLs of the audio files to be managed.
 * @returns {[boolean[], Function]} - Array of playing states and a toggle function.
 */
const useAudio = (urls) => {
    // Ensure urls is always treated as an array
    const validUrls = Array.isArray(urls) ? urls : [urls];

    // Create an array of audio objects
    const audios = useRef(validUrls.map(url => new Audio(url)));
    const { sound } = useSettings();  // Accessing sound state from context
    const [playing, setPlaying] = useState(validUrls.map(() => false));
    const [ready, setReady] = useState(validUrls.map(() => false));

    useEffect(() => {
        audios.current.forEach((audio, index) => {
            const onLoadedData = () => {
                setReady(prev => prev.map((r, i) => i === index ? true : r));
            };
            const onEnded = () => {
                setPlaying(prev => prev.map((p, i) => i === index ? false : p));
            };

            audio.addEventListener('loadeddata', onLoadedData);
            audio.addEventListener('ended', onEnded);

            return () => {
                audio.removeEventListener('loadeddata', onLoadedData);
                audio.removeEventListener('ended', onEnded);
            };
        });
    }, []);

    /**
     * Toggles the playback state of the audio at the given index.
     * @param {number} index - The index of the audio to toggle.
     */
    const toggle = (index) => {
        if (sound && ready[index]) {
            setPlaying(prev => prev.map((p, i) => i === index ? !p : p));
        }
    };

    useEffect(() => {
        audios.current.forEach((audio, index) => {
            if (playing[index]) {
                audio.play().catch(e => console.error("Error playing audio:", e));
            } else {
                audio.pause();
            }
        });
    }, [playing]);

    return [playing, toggle];
};

export default useAudio;
