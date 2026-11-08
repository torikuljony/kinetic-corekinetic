"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Scene = dynamic(() => import("@/components/3d/Scene").then((mod) => mod.Scene), { ssr: false });

const features = [
  { number: "01", title: "Real-time 3D", text: "Procedural forms rendered with precision, right in the browser." },
  { number: "02", title: "Interactive motion", text: "Every movement responds to your hand on the page." },
  { number: "03", title: "WebGL rendering", text: "Light, material and depth combine into a living system." },
  { number: "04", title: "Adaptive systems", text: "A flexible foundation that feels at home on every screen." },
];

function Progress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max : 0); };
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="progress-track" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}

export default function Home() {
  return <main className="min-h-screen">
    <Progress />
    <header className="nav"><a href="#top" className="brand" aria-label="Kinetic home"><span className="brand-mark">K</span><span>KINETIC<span className="brand-dot">.</span></span></a><nav aria-label="Main navigation"><a href="#story">Work</a><a href="#technology">Technology</a><a href="#showcase">About</a><a href="#contact" className="nav-contact">Contact <span>↗</span></a></nav></header>
    <div className="experience" id="top">
      <div className="sticky-stage"><Scene /></div>
      <div className="story-layout">
        <section className="panel hero" aria-labelledby="hero-title">
          <div className="eyebrow"><i /> DIGITAL SYSTEMS STUDIO <span>— 2025 / 26</span></div>
          <h1 id="hero-title">Build what<br />comes <em>next.</em></h1>
          <p className="hero-copy">An immersive digital experience powered by technology, motion, and intelligent systems.</p>
          <div className="actions"><a className="button button-primary" href="#story">Explore experience <span>↓</span></a><a className="button button-quiet" href="#showcase">View project <span>↗</span></a></div>
          <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="scroll-cue">↓</span></div>
          <div className="hero-index">01 <span>—</span> 05</div>
        </section>
        <section className="panel story" id="story" aria-labelledby="story-title">
          <div className="section-meta"><span>01 / THE IDEA</span><span>FORM FOLLOWS FEELING</span></div>
          <div className="story-copy"><p className="eyebrow">A NEW KIND OF INTERFACE</p><h2 id="story-title">Technology,<br />in <em>motion.</em></h2><p className="body-copy">We turn complex systems into experiences you can feel. A digital core, shaped by light and engineered to move with you.</p></div>
          <span className="side-note">SCROLL TO SHIFT THE SYSTEM <b>↘</b></span>
        </section>
        <section className="panel technology" id="technology" aria-labelledby="technology-title">
          <div className="section-meta"><span>02 / THE SYSTEM</span><span>BUILT FOR WHAT’S NEXT</span></div>
          <div className="tech-heading"><p className="eyebrow">PRECISION MEETS POSSIBILITY</p><h2 id="technology-title">Made to<br /><em>respond.</em></h2><p>Four principles. One living experience.</p></div>
          <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><span className="feature-number">{feature.number} <i>↗</i></span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
        </section>
        <section className="panel showcase" id="showcase" aria-labelledby="showcase-title">
          <div className="section-meta"><span>03 / THE OBJECT</span><span>ANATOMY OF A DIGITAL CORE</span></div>
          <div className="showcase-copy"><p className="eyebrow">MEET THE KINETIC CORE</p><h2 id="showcase-title">A system<br />with <em>energy.</em></h2></div>
          <div className="object-label label-a"><span>01</span> CORE <i /></div><div className="object-label label-b"><i /> SYSTEM <span>02</span></div><div className="object-label label-c"><span>03</span> MOTION <i /></div><div className="object-label label-d"><i /> FUTURE <span>04</span></div>
        </section>
        <section className="panel cta" id="contact" aria-labelledby="cta-title">
          <div className="section-meta"><span>04 / YOUR NEXT MOVE</span><span>LET’S MAKE IT REAL</span></div>
          <div className="cta-content"><p className="eyebrow"><i /> THE FUTURE IS A MATERIAL</p><h2 id="cta-title">Ready to build<br />the <em>future?</em></h2><p>Experience a new generation of interactive digital products.</p><a className="button button-primary" href="mailto:hello@kinetic.studio">Start building <span>↗</span></a></div>
          <footer><a href="#top" className="brand"><span className="brand-mark">K</span><span>KINETIC<span className="brand-dot">.</span></span></a><span>INDEPENDENT DIGITAL STUDIO · 2025—26</span><a href="#top">BACK TO TOP ↑</a></footer>
        </section>
      </div>
    </div>
  </main>;
}
