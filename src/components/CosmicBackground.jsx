import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CosmicBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Star properties
    const stars = [];
    const numStars = 400; // Dense star field
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Colors mapping to scroll depth
    const colors = {
      baseR: 7, baseG: 11, baseB: 20, // Midnight
      targetR: 30, targetG: 20, targetB: 40 // Warmer purple/navy
    };
    
    const scrollObj = { progress: 0 };
    
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(scrollObj, { progress: self.progress, duration: 0.5, ease: 'power2.out' });
      }
    });

    let animationFrameId;

    const render = () => {
      // Dynamic background color based on scroll
      const r = colors.baseR + (colors.targetR - colors.baseR) * scrollObj.progress;
      const g = colors.baseG + (colors.targetG - colors.baseG) * scrollObj.progress;
      const b = colors.baseB + (colors.targetB - colors.baseB) * scrollObj.progress;
      
      // Clear with slight trailing effect for smooth movement
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
      ctx.fillRect(0, 0, width, height);

      // Draw Nebula gradients
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * (0.2 + scrollObj.progress * 0.5), 0,
        width * 0.5, height * (0.2 + scrollObj.progress * 0.5), width * 0.8
      );
      gradient.addColorStop(0, `rgba(74, 125, 255, ${0.05 + scrollObj.progress * 0.05})`); // Aurora Blue
      gradient.addColorStop(0.5, `rgba(140, 108, 255, ${0.03 + scrollObj.progress * 0.04})`); // Soft Purple
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      stars.forEach(star => {
        // Movement
        star.x += star.vx;
        star.y += star.vy - (scrollObj.progress * 0.5); // Slight parallax upward on scroll

        // Wrap around
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.twinkleSpeed *= -1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Warmer stars as we scroll down
        if (Math.random() > 0.9) {
           ctx.fillStyle = `rgba(245, 199, 106, ${Math.abs(star.alpha)})`; // Warm gold
        } else {
           ctx.fillStyle = `rgba(245, 245, 245, ${Math.abs(star.alpha)})`; // Soft white
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
