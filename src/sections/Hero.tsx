import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const decor = decorRef.current;

    if (!section || !image || !overlay || !title || !subtitle || !cta || !scrollIndicator || !decor) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([title, subtitle, cta], { opacity: 0, y: 80 });
      gsap.set(image, { scale: 1.4, opacity: 0 });
      gsap.set(overlay, { opacity: 1 });
      gsap.set(scrollIndicator, { opacity: 0, y: 20 });
      gsap.set(decor.children, { scaleX: 0 });

      // Master timeline for entrance
      const masterTl = gsap.timeline({ delay: 0.3 });

      // Image reveal with Ken Burns effect
      masterTl.to(image, {
        scale: 1,
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
      });

      // Overlay fade
      masterTl.to(overlay, {
        opacity: 0.4,
        duration: 1.5,
        ease: 'power2.out',
      }, 0.5);

      // Title animation with split effect
      const titleChars = title.textContent?.split('') || [];
      title.innerHTML = titleChars
        .map((char) =>
          char === ' '
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block overflow-hidden"><span class="title-char inline-block">${char}</span></span>`
        )
        .join('');

      masterTl.fromTo(
        title.querySelectorAll('.title-char'),
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: 'power3.out',
        },
        0.8
      );

      // Subtitle fade in
      masterTl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, 1.4);

      // CTA buttons
      masterTl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, 1.6);

      // Decorative lines
      masterTl.to(decor.children, {
        scaleX: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.inOut',
      }, 1.2);

      // Scroll indicator
      masterTl.to(scrollIndicator, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 2);

      // Continuous scroll indicator animation
      gsap.to(scrollIndicator.querySelector('.scroll-arrow'), {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut',
      });

      // Parallax on scroll
      gsap.to(image, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Title fade out on scroll
      gsap.to(title, {
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      // Subtitle and CTA fade out
      gsap.to([subtitle, cta], {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full gpu-accelerate"
      >
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Luxury Hotel"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-midnight-950/60 via-midnight-950/30 to-midnight-950"
      />

      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent origin-top" />
        <div className="absolute top-1/3 right-8 w-px h-48 bg-gradient-to-b from-transparent via-gold-400/30 to-transparent origin-top" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-px bg-gradient-to-r from-gold-400/50 to-transparent origin-left" />
        <div className="absolute top-1/3 right-1/4 w-32 h-px bg-gradient-to-l from-gold-400/30 to-transparent origin-right" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center section-padding">
        <div className="text-center max-w-5xl mx-auto">
          {/* Label */}
          <p className="label text-gold-400 mb-6 tracking-[0.4em]">
            Welcome to Paradise
          </p>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="heading-xl font-display text-cream-50 mb-8 will-change-transform"
          >
            Aether Hotel
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="body-lg text-cream-200/80 max-w-2xl mx-auto mb-12 will-change-transform"
          >
            Experience unparalleled luxury in the heart of paradise. 
            Where every moment becomes an unforgettable memory.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 will-change-transform">
            <a
              href="#suites"
              className="group relative px-8 py-4 bg-gold-500 text-midnight-950 font-medium tracking-wide overflow-hidden transition-all duration-500 hover:shadow-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Suites
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-cream-200/30 text-cream-100 font-medium tracking-wide hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
            >
              Book Your Stay
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <span className="label text-cream-400/60 text-[10px]">Scroll</span>
        <div className="scroll-arrow">
          <ChevronDown className="w-5 h-5 text-gold-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
