/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    corePlugins: {
        // preflight: false,
    },
    important: '#root',
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#1A754A',
                    'base-100': '#ffffff',
                    'base-200': '#F7F7F7',
                    'base-300': '#303030 ',
                },
            },
        ],
    },
}