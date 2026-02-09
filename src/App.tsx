import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navigation from './components/Navigation';
import CustomCursor from './components/animations/CustomCursor';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Suites from './sections/Suites';
import Experience from './sections/Experience';
import Dining from './sections/Dining';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll progress indicator
    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gold-500 z-[100] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        <Hero />
        <About />
        <Suites />
        <Experience />
        <Dining />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
