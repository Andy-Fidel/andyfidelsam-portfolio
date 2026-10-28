import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const exports = {};
vm.runInNewContext(ts.transpileModule(
  readFileSync(new URL("../app/project-motion.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText, { exports });
const { projectProgress, projectFrame } = exports;

test("scroll progress clamps at the first and last projects", () => {
  assert.equal(projectProgress(-100, 600, 5), 0);
  assert.equal(projectProgress(50000, 600, 5), 4);
  assert.equal(projectProgress(0, 0, 5), 0);
});

test("each project has a reading pause and transitions continuously", () => {
  assert.equal(projectProgress(240, 600, 5), 0);
  assert.equal(projectProgress(600, 600, 5), 1);
  let previous = 0;
  for (let distance = 0; distance <= 2400; distance += 2) {
    const next = projectProgress(distance, 600, 5);
    assert.ok(next >= previous);
    assert.ok(next - previous < 0.02);
    previous = next;
  }
});

test("exactly one card is interactive while past and distant cards disappear", () => {
  for (const progress of [0, 0.4, 0.5, 1, 2.8, 4]) {
    const cards = Array.from({ length: 5 }, (_, index) => projectFrame(index, progress));
    assert.equal(cards.filter(card => card.active).length, 1);
    assert.ok(cards.every(card => card.opacity >= 0 && card.opacity <= 1));
  }
  assert.equal(projectFrame(0, 1).opacity, 0);
  assert.equal(projectFrame(4, 0).opacity, 0);
});

test("scrolling backwards restores the same deterministic frame", () => {
  const before = projectFrame(2, projectProgress(1200, 600, 5));
  projectFrame(2, projectProgress(2400, 600, 5));
  assert.deepEqual(projectFrame(2, projectProgress(1200, 600, 5)), before);
});

const sequenceSource = ts.transpileModule(
  readFileSync(new URL("../app/project-sequence.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } },
).outputText;

function mountSequence({ reduced = false, height = 900, supported = true } = {}) {
  const element = () => ({
    style: { removeProperty(name) { delete this[name]; } },
    attributes: new Map(), inert: false, offsetHeight: 500,
    setAttribute(name, value) { this.attributes.set(name, value); },
    removeAttribute(name) { this.attributes.delete(name); },
  });
  const root = element(), stage = element(), deck = element();
  const layers = Array.from({ length: 5 }, element);
  let distance = 0, cleanup, nextFrame;
  const listeners = new Map();
  const preference = { matches: reduced, addEventListener() {}, removeEventListener() {} };
  root.getBoundingClientRect = () => ({ top: 24 - distance });
  root.querySelector = selector => selector.includes("stage") ? stage : deck;
  root.querySelectorAll = () => layers;
  const window = {
    innerHeight: height, matchMedia: () => preference,
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: name => listeners.delete(name),
  };
  class Observer { observe() {} disconnect() {} }
  if (supported) window.ResizeObserver = Observer;
  let refIndex = 0;
  const compiledModule = { exports: {} };
  vm.runInNewContext(sequenceSource, {
    exports: compiledModule.exports,
    require: name => {
      if (name === "./project-motion") return exports;
      if (name.endsWith(".css")) return { default: {} };
      if (name === "react/jsx-runtime") return { jsx() {}, jsxs() {} };
      assert.equal(name, "react");
      return {
        useRef: value => ({ current: refIndex++ === 0 ? root : value }),
        useState: value => [value, () => {}],
        useEffect: callback => { cleanup = callback(); },
        Children: { toArray: value => value },
      };
    },
    window, ResizeObserver: Observer,
    getComputedStyle: () => ({ top: "24px" }),
    requestAnimationFrame: callback => { nextFrame = callback; return 1; },
    cancelAnimationFrame: () => { nextFrame = undefined; },
  });
  compiledModule.exports.default({ children: [], titles: [] });
  return {
    root, layers, listeners, cleanup,
    scroll(value) { distance = value; listeners.get("scroll")?.(); nextFrame?.(); },
  };
}

test("pinning makes only the current project interactive and cleans up on unmount", () => {
  const mounted = mountSequence();
  assert.equal(mounted.root.attributes.get("data-pinned"), "true");
  assert.equal(mounted.layers[0].inert, false);
  assert.equal(mounted.layers[1].inert, true);
  mounted.scroll(900 * 0.85);
  assert.equal(mounted.layers[0].inert, true);
  assert.equal(mounted.layers[1].inert, false);
  mounted.cleanup();
  assert.equal(mounted.listeners.size, 0);
  assert.ok(mounted.layers.every(layer => !layer.inert && !layer.attributes.has("aria-hidden")));
  assert.equal(mounted.root.attributes.has("data-pinned"), false);
});

test("reduced motion, small viewports and unsupported browsers retain the complete list", () => {
  for (const options of [{ reduced: true }, { height: 500 }, { supported: false }]) {
    const mounted = mountSequence(options);
    assert.equal(mounted.root.attributes.has("data-pinned"), false);
    assert.ok(mounted.layers.every(layer => !layer.inert));
    mounted.cleanup?.();
  }
});
