import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hook for creating scroll-triggered animations
export const useScrollAnimation = (
  animationCallback: (element: HTMLElement, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
  dependencies: unknown[] = []
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const result = animationCallback(element, gsap);
      if (result) {
        animationRef.current = result;
      }
    }, element);

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return elementRef;
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
};

// Hook for reveal animations on scroll
export const useReveal = (
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    y = 60,
    opacity = 0,
    duration = 1.2,
    delay = 0,
    stagger = 0.1,
    start = 'top 85%',
    end = 'top 20%',
    scrub = false,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          y,
          opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start,
            end,
            scrub,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [y, opacity, duration, delay, stagger, start, end, scrub]);

  return containerRef;
};

// Hook for split text animation
export const useSplitText = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const text = element.textContent || '';
    const chars = text.split('');
    element.innerHTML = chars
      .map((char) =>
        char === ' '
          ? '<span class="inline-block">&nbsp;</span>'
          : `<span class="inline-block overflow-hidden"><span class="char-inner inline-block">${char}</span></span>`
      )
      .join('');

    const charInners = element.querySelectorAll('.char-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charInners,
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, []);

  return textRef;
};

// Hook for magnetic button effect
export const useMagnetic = (strength: number = 0.3) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return buttonRef;
};

// Hook for horizontal scroll section
export const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;
    if (!container || !scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -(scrollWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth - viewportWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return { containerRef, scrollRef };
};

// Hook for image reveal animation
export const useImageReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        container,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
        }
      ).fromTo(
        image,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
        },
        0
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return { containerRef, imageRef };
};

export default useScrollAnimation;
