import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function FinalScene({ onComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textContainerRef = useRef(null);
  const finalMessageRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // 1. Initial fade in of the overlay
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        initStarAnimation();
      }
    });

    const initStarAnimation = () => {
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

      // Create an offscreen canvas to draw "Maria" and get pixel data
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      
      offCtx.fillStyle = 'white';
      offCtx.font = 'bold 15vw "Outfit", sans-serif'; // Use huge font
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText('Maria', width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const targetPoints = [];

      // Sample pixels to create target points for stars
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha > 128) {
            targetPoints.push({ x, y });
          }
        }
      }

      // Shuffle target points
      targetPoints.sort(() => Math.random() - 0.5);

      const stars = [];
      const numStars = Math.min(targetPoints.length, 2000); // Max 2000 stars for performance

      for (let i = 0; i < numStars; i++) {
        const target = targetPoints[i];
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          startX: Math.random() * width,
          startY: Math.random() * height,
          targetX: target.x,
          targetY: target.y,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.8 ? '#4A7DFF' : Math.random() > 0.5 ? '#F5C76A' : '#F5F5F5',
          progress: 0,
          delay: Math.random() * 2,
          scattered: false,
          vx: 0,
          vy: 0
        });
      }

      let animationFrame;
      let phase = 'forming'; // forming, holding, scattering
      let time = 0;

      // Animate progress with GSAP to control the flow
      const tl = gsap.timeline();
      
      tl.to({ p: 0 }, {
        p: 1,
        duration: 4,
        ease: 'power3.inOut',
        onUpdate: function() {
          const p = this.targets()[0].p;
          stars.forEach(star => {
            star.progress = Math.max(0, Math.min(1, p * 1.5 - star.delay * 0.2));
            // easeInOutCubic
            const easeP = star.progress < 0.5 ? 4 * star.progress * star.progress * star.progress : 1 - Math.pow(-2 * star.progress + 2, 3) / 2;
            star.x = star.startX + (star.targetX - star.startX) * easeP;
            star.y = star.startY + (star.targetY - star.startY) * easeP;
          });
        }
      })
      .to({}, { duration: 2, onComplete: () => { phase = 'holding'; } }) // Hold shape for 2 seconds
      .to({}, { duration: 0.5, onComplete: () => { 
        phase = 'scattering';
        // Assign explosion velocities
        stars.forEach(star => {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 15 + 5;
          star.vx = Math.cos(angle) * speed;
          star.vy = Math.sin(angle) * speed;
          star.scattered = true;
        });
        
        // Show the final text after scattering starts
        setShowText(true);
      }})
      .to({}, { duration: 1, onComplete: () => {
         // Final text sequence
         gsap.to(finalMessageRef.current, { opacity: 1, duration: 3, ease: 'power2.inOut' });
      }});

      const render = () => {
        ctx.fillStyle = 'rgba(7, 11, 20, 0.2)'; // Cosmic Navy trail
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
          if (phase === 'scattering' && star.scattered) {
            star.x += star.vx;
            star.y += star.vy;
            star.vx *= 0.95; // friction
            star.vy *= 0.95;
            star.size *= 0.98; // shrink
          }

          if (star.size > 0.1) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
            
            // Add glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = star.color;
          }
        });

        animationFrame = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener('resize', setSize);
        cancelAnimationFrame(animationFrame);
        tl.kill();
      };
    };
  }, []);

  useEffect(() => {
    if (showText && textContainerRef.current) {
      const tl = gsap.timeline();
      const texts = textContainerRef.current.children;
      
      tl.to(texts[0], { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' })
        .to(texts[1], { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 0.5 })
        .to(texts[2], { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 0.5 });
    }
  }, [showText]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-midnight opacity-0 flex flex-col items-center justify-center pointer-events-auto"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {showText && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
          <div ref={textContainerRef} className="max-w-2xl flex flex-col gap-8">
            <p className="opacity-0 translate-y-5 text-2xl md:text-4xl font-light text-softwhite leading-relaxed drop-shadow-md">
              Aisee gussa nhi krte yaaar, sorryyyy.
            </p>
            <p className="opacity-0 translate-y-5 text-2xl md:text-4xl font-light text-softwhite leading-relaxed drop-shadow-md">
              I just needed you to know...
            </p>
            <p className="opacity-0 translate-y-5 text-3xl md:text-5xl font-serif text-glow-aurora italic mt-4">
              Tere alawa kisi ko ghaans bhi na du, you are everything for me.
            </p>
          </div>

          <div ref={finalMessageRef} className="opacity-0 absolute bottom-20 px-8 py-4 text-center">
            <p className="text-xl md:text-2xl font-light text-softwhite tracking-[0.1em] uppercase mb-10">
              Theek haina daant mujhe...<br/><br/>
              just, don't be mad at me.
            </p>
            <p className="text-3xl md:text-5xl font-serif text-glow-gold italic">
              "Some people become home without ever realizing it."
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
