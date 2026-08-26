import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    
    // Set initial position off-screen
    gsap.set([cursor, glow], { xPercent: -50, yPercent: -50, opacity: 0 });

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Quick follow for the core
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
        opacity: 1
      });

      // Slower, trailing follow for the glow
      gsap.to(glow, {
        x: mouseX,
        y: mouseY,
        duration: 0.8,
        ease: 'power3.out',
        opacity: 1
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, glow], { opacity: 0, duration: 0.3 });
    };
    
    const onMouseEnter = () => {
      gsap.to([cursor, glow], { opacity: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(glow, { scale: 1.5, opacity: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(glow, { scale: 1, opacity: 0.5, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    const handleHoverEnter = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(glow, { scale: 2, backgroundColor: '#8C6CFF', opacity: 0.3, duration: 0.3 });
    };
    
    const handleHoverLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(glow, { scale: 1, backgroundColor: '#4A7DFF', opacity: 0.5, duration: 0.3 });
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-aurora/30 blur-[40px] pointer-events-none z-[100] mix-blend-screen"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-softwhite pointer-events-none z-[100] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
