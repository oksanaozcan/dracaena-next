import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',     
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'beige': {
          100: '#FFFAF2',
          200: '#E7E3D9',
          300: '#EADAC4', 
          400: '#99452D',
        },
        'olive': {
          100: '#A9AE9A',
        },
        'custom-green': '#134A21',
        'footer-green': '#5E6846',
        'gold': '#DEBE48',
        'orange': '#F08849',
        'custom-blue': {
          100: '#9CADB4',
          200: '#1E424A',
        },
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')   
  ],
}
export default config
