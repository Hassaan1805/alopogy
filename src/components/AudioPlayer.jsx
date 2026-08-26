import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create an audio element, loop it. We use the uploaded song file.
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Medium volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center rounded-full glass-card hover:scale-110 transition-transform duration-300"
        aria-label="Toggle ambient sound"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-aurora drop-shadow-[0_0_5px_rgba(74,125,255,0.8)]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-500" />
        )}
      </button>
    </div>
  );
}
