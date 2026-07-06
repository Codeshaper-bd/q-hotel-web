import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './app/error.vue'
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        moss: 'rgb(var(--color-moss) / <alpha-value>)',
        copper: 'rgb(var(--color-copper) / <alpha-value>)',
        ocean: 'rgb(var(--color-ocean) / <alpha-value>)',
        night: 'rgb(var(--color-night) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        champagne: 'rgb(var(--color-champagne) / <alpha-value>)',
        olive: 'rgb(var(--color-olive) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif']
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)'
      },
      transitionTimingFunction: {
        premium: 'var(--ease-premium)'
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)'
      }
    }
  },
  plugins: []
}
