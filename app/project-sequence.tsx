"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { projectFrame, projectProgress } from "./project-motion";
import styles from "./portfolio.module.css";

export default function ProjectSequence({ children, titles }: { children: ReactNode; titles: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<(index: number) => void>(() => {});
  const viewTargetRef = useRef<number | null>(null);
  const [listView, setListView] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("ResizeObserver" in window)) return;
    const stage = root.querySelector<HTMLElement>("[data-project-stage]")!;
    const deck = root.querySelector<HTMLElement>("[data-project-deck]")!;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-project-layer]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let frame = 0;
    let top = 0;
    let step = 1;
    let lastActive = -1;

    const reset = () => {
      enabled = false;
      root.removeAttribute("data-pinned");
      root.style.removeProperty("height");
      deck.style.removeProperty("height");
      for (const layer of layers) {
        layer.removeAttribute("style");
        layer.inert = false;
        layer.removeAttribute("aria-hidden");
      }
    };
    const update = () => {
      frame = 0;
      if (!enabled) return;
      const progress = projectProgress(top - root.getBoundingClientRect().top, step, layers.length);
      const nextActive = Math.round(progress);
      for (const [index, layer] of layers.entries()) {
        const card = projectFrame(index, progress);
        layer.style.transform = card.transform;
        layer.style.opacity = String(card.opacity);
        layer.inert = !card.active;
        layer.setAttribute("aria-hidden", String(!card.active));
      }
      if (lastActive !== nextActive) {
        lastActive = nextActive;
        setActive(nextActive);
      }
    };
    const schedule = () => {
      if (enabled && !frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      reset();
      if (listView || preference.matches || layers.length < 2) return;
      top = Number.parseFloat(getComputedStyle(stage).top) || 0;
      const cardHeight = Math.max(...layers.map(layer => layer.offsetHeight));
      const stageHeight = cardHeight + 44 + 12 + 36;
      // Never trap long content, zoomed text, or short landscape viewports in a clipped scene.
      if (stageHeight + top + 16 > window.innerHeight) return;
      step = window.innerHeight * 0.85;
      deck.style.height = `${cardHeight + 36}px`;
      root.style.height = `${stageHeight + step * (layers.length - 1)}px`;
      root.setAttribute("data-pinned", "true");
      enabled = true;
      layers.forEach((layer, index) => { layer.style.zIndex = String(layers.length - index); });
      update();
    };
    jumpRef.current = index => {
      if (!enabled) return;
      window.scrollTo({ top: window.scrollY + root.getBoundingClientRect().top - top + index * step, behavior: "instant" });
      update();
    };
    const resizeObserver = new ResizeObserver(measure);
    // Observe cards rather than the tall scroll runway, which we resize ourselves.
    layers.forEach(layer => resizeObserver.observe(layer));
    measure();
    if (viewTargetRef.current !== null) {
      const index = viewTargetRef.current;
      viewTargetRef.current = null;
      if (enabled) jumpRef.current(index);
      else layers[index]?.scrollIntoView({ block: "start", behavior: "instant" });
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    preference.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", measure);
      jumpRef.current = () => {};
      reset();
    };
  }, [listView]);

  return <div className={styles.projectSequence} ref={rootRef} data-list={listView}>
    <div className={styles.sequenceStage} data-project-stage>
      <div className={styles.sequenceControls}>
        <span className={styles.sequenceHint}>Scroll to explore <span aria-hidden="true">↓</span></span>
        <nav aria-label="Select a project" className={styles.sequenceNav}>
          {titles.map((title, index) => <button key={title} aria-label={`Show ${title}`} aria-current={active === index ? "step" : undefined} onClick={() => jumpRef.current(index)}>{String(index + 1).padStart(2, "0")}</button>)}
        </nav>
        <button className={styles.sequenceToggle} onClick={() => { viewTargetRef.current = active; setListView(value => !value); }} aria-pressed={listView}>{listView ? "Scroll view" : "List view"}</button>
      </div>
      <div className={styles.projects} data-project-deck>
        {Children.toArray(children).map((child, index) => <div className={styles.projectLayer} data-project-layer key={titles[index]}>{child}</div>)}
      </div>
    </div>
  </div>;
}
