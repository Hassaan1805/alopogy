import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionIfICould() {
  const containerRef = useRef(null);
  const wordsRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating particles background effect
      gsap.to('.particle', {
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        rotation: 'random(-45, 45)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 5,
          from: 'random'
        }
      });

      // Staggered reveal for the sentences
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { 
            opacity: 0, 
            y: 30,
            scale: 0.9,
            filter: 'blur(5px)'
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
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
      className="relative min-h-[150vh] w-full flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl w-full flex flex-col gap-40 text-center">
        <div className="glass-card px-10 py-12">
          <h2 
            ref={addToRefs}
            className="text-3xl md:text-5xl font-serif text-glow-aurora tracking-wide"
          >
            pleaseee maan jaa tu toh jaan h merii fr
          </h2>
        </div>

        <div className="flex flex-col gap-12 w-full max-w-2xl mx-auto">
          <div ref={addToRefs} className="glass-card px-8 py-6 transform -rotate-1">
            <p className="text-xl md:text-3xl font-light text-softwhite">
              I'd choose better words next timeeee
            </p>
          </div>
          <div ref={addToRefs} className="glass-card px-8 py-6 transform rotate-1 ml-auto">
            <p className="text-xl md:text-3xl font-light text-softwhite">
              I'd pause.
            </p>
          </div>
          <div ref={addToRefs} className="glass-card px-8 py-6 transform -rotate-2 mr-auto">
            <p className="text-xl md:text-3xl font-light text-softwhite">
              I'd think.
            </p>
          </div>
        </div>

        <div className="glass-card px-10 py-16 shadow-[0_8px_32px_0_rgba(245,199,106,0.15)]">
          <p ref={addToRefs} className="text-3xl md:text-5xl font-serif text-glow-gold italic">
            I'd make sure your words have a value on me.
          </p>
        </div>
      </div>
    </section>
  );
}
