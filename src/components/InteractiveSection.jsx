import { useState, useRef } from 'react';
import FinalScene from './FinalScene';

export default function InteractiveSection() {
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef(null);

  const handleClick = () => {
    setIsClicked(true);
    // Lock scroll when starting the final scene
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 px-6"
      >
        {!isClicked && (
          <button 
            onClick={handleClick}
            className="group relative px-10 py-5 rounded-full border border-aurora/30 bg-midnight/50 hover:bg-navy/80 transition-all duration-500 overflow-hidden glass-card shadow-[0_0_20px_rgba(74,125,255,0.2)]"
          >
            <div className="absolute inset-0 bg-aurora/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <span className="relative z-10 text-sm tracking-[0.2em] text-softwhite uppercase">
              One last thing.
            </span>
          </button>
        )}
      </section>

      {isClicked && <FinalScene />}
    </>
  );
}
