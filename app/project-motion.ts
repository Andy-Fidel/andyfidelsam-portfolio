/** Pure scroll geometry, independent of React and browser event timing. */
export function projectProgress(distance: number, step: number, count: number) {
  const raw = Math.max(0, Math.min(count - 1, distance / Math.max(1, step)));
  const whole = Math.floor(raw);
  // Give each project a reading pause before dealing the next card.
  const t = Math.max(0, Math.min(1, (raw - whole - 0.45) / 0.55));
  return whole + t * t * (3 - 2 * t);
}

export function projectFrame(index: number, progress: number) {
  const offset = index - progress;
  const past = Math.min(1, Math.max(0, -offset));
  const depth = Math.min(3, Math.max(0, offset));
  return {
    transform: `translate3d(0,${depth * 12 - past * 64}px,0) scale(${1 - depth * 0.035 - past * 0.015})`,
    opacity: offset > 3 ? 0 : 1 - past,
    active: index === Math.round(progress),
  };
}
