/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            xs: "375px",
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1280px",
            xxl: "1440px",
        },
    },
    plugins: [],
};
