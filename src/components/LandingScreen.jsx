import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function LandingScreen() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set([text2Ref.current, text3Ref.current, buttonRef.current], { opacity: 0, y: 20 });
    gsap.set(text1Ref.current, { opacity: 0, scale: 0.95 });

    // Animation sequence
    tl.to(text1Ref.current, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.2 })
      .to(text1Ref.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut', delay: 1 })
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      .to(text2Ref.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut', delay: 1 })
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });

    return () => tl.kill();
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6 text-center">
        <div className="glass-card px-12 py-16 flex items-center justify-center w-full max-w-2xl relative h-48">
          <h1 
            ref={text1Ref} 
            className="absolute text-5xl md:text-7xl font-serif text-glow-aurora tracking-wide"
          >
            Marieeeeee...
          </h1>
          <h2 
            ref={text2Ref} 
            className="absolute text-3xl md:text-5xl font-light text-softwhite tracking-wide"
          >
            Dekho tohhh kitti pyaaari hai.
          </h2>
          <h2 
            ref={text3Ref} 
            className="absolute text-4xl md:text-6xl font-serif italic text-glow-gold"
          >
            best human of all time frrr
          </h2>
        </div>

        <button 
          ref={buttonRef}
          onClick={handleScroll}
          className="mt-20 group flex flex-col items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-500 uppercase tracking-[0.3em]"
        >
          <span>Read it</span>
          <ChevronDown className="w-5 h-5 animate-bounce opacity-50 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" />
        </button>
      </div>
    </section>
  );
}
