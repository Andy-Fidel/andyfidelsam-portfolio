import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Run the real enhancement with isolated browser boundaries and React's effect lifecycle.
const compiled = ts.transpileModule(
  readFileSync(new URL("../app/scroll-reveals.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

function mount({ reduced = false, observerSupported = true } = {}) {
  const elements = [100, 1000, 2000].map((top) => ({
    attributes: new Map(),
    getBoundingClientRect: () => ({ top }),
    setAttribute(name, value) { this.attributes.set(name, value); },
    removeAttribute(name) { this.attributes.delete(name); },
  }));
  const preference = {
    matches: reduced,
    listeners: new Set(),
    addEventListener(_name, callback) { this.listeners.add(callback); },
    removeEventListener(_name, callback) { this.listeners.delete(callback); },
  };
  const observers = [];
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
  }
  let cleanup;
  const exports = {};
  const window = { innerHeight: 800, matchMedia: () => preference };
  if (observerSupported) window.IntersectionObserver = Observer;
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.equal(name, "react");
      return { useEffect: (effect) => { cleanup = effect(); } };
    },
    window,
    document: { querySelectorAll: () => elements },
    IntersectionObserver: Observer,
  });
  exports.default();
  return { elements, observer: observers[0], preference, cleanup };
}

test("keeps content in the viewport readable and reveals future content once", () => {
  const { elements, observer, cleanup } = mount();
  assert.equal(elements[0].attributes.get("data-visible"), "true");
  assert.equal(elements[1].attributes.get("data-visible"), "false");
  assert.equal(observer.targets.size, 2);
  observer.callback([{ target: elements[1], isIntersecting: false }]);
  assert.equal(elements[1].attributes.get("data-visible"), "false");
  observer.callback([{ target: elements[1], isIntersecting: true }]);
  assert.equal(elements[1].attributes.get("data-visible"), "true");
  assert.equal(observer.targets.has(elements[1]), false);
  cleanup();
});

test("reduced motion starts with every section visible", () => {
  const { elements, observer, cleanup } = mount({ reduced: true });
  assert.ok(elements.every((element) => element.attributes.get("data-visible") === "true"));
  assert.equal(observer.targets.size, 0);
  cleanup();
});

test("honors preference changes and releases observers and listeners on unmount", () => {
  const { elements, observer, preference, cleanup } = mount();
  preference.matches = true;
  for (const callback of preference.listeners) callback();
  assert.ok(elements.every((element) => element.attributes.get("data-visible") === "true"));
  assert.equal(observer.targets.size, 0);
  cleanup();
  assert.equal(preference.listeners.size, 0);
  assert.ok(elements.every((element) => !element.attributes.has("data-visible")));
});

test("unsupported browsers retain the fully visible server-rendered page", () => {
  const { elements, observer } = mount({ observerSupported: false });
  assert.equal(observer, undefined);
  assert.ok(elements.every((element) => !element.attributes.has("data-visible")));
});
