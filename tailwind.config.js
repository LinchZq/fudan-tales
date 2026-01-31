/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#ff0055",
                "primary-dark": "#cc0044",
                "background-light": "#f8f5f6",
                "background-dark": "#230f16",
                "surface-dark": "#2f151e",
                "text-dim": "#ce8da3",
            },
            fontFamily: {
                display: ["Noto Sans SC", "Space Grotesk", "sans-serif"],
                mono: ["Space Grotesk", "monospace"],
            },
            backgroundImage: {
                scanlines:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, #000000 3px)",
                noise:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E")',
            },
        },
    },
    plugins: [],
};

