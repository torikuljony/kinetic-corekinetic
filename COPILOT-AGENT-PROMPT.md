# Copilot Agent prompt (copy and paste)

```text
You are a senior creative frontend engineer. Build a complete, production-quality, original cinematic website in the currently open VS Code project. The user wants the full working experience, not a mockup or UI-only result.

Communication: Give brief progress updates in Bangla/Banglish. Keep all code, package names, technical explanations, and implementation notes in English. Before editing, inspect the existing files, scripts, dependencies, and project conventions. Preserve unrelated work. Reuse installed packages; add only missing dependencies. Do not replace the project wholesale or copy an existing website.

CONCEPT
Create a premium dark technology studio experience centered on one original procedural 3D “kinetic core.” The visual direction is minimal, cinematic, precise, and high-end: near-black (#03040A), deep navy (#070B14), restrained mint (#7CFFCB) and blue (#6EA8FF), off-white text, and muted blue-gray. Use an original layout, brand, copy treatment, object design, and animation.

STACK
Use the project's existing framework if it is already Next.js. Otherwise use Next.js + TypeScript + React. Implement the 3D scene with Three.js, React Three Fiber, and @react-three/drei as appropriate. Integrate GSAP ScrollTrigger with Lenis using one RAF/ticker loop. Use the project's styling system; Tailwind is acceptable if already configured, but do not introduce it solely for convention. Keep scene, content sections, navigation, scroll setup, and reusable UI separated into focused files.

EXPERIENCE AND CONTENT
Create five full-screen story beats across roughly 400–500vh:
1. Hero: “Build What Comes Next.” Supporting line: “An immersive digital experience powered by technology, motion, and intelligent systems.” CTAs “Explore Experience” and “View Project.” Minimal navigation: logo, Work, Technology, About, Contact.
2. Story: “Technology, in motion.” Brief supporting copy, composed around the object without obscuring it.
3. Technology: 3–4 restrained glass-like cards for Real-time 3D, Interactive Motion, WebGL Rendering, and Adaptive Systems.
4. Showcase: make the object the focus, with labels 01 / CORE, 02 / SYSTEM, 03 / MOTION, 04 / FUTURE.
5. Final CTA: “Ready to build the future?” supporting text and “Start Building.”

3D OBJECT AND MOTION
Build an impressive non-sphere centerpiece from procedural geometry where practical: metallic outer form, luminous internal core, intersecting mechanical rings, small floating details, emissive accents, and subtle surrounding particles. Use physically convincing materials and cinematic key, fill, and rim lighting, plus subtle fog/vignette. Do not depend on a large GLB or use fake loading UI.

The scroll is the primary animation control. Use a GSAP timeline with ScrollTrigger scrub so slow/fast scroll directly controls the scene and upward scrolling reverses it. Animate object position, rotation, scale, and camera distance/perspective through the sections, with smooth interpolated transitions. Give the object a deliberately subtle idle motion only; it must settle visually when scrolling stops. Labels and copy should enter in step with the scroll when useful. Use a sticky/pinned scene and avoid multiple competing scroll systems.

PERFORMANCE, ACCESSIBILITY, RESPONSIVENESS
Cap device pixel ratio, reduce particle density on mobile, avoid React state updates per frame, use refs for frame-driven values, clean up GSAP triggers/listeners/Three resources, and lazy-load the WebGL scene if appropriate. Keep the 3D object visible and attractive on mobile; adapt camera, size, typography, and spacing instead of hiding it. Use semantic landmarks, keyboard-accessible links/buttons, visible focus, appropriate contrast, and honor prefers-reduced-motion. Avoid hydration errors and console errors.

WORKFLOW AND COMPLETION
1. Inspect the existing project and report its framework/dependency situation briefly.
2. Implement the complete experience using its conventions and preserve unrelated files.
3. Run the available production build/type checks (and relevant existing tests if present); fix all errors caused by the implementation.
4. Report files changed, packages added, how the procedural scene works, how the scroll timeline is customized, and exact run commands. If blocked by an unavailable package/network or existing project issue, state the precise blocker and leave the project in a useful state.

Do not stop after the static page. The deliverable is a working, responsive website whose 3D scene is genuinely controlled by scroll.
```
