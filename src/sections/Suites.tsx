import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, Maximize2, Bed, Bath } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const suites = [
  {
    id: 1,
    name: 'Royal Suite',
    description: 'Experience the pinnacle of luxury in our flagship suite. Featuring panoramic ocean views, a private terrace, and bespoke furnishings.',
    price: '2,500',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    size: '180',
    beds: '1 King',
    baths: '2',
    features: ['Ocean View', 'Private Terrace', 'Butler Service'],
  },
  {
    id: 2,
    name: 'Presidential Suite',
    description: 'An expansive sanctuary of elegance with separate living areas, dining room, and unparalleled city skyline views.',
    price: '4,200',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    size: '320',
    beds: '2 King',
    baths: '3',
    features: ['City View', 'Dining Room', 'Private Elevator'],
  },
  {
    id: 3,
    name: 'Garden Villa',
    description: 'A private oasis surrounded by lush tropical gardens. Features outdoor shower, private pool, and direct beach access.',
    price: '3,800',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    size: '250',
    beds: '1 King',
    baths: '2',
    features: ['Private Pool', 'Garden View', 'Beach Access'],
  },
  {
    id: 4,
    name: 'Sky Penthouse',
    description: 'Perched at the summit, offering 360-degree views. The ultimate expression of modern luxury and sophistication.',
    price: '6,500',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    size: '450',
    beds: '3 King',
    baths: '4',
    features: ['360° View', 'Rooftop Pool', 'Cinema Room'],
  },
];

const Suites = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !header || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // Header reveal
      const headerElements = header.querySelectorAll('.reveal-item');
      gsap.fromTo(
        headerElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger reveal
      const cards = cardsContainer.querySelectorAll('.suite-card');
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCard = (direction: 'prev' | 'next') => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const newIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, suites.length - 1)
      : Math.max(activeIndex - 1, 0);
    
    setActiveIndex(newIndex);
    
    const cardWidth = container.querySelector('.suite-card')?.clientWidth || 0;
    const gap = 32;
    
    gsap.to(container, {
      scrollLeft: newIndex * (cardWidth + gap),
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="suites"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/50 to-midnight-950" />

      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="section-padding mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="reveal-item label text-gold-400 mb-4 tracking-[0.3em]">
                Accommodations
              </p>
              <h2 className="reveal-item heading-md text-cream-50">
                Luxurious <span className="text-gradient-gold">Suites</span>
              </h2>
            </div>
            
            <div className="reveal-item flex items-center gap-4">
              <button
                onClick={() => scrollToCard('prev')}
                disabled={activeIndex === 0}
                className="w-12 h-12 border border-cream-200/20 flex items-center justify-center hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5 text-cream-100" />
              </button>
              <button
                onClick={() => scrollToCard('next')}
                disabled={activeIndex === suites.length - 1}
                className="w-12 h-12 border border-cream-200/20 flex items-center justify-center hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5 text-cream-100" />
              </button>
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={cardsContainerRef}
          className="flex gap-8 overflow-x-auto pb-8 px-6 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 snap-x snap-mandatory no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {suites.map((suite) => (
            <div
              key={suite.id}
              className="suite-card flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[45vw] xl:w-[35vw] group snap-start"
            >
              <div className="relative h-full bg-midnight-900/50 border border-white/5 overflow-hidden hover:border-gold-400/30 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={suite.image}
                    alt={suite.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-midnight-950/80 backdrop-blur-sm px-4 py-2 border border-gold-400/30">
                    <span className="font-display text-xl text-gold-400">${suite.price}</span>
                    <span className="text-cream-400/60 text-sm">/night</span>
                  </div>

                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <Maximize2 className="w-6 h-6 text-midnight-950" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl text-cream-50 mb-3 group-hover:text-gold-400 transition-colors">
                    {suite.name}
                  </h3>
                  
                  <p className="text-cream-300/70 text-sm leading-relaxed mb-6">
                    {suite.description}
                  </p>

                  {/* Room Details */}
                  <div className="flex items-center gap-6 mb-6 text-cream-400/60 text-sm">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4" />
                      <span>{suite.size} m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      <span>{suite.beds}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4" />
                      <span>{suite.baths} Baths</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {suite.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gold-400/10 text-gold-400 text-xs tracking-wide"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-gold-400 label group/btn"
                  >
                    <span className="group-hover/btn:tracking-wider transition-all duration-300">
                      Book Now
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="section-padding mt-8">
          <div className="flex items-center gap-2">
            {suites.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all duration-500 ${
                  index === activeIndex
                    ? 'w-8 bg-gold-400'
                    : 'w-4 bg-cream-400/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suites;
