import type { Config } from "vike/types";
import vikePhoton from "vike-photon/config";
import vikeReact from "vike-react/config";

export default {
  title: "Desinvolts",
  description: "The website of the french rock group Desinvolts",

  extends: [vikeReact, vikePhoton],

  photon: {
    server: "../server/entry.ts",
  },

  redirects: {
    "/accueil": "/",
  },

  headHtmlBegin: `
  <script>
    (function() {
      try {
        const savedTheme = localStorage.getItem('colortheme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');

        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      } catch(e) {
        document.documentElement.classList.remove('dark');
      }
    })();
  </script>
  `,

  bodyHtmlBegin: `<svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="grainy">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
        </filter>
      </svg>`,

  passToClient: ["isAdmin", "stateKey", "stateInitProps"],
} satisfies Config;
