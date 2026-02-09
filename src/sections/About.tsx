import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Clock, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: '25+', label: 'Years of Excellence' },
  { icon: Users, value: '50K+', label: 'Happy Guests' },
  { icon: Clock, value: '24/7', label: 'Concierge Service' },
  { icon: Star, value: '5.0', label: 'Guest Rating' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const statsContainer = statsRef.current;
    const decor = decorRef.current;

    if (!section || !imageContainer || !image || !content || !statsContainer || !decor) return;

    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageContainer,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image scale animation
      gsap.fromTo(
        image,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on image
      gsap.to(image, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content reveal
      const contentElements = content.querySelectorAll('.reveal-item');
      gsap.fromTo(
        contentElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statItems = statsContainer.querySelectorAll('.stat-item');
      gsap.fromTo(
        statItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsContainer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative elements
      gsap.fromTo(
        decor.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 147, 42, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-gold-400/40" />
        <div className="absolute bottom-40 left-10 w-3 h-3 rounded-full bg-gold-400/20" />
        <div className="absolute top-1/2 right-10 w-px h-20 bg-gradient-to-b from-transparent via-gold-400/30 to-transparent" />
      </div>

      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div
              ref={imageContainerRef}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                alt="Luxury Hotel Interior"
                className="w-full h-full object-cover gpu-accelerate"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-midnight-950 border border-gold-400/30 p-6 md:p-8">
                <p className="font-display text-4xl md:text-5xl text-gold-400">25</p>
                <p className="label text-cream-400/60 mt-1">Years of<br />Excellence</p>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold-400/20 -z-10" />
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <p className="reveal-item label text-gold-400 mb-4 tracking-[0.3em]">
              About Us
            </p>
            
            <h2 className="reveal-item heading-md text-cream-50 mb-6">
              A Legacy of<br />
              <span className="text-gradient-gold">Unparalleled Luxury</span>
            </h2>
            
            <div className="reveal-item space-y-4 text-cream-300/80 body-lg mb-8">
              <p>
                Nestled in the heart of paradise, Aether Hotel has been the epitome of 
                luxury hospitality for over two decades. Our commitment to excellence 
                and attention to detail has earned us recognition as one of the world's 
                premier destinations.
              </p>
              <p>
                Every corner of our property tells a story of elegance, from the 
                meticulously designed suites to the world-class dining experiences. 
                We believe that true luxury lies in the details—the subtle touches 
                that transform a stay into an unforgettable journey.
              </p>
            </div>

            <div className="reveal-item flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-gold-400/50" />
              <p className="font-display text-xl text-cream-200 italic">
                "Where dreams meet reality"
              </p>
            </div>

            <a
              href="#experience"
              className="reveal-item inline-flex items-center gap-3 text-gold-400 label group"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">
                Discover Our Story
              </span>
              <span className="w-8 h-px bg-gold-400 group-hover:w-12 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-32 pt-12 border-t border-white/10"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-gold-400/30 rounded-full group-hover:border-gold-400 group-hover:bg-gold-400/10 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-gold-400" />
              </div>
              <p className="font-display text-3xl md:text-4xl text-cream-50 mb-1">
                {stat.value}
              </p>
              <p className="label text-cream-400/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
