/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-blue': '#00f3ff',
                'neon-purple': '#bc13fe',
                'dark-bg': '#0a0a0a',
                'glass-white': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
