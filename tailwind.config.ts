import type { Config } from 'tailwindcss'

const config: Config = {
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
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
      themes: [
        {
          mytheme: {

 "primary": "#65c3c8",
 "secondary": "#ef9fbc",
 "accent": "#eeaf3a",
 "neutral": "#291334",
 "base-100": "#faf7f5",
 "info": "#3abff8",
 "success": "#36d399",
 "warning": "#fbbd23",
 "error": "#f87272",
            body: {
   "background-color": "#e3e6e6",
            }
          },
        },
      ],
    },
}
export default config
