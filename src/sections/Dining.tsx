import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const restaurants = [
  {
    name: 'Celeste',
    cuisine: 'Fine Dining',
    description: 'An elevated culinary journey where modern techniques meet timeless flavors. Our flagship restaurant offers a tasting menu that changes with the seasons.',
    chef: 'Executive Chef Marcus Chen',
    hours: '6:00 PM - 11:00 PM',
    location: 'Penthouse Level',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    award: '2 Michelin Stars',
  },
  {
    name: 'Azure',
    cuisine: 'Mediterranean',
    description: 'Fresh seafood and vibrant Mediterranean flavors served against the backdrop of endless ocean views.',
    chef: 'Chef Isabella Romano',
    hours: '12:00 PM - 10:00 PM',
    location: 'Beachfront',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    award: 'Forbes 5-Star',
  },
  {
    name: 'Sakura',
    cuisine: 'Japanese',
    description: 'Authentic Japanese cuisine crafted with precision and artistry. Experience omakase dining at its finest.',
    chef: 'Master Sushi Chef Kenji Tanaka',
    hours: '6:00 PM - 11:30 PM',
    location: 'Garden Wing',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80',
    award: 'James Beard Award',
  },
];

const Dining = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const restaurantsContainer = restaurantsRef.current;

    if (!section || !header || !restaurantsContainer) return;

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

      // Restaurant cards with alternating animation
      const cards = restaurantsContainer.querySelectorAll('.restaurant-card');
      cards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        const image = card.querySelector('.card-image');
        const content = card.querySelector('.card-content');

        // Image reveal
        gsap.fromTo(
          image,
          { 
            clipPath: isEven 
              ? 'inset(0% 100% 0% 0%)' 
              : 'inset(0% 0% 0% 100%)',
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Content reveal
        gsap.fromTo(
          content,
          { x: isEven ? 60 : -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image parallax
        const img = image?.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dining"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />

      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="section-padding mb-16 md:mb-24">
          <div className="text-center max-w-3xl mx-auto">
            <p className="reveal-item label text-gold-400 mb-4 tracking-[0.3em]">
              Culinary Excellence
            </p>
            <h2 className="reveal-item heading-md text-cream-50 mb-6">
              A Feast for the <span className="text-gradient-gold">Senses</span>
            </h2>
            <p className="reveal-item body-lg text-cream-300/80">
              Embark on a gastronomic journey through our world-class restaurants, 
              where every dish tells a story and every meal becomes a memory.
            </p>
          </div>
        </div>

        {/* Restaurants */}
        <div ref={restaurantsRef} className="space-y-20 md:space-y-32">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className={`restaurant-card section-padding grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`card-image relative aspect-[4/3] overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover gpu-accelerate"
                />
                
                {/* Award Badge */}
                <div className="absolute top-4 left-4 bg-midnight-950/90 backdrop-blur-sm px-4 py-2 border border-gold-400/50">
                  <span className="text-gold-400 text-sm font-medium">{restaurant.award}</span>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold-400/30" />
              </div>

              {/* Content */}
              <div
                className={`card-content ${
                  index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''
                }`}
              >
                <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  <span className="label text-gold-400">{restaurant.cuisine}</span>
                  <span className="w-8 h-px bg-gold-400/30" />
                </div>

                <h3 className="font-display text-4xl md:text-5xl text-cream-50 mb-4">
                  {restaurant.name}
                </h3>

                <p className="text-cream-300/70 leading-relaxed mb-6">
                  {restaurant.description}
                </p>

                <p className="text-gold-400/80 text-sm mb-6 italic">
                  {restaurant.chef}
                </p>

                <div className={`flex flex-wrap gap-6 mb-8 text-cream-400/60 text-sm ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.location}</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 border border-gold-400/50 text-gold-400 label hover:bg-gold-400 hover:text-midnight-950 transition-all duration-300 group ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <span>Reserve Table</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dining;
