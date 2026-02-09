import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Suites', href: '#suites' },
    { name: 'Experience', href: '#experience' },
    { name: 'Dining', href: '#dining' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen && menuRef.current && linksRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          menuRef.current,
          { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
          {
            clipPath: 'circle(150% at calc(100% - 40px) 40px)',
            duration: 0.8,
            ease: 'power3.inOut',
          }
        );

        gsap.fromTo(
          linksRef.current?.children || [],
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            delay: 0.3,
            ease: 'power3.out',
          }
        );
      });

      return () => ctx.revert();
    }
  }, [isMenuOpen]);

  const handleCloseMenu = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => setIsMenuOpen(false),
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleCloseMenu();
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'py-4 bg-midnight-950/80 backdrop-blur-xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="relative z-50"
          >
            <span className="font-display text-2xl md:text-3xl font-light tracking-wide text-cream-100">
              Aether<span className="text-gold-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.slice(1).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative group"
              >
                <span className="label text-cream-300/80 group-hover:text-gold-400 transition-colors duration-300">
                  {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Book Now Button - Desktop */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden lg:block px-6 py-3 border border-gold-400/50 text-gold-400 label hover:bg-gold-400 hover:text-midnight-950 transition-all duration-300"
          >
            Book Now
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden relative z-50 p-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-cream-100" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[100] bg-midnight-950"
          style={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
        >
          <div className="h-full flex flex-col section-padding py-20">
            {/* Close Button */}
            <button
              onClick={handleCloseMenu}
              className="absolute top-6 right-6 p-2"
              aria-label="Close menu"
            >
              <X className="w-8 h-8 text-cream-100" />
            </button>

            {/* Menu Links */}
            <div
              ref={linksRef}
              className="flex-1 flex flex-col justify-center gap-6"
            >
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group flex items-center gap-4"
                >
                  <span className="text-gold-400/60 font-display text-sm">
                    0{index + 1}
                  </span>
                  <span className="font-display text-4xl md:text-5xl font-light text-cream-100 group-hover:text-gold-400 transition-colors duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Footer Info */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-cream-400/60 text-sm">
                <span>hello@aetherhotel.com</span>
                <span>+1 (555) 000-0000</span>
                <span>123 Luxury Lane, Paradise</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
