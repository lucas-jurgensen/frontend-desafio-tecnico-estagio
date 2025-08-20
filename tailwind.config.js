/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0a58ca",
                "primary-dark": "#0848a3",
                accent: "#ffb703",
                background: "#f8f9fa",
                "text-primary": "#212529",
                "text-secondary": "#6c757d",
                white: "#ffffff",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
