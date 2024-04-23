import { useState, useEffect, useRef } from 'react';
import { useSettings } from "./../components/Utiles/SettingsContext.jsx";

const useAudio = (url) => {
    const audio = useRef(new Audio(url));
    const { sound } = useSettings();  // Accessing sound state from context
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        // Toggle play/pause only if sound is true
        if (sound) {
            setPlaying(prev => !prev);
        }
    };

    useEffect(() => {
        if (sound) {  // Only add event listeners and play/pause if sound is true
            const onEnded = () => setPlaying(false);  // Handler when playback ends
            audio.current.addEventListener('ended', onEnded);

            // Control playback based on 'playing' state.
            playing ? audio.current.play() : audio.current.pause();

            // Cleanup to remove event listener
            return () => {
                audio.current.removeEventListener('ended', onEnded);
            };
        } else {
            // Explicitly pause and cleanup if sound is false
            audio.current.pause();
            audio.current.removeEventListener('ended', () => setPlaying(false));
        }
    }, [playing, sound]);  // Depend on both 'playing' and 'sound' to react to changes immediately

    return [playing, toggle];
};

export default useAudio;
