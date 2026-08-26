import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionImSorry() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      textRefs.current.forEach((text, index) => {
        gsap.fromTo(text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              end: 'bottom 70%',
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
      <div className="max-w-4xl w-full flex flex-col items-center gap-20 text-center z-10">
        
        <div className="glass-card px-16 py-12">
          <h2 
            ref={headingRef}
            className="text-6xl md:text-8xl font-serif text-glow-aurora tracking-wider"
          >
            I'm sorry marieee.
          </h2>
        </div>

        <div className="flex flex-col gap-10 w-full max-w-3xl">
          <div ref={addToRefs} className="glass-card px-8 py-6 w-fit mx-auto">
            <p className="text-xl md:text-3xl font-light text-softwhite">
              you are like the cutest for me, sabse pyaaariii.
            </p>
          </div>
          <div ref={addToRefs} className="glass-card px-8 py-6 w-fit mx-auto">
            <p className="text-xl md:text-3xl font-light text-softwhite">
              i dont want you to stay mad with me.
            </p>
          </div>
          <div ref={addToRefs} className="glass-card px-10 py-8 w-fit mx-auto shadow-[0_8px_32px_0_rgba(140,108,255,0.15)]">
            <p className="text-2xl md:text-4xl font-serif text-glow-purple italic">
              coz i cant live without talking to you even for a momentt.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10 mt-12 w-full max-w-3xl">
          <div ref={addToRefs} className="glass-card px-8 py-6 w-fit mx-auto transform -rotate-1">
            <p className="text-xl md:text-3xl font-light text-softwhite">
              I know an apology doesn't erase what happened.
            </p>
          </div>
          <div ref={addToRefs} className="glass-card px-8 py-6 w-fit mx-auto transform rotate-1">
            <p className="text-xl md:text-3xl font-light text-softwhite">
              But I hope it tells you something important.
            </p>
          </div>
          <div ref={addToRefs} className="glass-card px-12 py-12 w-full mt-6 shadow-[0_8px_32px_0_rgba(245,199,106,0.15)]">
            <p className="text-3xl md:text-5xl font-serif text-glow-gold italic">
              I know I was wrong and yea give me a beating or twoo per maaf krdee.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
