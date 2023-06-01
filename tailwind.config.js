/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'dark-blue': 'rgb(0, 0, 15)'
      },
      boxShadow: {
        'custom-yellow': 'rgb(250, 204, 21) 0px 22px 70px 4px',
        'custom-indigo': 'rgb(129, 140, 248) 0px 22px 70px 4px',
        'custom-orange': 'rgb(251, 146, 60) 0px 22px 70px 4px'
      },
      keyframes: {
        colorSwitch: {
          '0%': { boxShadow: 'rgb(250, 204, 21) 0px 0px 70px 10px' },
          '50%': { boxShadow: 'rgb(129, 140, 248) 0px 0px 70px 10px' },
          '100%': { boxShadow: 'rgb(251, 146, 60) 0px 0px 70px 10px' }
        },
        colorSwitchText: {
          '0%': { color: 'rgb(250, 204, 21)' },
          '50%': { color: 'rgb(129, 140, 248)' },
          '100%': { color: 'rgb(251, 146, 60)' }
        },
        colorSwitchButton: {
          '0%': {
            border: '4px solid rgb(250, 204, 21)',
            color: 'rgb(253, 224, 71)',
            boxShadow: 'rgb(250, 204, 21) 0px 0px 70px 10px'
          },
          '50%': {
            border: '4px solid rgb(129, 140, 248)',
            color: 'rgb(129, 140, 248)',
            boxShadow: 'rgb(129, 140, 248) 0px 0px 70px 10px'
          },
          '100%': {
            border: '4px solid rgb(251, 146, 60)',
            color: 'rgb(251, 146, 60)',
            boxShadow: 'rgb(251, 146, 60) 0px 0px 70px 10px'
          }
        },
        colorSwitchButtonHover: {
          '0%': {
            border: '4px solid rgb(250, 204, 21)',
            backgroundColor: 'rgb(250, 204, 21)',
          },
          '50%': {
            border: '4px solid rgb(129, 140, 248)',
            backgroundColor: 'rgb(129, 140, 248)',
          },
          '100%': {
            border: '4px solid rgb(251, 146, 60)',
            backgroundColor: 'rgb(251, 146, 60)',
          }
        }
      },
      animation: {
        colorSwitch: 'colorSwitch 4s linear infinite alternate',
        colorSwitchText: 'colorSwitchText 4s linear infinite alternate',
        colorSwitchButton: 'colorSwitchButton 4s linear infinite alternate',
        colorSwitchButtonHover: 'colorSwitchButtonHover 4s linear infinite alternate'
      }
    },
  },
  plugins: [],
}
