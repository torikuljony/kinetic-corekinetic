# Kinetic — Build What Comes Next

An original cinematic landing page built with Next.js, TypeScript, React Three Fiber, Three.js, GSAP ScrollTrigger, Lenis, and Tailwind CSS. Its central energy core is made from procedural geometry; it does not need an external model file.

## Run locally

1. Install Node.js 20.9 or newer.
2. Open this folder in VS Code.
3. Run `npm install`, then `npm run dev`.
4. Open the local address printed by Next.js.

For a production check, use `npm run build` and `npm start`.

## How the experience works

- `src/components/3d/MainObject.tsx` constructs the Earth-inspired globe, blue ocean, procedural continent map, thin atmosphere, luminous inner core, intersecting rings, and mechanical nodes from reusable Three.js geometries and a generated CanvasTexture. No external model or image file is needed. A very slow idle drift keeps the object alive when scrolling stops.
- `src/components/3d/Scene.tsx` owns the Canvas, lights, fog, particles, and a GSAP timeline. ScrollTrigger scrubs object position, scale, rotation, and camera distance across the 500vh experience. Scrolling upward reverses the same timeline.
- `src/components/SmoothScroll.tsx` runs Lenis on GSAP's animation ticker and forwards Lenis scroll updates to ScrollTrigger. Cleanup removes listeners, tickers, Lenis, and triggers.
- `src/app/page.tsx` contains the semantic content sections. `src/app/globals.css` handles layout, typography, responsive treatment, and reduced-motion preferences.

## Customize it

- **Object design:** edit the procedural map colors/shapes, geometries, materials, rings, and node count in `src/components/3d/MainObject.tsx`.
- **Scroll choreography:** edit the ordered `.to(...)` steps in the `gsap.timeline` in `src/components/3d/Scene.tsx`. Timeline positions use normalized progress from `0` to `1`.
- **Scroll length:** update the section `top` positions and `.experience` height in `src/app/globals.css` together. The current five 100vh panels make a 500vh story.
- **Content:** update the sections and feature data in `src/app/page.tsx`.
- **Look and feel:** change the CSS variables at the top of `src/app/globals.css`.

The Canvas caps device pixel ratio at 1.6 and reduces the particle count on narrow screens. The scene stays rendered on mobile.
