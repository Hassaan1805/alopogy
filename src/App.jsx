import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import CosmicBackground from './components/CosmicBackground';
import AudioPlayer from './components/AudioPlayer';

import LandingScreen from './components/LandingScreen';
import SectionMistake from './components/SectionMistake';
import SectionIfICould from './components/SectionIfICould';
import SectionHome from './components/SectionHome';
import SectionWhatYouMean from './components/SectionWhatYouMean';
import SectionImSorry from './components/SectionImSorry';
import InteractiveSection from './components/InteractiveSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-midnight text-softwhite selection:bg-aurora/30 selection:text-white relative">
      <CustomCursor />
      <CosmicBackground />
      <AudioPlayer />
      
      <div className="relative z-10">
        <LandingScreen />
        <SectionMistake />
        <SectionIfICould />
        <SectionHome />
        <SectionWhatYouMean />
        <SectionImSorry />
        <InteractiveSection />
        <Footer />
      </div>
    </main>
  );
}

export default App;
