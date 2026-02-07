/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                paper: '#FDFBF7', // Warm antique white
                ink: {
                    900: '#1a1515', // Almost black
                    800: '#2c1810', // Deep brown
                    600: '#5d4037', // Muted brown
                },
                crimson: {
                    500: '#A61E26', // Classy deep red 
                    600: '#8B1E24',
                    700: '#601014',
                },
            },
            fontFamily: {
                script: ['"Great Vibes"', 'cursive'],
                hand: ['"Monsieur La Doulaise"', 'cursive'], // New emotional handwritten font
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Outfit"', 'sans-serif'],
            },
            backgroundImage: {
                'grain': "url('https://grainy-gradients.vercel.app/noise.svg')",
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'fade-slow': 'fadeIn 3s ease-in-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
