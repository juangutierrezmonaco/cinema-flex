/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '0',
                sm: '4rem',
                lg: '8rem',
                xl: '9rem',
                '2xl': '11rem'
            }
        },
        screens: {
            'xxs': '475px',

            'xs': '576px',

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'mlg': '960px',

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            screens: {
                '3xl': '1600px',
            },
            fontFamily: {
                sans: ['Albert Sans', 'sans-serif'],
            }
        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                    primary: "#9D0208",
                },
            },
        ],
    },
    plugins: [
        require("daisyui"),
    ],
}