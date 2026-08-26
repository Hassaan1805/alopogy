import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionWhatYouMean() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(item,
          { 
            opacity: 0, 
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 px-6"
    >
      <div className="relative z-10 max-w-4xl w-full flex flex-col gap-20 text-center">
        
        <div ref={addToRefs} className="glass-card px-10 py-10 w-fit mx-auto transform -rotate-1">
          <p className="text-2xl md:text-4xl font-light text-softwhite leading-relaxed">
            with you, i dont have to worry about being in an impression.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-10 py-10 w-fit mx-auto transform rotate-1">
          <p className="text-2xl md:text-4xl font-light text-softwhite leading-relaxed">
            You make ordinary days feel lighter.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-10 py-10 w-fit mx-auto transform -rotate-1">
          <p className="text-2xl md:text-4xl font-light text-softwhite leading-relaxed">
            You've been there during moments you probably don't even remember.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-10 py-10 w-fit mx-auto transform rotate-1">
          <p className="text-2xl md:text-4xl font-light text-softwhite leading-relaxed">
            You've mattered in ways words never properly captured.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-10 py-16 flex flex-col gap-8 mt-12 w-full shadow-[0_8px_32px_0_rgba(140,108,255,0.15)]">
          <p className="text-3xl md:text-5xl font-serif text-glow-aurora italic">
            You've become part of my normal.
          </p>
          <p className="text-xl md:text-3xl font-light text-gray-400">
            Toh daant mujhe, also i wont do that againnn, pakkaaa 
          </p>
        </div>
      </div>
    </section>
  );
}
