import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionHome() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text, i) => {
        gsap.fromTo(text,
          { 
            opacity: 0, 
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[200vh] w-full flex flex-col items-center justify-start py-40 px-6"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center max-w-4xl mx-auto text-center gap-16 md:gap-24">
        
        <div ref={addToRefs} className="glass-card px-8 py-6 rounded-[2rem]">
          <p className="text-2xl md:text-4xl font-light text-softwhite">
            I've realized something.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-8 py-6 rounded-[2rem]">
          <p className="text-2xl md:text-4xl font-light text-softwhite">
            Home isn't always a place.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-8 py-6 rounded-[2rem]">
          <p className="text-2xl md:text-4xl font-light text-softwhite">
            Sometimes...
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-10 py-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(74,125,255,0.15)]">
          <p className="text-4xl md:text-6xl font-serif text-glow-aurora italic">
            it's a person.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-8 py-6 rounded-[2rem] mt-20">
          <p className="text-2xl md:text-4xl font-light text-softwhite">
            And for me...
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-10 py-12 flex flex-col gap-6 rounded-[2rem] shadow-[0_8px_32px_0_rgba(245,199,106,0.15)]">
          <p className="text-2xl md:text-4xl font-light text-softwhite">
            you being with me is the defintion of Home.
          </p>
          <p className="text-4xl md:text-7xl font-serif text-glow-gold italic mt-4">
            just having you is enough for me.
          </p>
        </div>

      </div>
    </section>
  );
}
