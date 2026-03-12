## Sudip Bera — Cinematic Tech Portfolio

This is a **React + Vite** portfolio for a **Full‑Stack Engineer, SaaS Architect, and AI Developer**, with a cinematic dark UI and interactive 3D hero built using **@react-three/fiber**, **drei**, **Framer Motion**, and **TailwindCSS**.

### 🧱 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: TailwindCSS + custom CSS design system
- **Animation**: Framer Motion
- **3D / WebGL**: Three.js via @react-three/fiber and @react-three/drei
- **Routing**: React Router

### ✨ Key Features

- **Hero section** with a 2‑column cinematic layout:
  - Left: intro, roles, CTAs, and stats.
  - Right: live 3D **binary search visualization** with transparent background, depth lighting, and subtle motion.
- **Dark, neon SaaS aesthetic** using cyan / purple / blue accent colors.
- Smooth page transitions with Framer Motion and animated scroll‑in sections.
- Glassmorphism cards, glowing accents, and consistent spacing rhythm.

### ▶️ Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Run the dev server**

```bash
npm run dev
```

Then open the printed `localhost` URL in your browser.

3. **Build for production**

```bash
npm run build
```

4. **Preview the production build**

```bash
npm run preview
```

### 🧭 Project Structure (high‑level)

- `src/main.jsx` — App entry, router wiring.
- `src/App.jsx` — Layout shell, global transitions, navbar/footer.
- `src/router.jsx` — Route definitions for Home, About, Projects, Contact.
- `src/pages/Home.jsx` — Cinematic hero and landing content.
- `src/components/HeroAI3D.jsx` — 3D binary search visualization used in the hero.
- `src/index.css` — Global design system (colors, typography, glass, buttons, sections).

### 🎨 Customization Tips

- Update hero content, roles, and stats in `src/pages/Home.jsx`.
- Tweak colors, fonts, and glow intensities in `src/index.css` (design tokens live in the `@theme` block).
- Modify or replace the 3D hero behavior in `src/components/HeroAI3D.jsx`.

### ✅ Production Notes

- All animations are GPU‑friendly (transform/opacity based).
- 3D content is **disabled or simplified on mobile** to preserve performance and battery.
- Transparent Canvas layers sit over the global dark background for a seamless cinematic look.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
