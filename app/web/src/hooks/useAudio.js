import { useState, useEffect, useRef } from 'react';

const useAudio = (url) => {
    const audio = useRef(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.current.play() : audio.current.pause();
    }, [playing]);

    useEffect(() => {
        audio.current.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.current.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

export default useAudio;
