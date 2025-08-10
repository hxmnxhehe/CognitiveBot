import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Enhanced neon colors for meme/doodle aesthetic
        neon: {
          cyan: "hsl(180, 100%, 50%)",
          purple: "hsl(262, 83%, 65%)",
          pink: "hsl(328, 85%, 60%)",
          green: "hsl(120, 100%, 50%)",
          yellow: "hsl(60, 100%, 50%)",
          orange: "hsl(30, 100%, 60%)",
          blue: "hsl(220, 100%, 60%)",
        },
        // Fun doodle colors
        doodle: {
          orange: "hsl(30, 100%, 60%)",
          lime: "hsl(80, 100%, 50%)",
          coral: "hsl(10, 80%, 65%)",
          sky: "hsl(200, 100%, 70%)",
          lavender: "hsl(280, 70%, 80%)",
          mint: "hsl(150, 60%, 70%)",
        }
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Enhanced animations for meme/doodle style
        "slide-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) scale(1)",
          },
        },
        "slide-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(30px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) scale(1)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "33%": {
            transform: "translateY(-10px) rotate(1deg)",
          },
          "66%": {
            transform: "translateY(-5px) rotate(-1deg)",
          },
        },
        "wiggle": {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(-3deg)",
          },
          "75%": {
            transform: "rotate(3deg)",
          },
        },
        "bounce-gentle": {
          "0%, 100%": {
            transform: "translateY(0px)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-15px)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            "box-shadow": "0 0 5px hsl(180, 100%, 50%), 0 0 10px hsl(180, 100%, 50%), 0 0 20px hsl(180, 100%, 50%)",
          },
          "50%": {
            opacity: "0.8",
            "box-shadow": "0 0 10px hsl(180, 100%, 50%), 0 0 20px hsl(180, 100%, 50%), 0 0 40px hsl(180, 100%, 50%)",
          },
        },
        "glow": {
          "0%": {
            "text-shadow": "0 0 5px hsl(180, 100%, 50%), 0 0 10px hsl(180, 100%, 50%)",
          },
          "100%": {
            "text-shadow": "0 0 10px hsl(180, 100%, 50%), 0 0 20px hsl(180, 100%, 50%), 0 0 30px hsl(180, 100%, 50%), 0 0 40px hsl(180, 100%, 50%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Enhanced animations
        "slide-in-up": "slide-in-up 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "float": "float 4s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      // Enhanced spacing for better mobile experience
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Custom box shadows for doodle effects
      boxShadow: {
        'neon': '0 0 5px hsl(180, 100%, 50%), 0 0 10px hsl(180, 100%, 50%), 0 0 20px hsl(180, 100%, 50%)',
        'neon-purple': '0 0 5px hsl(262, 83%, 65%), 0 0 10px hsl(262, 83%, 65%), 0 0 20px hsl(262, 83%, 65%)',
        'neon-pink': '0 0 5px hsl(328, 85%, 60%), 0 0 10px hsl(328, 85%, 60%), 0 0 20px hsl(328, 85%, 60%)',
        'doodle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(168, 85, 247, 0.1)',
        'lift': '0 10px 25px rgba(0, 0, 0, 0.3)',
      },
      // Custom font sizes for better hierarchy
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      // Enhanced backdrop blur options
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    // Custom plugin for doodle utilities
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
        },
        '.border-dashed-thick': {
          borderStyle: 'dashed',
          borderWidth: '3px',
        },
        '.bg-gradient-doodle': {
          background: 'linear-gradient(135deg, hsl(180, 100%, 50%) 0%, hsl(262, 83%, 65%) 50%, hsl(328, 85%, 60%) 100%)',
        },
        '.bg-gradient-fun': {
          background: 'linear-gradient(45deg, hsl(30, 100%, 60%) 0%, hsl(80, 100%, 50%) 25%, hsl(200, 100%, 70%) 50%, hsl(280, 70%, 80%) 75%, hsl(150, 60%, 70%) 100%)',
        },
      }
      addUtilities(newUtilities);
    }
  ],
} satisfies Config;