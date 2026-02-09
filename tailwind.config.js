/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Luxury Hotel Custom Colors
        gold: {
          50: '#fdf9f0',
          100: '#faf0d8',
          200: '#f5e0b0',
          300: '#edc97a',
          400: '#e3ad4a',
          500: '#d4932a',
          600: '#b8761f',
          700: '#935b1a',
          800: '#7a4b1b',
          900: '#663e19',
        },
        cream: {
          50: '#fdfcfb',
          100: '#faf7f2',
          200: '#f5efe6',
          300: '#ede3d3',
          400: '#e3d3b8',
          500: '#d4bc94',
          600: '#b89b6e',
          700: '#967d56',
          800: '#7d6648',
          900: '#66543d',
        },
        midnight: {
          50: '#f4f4f6',
          100: '#e3e4e8',
          200: '#cacbd4',
          300: '#a5a7b6',
          400: '#7a7d93',
          500: '#5f6279',
          600: '#4f5163',
          700: '#434552',
          800: '#3a3c46',
          900: '#1a1b21',
          950: '#0f1014',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: '0 0 40px rgba(212, 147, 42, 0.3)',
        'glow-lg': '0 0 80px rgba(212, 147, 42, 0.4)',
        luxury: '0 25px 80px -20px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 147, 42, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 147, 42, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #d4932a 0%, #f5e0b0 50%, #d4932a 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(15,16,20,0) 0%, rgba(15,16,20,1) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
