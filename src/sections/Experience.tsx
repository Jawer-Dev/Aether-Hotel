import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Wine, Palmtree, Dumbbell, UtensilsCrossed, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: UtensilsCrossed,
    title: 'Michelin Dining',
    description: 'Savor culinary masterpieces crafted by world-renowned chefs using the finest local and international ingredients.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    icon: Waves,
    title: 'Infinity Pool',
    description: 'Float above paradise in our stunning infinity pool, where crystal waters blend seamlessly with the horizon.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
  },
  {
    icon: Sparkles,
    title: 'Luxury Spa',
    description: 'Rejuvenate your senses with ancient healing traditions and modern wellness therapies in our sanctuary.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
  {
    icon: Wine,
    title: 'Private Beach',
    description: 'Escape to your own slice of paradise with exclusive beach access and personalized cabana service.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    description: 'Maintain your wellness routine in our state-of-the-art fitness center with panoramic views.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
  },
  {
    icon: Palmtree,
    title: 'Garden Tours',
    description: 'Explore our lush botanical gardens with guided tours showcasing exotic flora from around the world.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const featured = featuredRef.current;

    if (!section || !header || !grid || !featured) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Featured image parallax
      const featuredImage = featured.querySelector('img');
      if (featuredImage) {
        gsap.fromTo(
          featuredImage,
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: featured,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Featured content reveal
      const featuredContent = featured.querySelector('.featured-content');
      if (featuredContent) {
        gsap.fromTo(
          featuredContent,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featured,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Grid cards animation
      const cards = grid.querySelectorAll('.experience-card');
      cards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0,
            rotateX: isEven ? 10 : -10,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="section-padding mb-16 md:mb-24">
        <div className="max-w-3xl">
          <p className="reveal-item label text-gold-400 mb-4 tracking-[0.3em]">
            Experiences
          </p>
          <h2 className="reveal-item heading-md text-cream-50 mb-6">
            Curated Moments of <span className="text-gradient-gold">Pure Bliss</span>
          </h2>
          <p className="reveal-item body-lg text-cream-300/80">
            Every moment at Aether is designed to enchant. From sunrise yoga to 
            sunset cocktails, discover experiences that will linger in your memory forever.
          </p>
        </div>
      </div>

      {/* Featured Experience */}
      <div ref={featuredRef} className="section-padding mb-20">
        <div className="relative grid lg:grid-cols-2 gap-0 overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80"
              alt="Luxury Spa Experience"
              className="w-full h-full object-cover gpu-accelerate"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight-950/80 lg:to-transparent" />
          </div>

          {/* Content */}
          <div className="featured-content relative bg-midnight-900 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-gold-400/20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-gold-400/20" />
            
            <Sparkles className="w-8 h-8 text-gold-400 mb-6" />
            
            <h3 className="font-display text-3xl md:text-4xl text-cream-50 mb-4">
              The Aether Spa Sanctuary
            </h3>
            
            <p className="text-cream-300/70 leading-relaxed mb-8">
              Immerse yourself in a world of tranquility where ancient healing 
              traditions meet modern luxury. Our award-winning spa offers a 
              sanctuary for the senses, featuring treatments inspired by global 
              wellness practices and performed by master therapists.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="font-display text-2xl text-gold-400">12</p>
                <p className="label text-cream-400/60 mt-1">Treatment Rooms</p>
              </div>
              <div>
                <p className="font-display text-2xl text-gold-400">50+</p>
                <p className="label text-cream-400/60 mt-1">Signature Treatments</p>
              </div>
            </div>
            
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-gold-400 label group w-fit"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">
                Book a Treatment
              </span>
              <span className="w-8 h-px bg-gold-400 group-hover:w-12 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Experience Grid */}
      <div ref={gridRef} className="section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card group relative overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-gold-500/20 backdrop-blur-sm flex items-center justify-center border border-gold-400/30">
                  <exp.icon className="w-5 h-5 text-gold-400" />
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 bg-midnight-900/80 border border-white/5 -mt-20 mx-4 group-hover:border-gold-400/30 transition-all duration-500">
                <h4 className="font-display text-xl text-cream-50 mb-2 group-hover:text-gold-400 transition-colors">
                  {exp.title}
                </h4>
                <p className="text-cream-300/60 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
