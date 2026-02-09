import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Luxury Lane, Paradise Bay',
    subValue: 'Maldives, 08090',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 000-0000',
    subValue: '+1 (555) 000-0001',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'reservations@aetherhotel.com',
    subValue: 'concierge@aetherhotel.com',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Reservations: 24/7',
    subValue: 'Check-in: 3:00 PM',
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !header || !form || !info) return;

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

      // Form reveal
      gsap.fromTo(
        form,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info cards reveal
      const infoCards = info.querySelectorAll('.info-card');
      gsap.fromTo(
        infoCards,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/50 to-midnight-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="section-padding mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="reveal-item label text-gold-400 mb-4 tracking-[0.3em]">
              Get in Touch
            </p>
            <h2 className="reveal-item heading-md text-cream-50 mb-6">
              Begin Your <span className="text-gradient-gold">Journey</span>
            </h2>
            <p className="reveal-item body-lg text-cream-300/80">
              Let us craft your perfect escape. Reach out to our concierge team 
              and discover the Aether difference.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-midnight-900/80 backdrop-blur-sm border border-white/10 p-8 md:p-12"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-gold-400/30" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gold-400/30" />

              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gold-400 mb-6" />
                  <h3 className="font-display text-2xl text-cream-50 mb-2">
                    Message Sent
                  </h3>
                  <p className="text-cream-300/70">
                    Our concierge will contact you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-cream-50 mb-8">
                    Send Us a Message
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="label text-cream-400/60 mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-midnight-950 border border-white/10 px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="label text-cream-400/60 mb-2 block">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-midnight-950 border border-white/10 px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="label text-cream-400/60 mb-2 block">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-midnight-950 border border-white/10 px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label text-cream-400/60 mb-2 block">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-midnight-950 border border-white/10 px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your perfect stay..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gold-500 text-midnight-950 font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-gold-400 transition-colors group"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Contact Info */}
            <div ref={infoRef} className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="info-card group flex items-start gap-6 p-6 bg-midnight-900/50 border border-white/5 hover:border-gold-400/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gold-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors">
                    <info.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="label text-cream-400/60 mb-1">{info.label}</p>
                    <p className="text-cream-100">{info.value}</p>
                    <p className="text-cream-400/60 text-sm">{info.subValue}</p>
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div className="relative aspect-video bg-midnight-900 border border-white/10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
                  alt="Location Map"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                    <p className="label text-cream-100">View on Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
