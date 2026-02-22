import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "selector",
  // in version 4 there is no need to do that
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 400px)" },
        overShort: { raw: "(max-height: 280px)" },
      },
      animation: {
        headshake: "headshake 0.5s ease-in-out",
      },
      keyframes: {
        headshake: {
          "0%": { transform: "translateX(0) rotate(0)" },
          "15%": { transform: "translateX(-3px) rotate(-1deg)" },
          "30%": { transform: "translateX(3px) rotate(1deg)" },
          "45%": { transform: "translateX(-2px) rotate(-0.7deg)" },
          "60%": { transform: "translateX(2px) rotate(0.7deg)" },
          "75%": { transform: "translateX(-1px) rotate(-0.3deg)" },
          "100%": { transform: "translateX(0) rotate(0)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cardcontainer: "var(--cardcontainer)",
        zonecontainer: "var(--zonecontainer)",
        semicontainer: "var(--semicontainer)",
        backdrop: "var(--backdrop)",
        pop: "var(--pop)",
        error: "var(--error)",
        bordersoft: "var(--bordersoft)",
        shadow: "Var(--shadow)",
        ink: {
          400: "var(--ink-400)",
          "gray-400": "var(--ink-gray-400)",
        },
        icon: {
          foreground: "hsl(var(--foreground))",
        },
      },
    },
  },
};
export default config;
