import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Alexandra Mitchell',
    role: 'Fashion Designer',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote: 'Aether Hotel redefined my understanding of luxury. From the moment I arrived, every detail was meticulously curated. The Presidential Suite was beyond magnificent, and the staff anticipated my every need.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Worthington',
    role: 'Tech Entrepreneur',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    quote: 'I have stayed at the finest hotels around the world, but Aether stands in a class of its own. The attention to detail, the impeccable service, and the breathtaking views created an experience I will never forget.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sofia Laurent',
    role: 'Art Curator',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    quote: 'The spa sanctuary at Aether is truly transformative. I arrived stressed and left completely renewed. The therapists are masters of their craft, and the ambiance is pure serenity.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'Investment Banker',
    location: 'Singapore',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    quote: 'Celeste restaurant alone is worth the trip. The tasting menu was a culinary masterpiece, and the wine pairing was exceptional. Aether has set a new standard for luxury hospitality.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const slider = sliderRef.current;

    if (!section || !header || !slider) return;

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

      // Slider reveal
      gsap.fromTo(
        slider,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: slider,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const navigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % testimonials.length
      : (activeIndex - 1 + testimonials.length) % testimonials.length;
    
    setActiveIndex(newIndex);
  };

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      navigate('next');
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 147, 42, 0.5) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="section-padding mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="reveal-item label text-gold-400 mb-4 tracking-[0.3em]">
              Testimonials
            </p>
            <h2 className="reveal-item heading-md text-cream-50 mb-6">
              Stories from Our <span className="text-gradient-gold">Guests</span>
            </h2>
          </div>
        </div>

        {/* Testimonial Slider */}
        <div ref={sliderRef} className="section-padding">
          <div className="relative max-w-5xl mx-auto">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-0 md:left-12 opacity-10">
              <Quote className="w-24 h-24 md:w-32 md:h-32 text-gold-400" />
            </div>

            {/* Slider Content */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4 md:px-12"
                  >
                    <div className="text-center">
                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-cream-100 leading-relaxed mb-12">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-gold-400/30">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-display text-xl text-cream-50">
                          {testimonial.name}
                        </p>
                        <p className="text-cream-400/60 text-sm mt-1">
                          {testimonial.role}, {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={() => navigate('prev')}
                className="w-12 h-12 border border-cream-200/20 flex items-center justify-center hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-cream-100" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 h-2 bg-gold-400'
                        : 'w-2 h-2 bg-cream-400/30 hover:bg-cream-400/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate('next')}
                className="w-12 h-12 border border-cream-200/20 flex items-center justify-center hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-cream-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
