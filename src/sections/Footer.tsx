import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Facebook, Linkedin, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  explore: [
    { name: 'Suites', href: '#suites' },
    { name: 'Dining', href: '#dining' },
    { name: 'Spa', href: '#experience' },
    { name: 'Experiences', href: '#experience' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Sustainability', href: '#' },
  ],
  support: [
    { name: 'Contact', href: '#contact' },
    { name: 'FAQs', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.reveal-item');
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-midnight-950 border-t border-white/5"
    >
      {/* Main Footer */}
      <div ref={contentRef} className="section-padding py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="reveal-item inline-block mb-6">
              <span className="font-display text-3xl font-light tracking-wide text-cream-100">
                Aether<span className="text-gold-400">.</span>
              </span>
            </a>
            <p className="reveal-item text-cream-300/70 leading-relaxed mb-8 max-w-sm">
              Where luxury meets tranquility. Experience unparalleled hospitality 
              in the heart of paradise.
            </p>
            
            {/* Social Links */}
            <div className="reveal-item flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-cream-400 group-hover:text-gold-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="reveal-item">
            <h4 className="label text-gold-400 mb-6">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cream-300/70 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-item">
            <h4 className="label text-gold-400 mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cream-300/70 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-item">
            <h4 className="label text-gold-400 mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cream-300/70 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-400/50 text-sm">
            © 2024 Aether Hotel. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-cream-400/50 hover:text-gold-400 transition-colors"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 border border-current flex items-center justify-center group-hover:border-gold-400 transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
