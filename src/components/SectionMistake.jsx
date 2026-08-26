import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionMistake() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text, index) => {
        gsap.fromTo(text, 
          { 
            opacity: 0, 
            y: 50,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
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
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 px-6"
    >
      <div className="max-w-3xl w-full flex flex-col gap-24 text-center z-10">
        <div ref={addToRefs} className="glass-card px-8 py-10 w-fit self-start">
          <p className="text-2xl md:text-4xl font-light text-softwhite leading-relaxed">
            Yaar wo blade wala na.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-8 py-10 w-fit self-end">
          <p className="text-2xl md:text-4xl font-light text-softwhite leading-relaxed">
            I wasn't careful with my words.
          </p>
        </div>

        <div ref={addToRefs} className="glass-card px-8 py-12 flex flex-col gap-6 w-full shadow-[0_8px_32px_0_rgba(140,108,255,0.15)]">
          <p className="text-2xl md:text-4xl font-light text-softwhite leading-relaxed">
            wo toh bas acha lagta hai jab tu daant ti h mujhee
          </p>
          <p className="text-3xl md:text-5xl font-serif text-glow-aurora italic">
            i would never wanna hurt youu
          </p>
        </div>
      </div>
    </section>
  );
}
