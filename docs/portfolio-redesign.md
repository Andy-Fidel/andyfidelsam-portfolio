# Flyer-inspired portfolio redesign

## Intent and boundaries

Use the supplied orange product-engineering flyer as the visual direction for the existing Next.js homepage. Preserve all five projects and their repository, live-site, and screenshot references. Add direct WhatsApp contact using the supplied number. The existing Instagram route and promotional assets remain independent.

The seated portrait is extracted from the supplied flyer with the built-in image editing tool, then converted to a 145 KB transparent WebP. The brief was: preserve the complete seated subject, identity, glasses, outfit, hands, and shoes; remove all flyer text and backgrounds. The asset is `public/andy-seated-cutout.webp`.

## Motion assessment

Guidance read from the user-specified skills:

- https://github.com/emilkowalski/skill/tree/main/skills/find-animation-opportunities
- https://github.com/emilkowalski/skill/tree/main/skills/animation-performance
- https://github.com/emilkowalski/skill/tree/main/skills/apple-design

The opportunity-finding skill was used for assessment; implementation follows the user's explicit redesign request.

| Location | Previous behavior | Purpose | Frequency | Implemented motion |
| --- | --- | --- | --- | --- |
| Hero to expertise | Independent page sections | Spatial consistency | First visit | CSS sticky portrait stays anchored while the content column scrolls naturally; no scroll interception |
| Service articles | Static list | Preventing a jarring change | Once per page load | IntersectionObserver triggers `translateY(26px) scale(.985)` to settled; opacity 480ms and transform 640ms, `cubic-bezier(.23,1,.32,1)`; mobile movement 18px |
| Project cards | Static list | Progressive disclosure | Once per page load | Same bounded reveal; images stay still while the visitor reads |
| Contact buttons | No press feedback | Feedback | Occasional | `scale(.97)` with 160ms transform transition; pointer hover lift restricted to hover-capable devices |

Rejected opportunities:

- Continuous portrait drift: unnecessary repetition and movement distracts from the person and project content.
- Animated project reporting values: data is for reading, and the preview values are illustrative rather than live measurements.
- Scroll hijacking and delayed navigation: interferes with direct manipulation and anchor/keyboard navigation.

## Implementation decisions

- Server-rendered page, one small client enhancement, existing framework dependencies only.
- CSS sticky handles portrait persistence. IntersectionObserver only changes reveal attributes at intersection boundaries. No scroll listeners, React state updates per animation frame, inherited animated custom properties, or permanent `will-change` layers.
- CSS transitions animate transform and opacity only. Static image shadows are not animated.
- Without JavaScript or IntersectionObserver, all content remains visible.
- Reduced-motion disables spatial motion. Focus within an unrevealed card makes it immediately visible. High-contrast mode strengthens text and surfaces.
- Mobile hero has its own composition so text never sits on the cream field or covers the face. After the hero, a separate compact portrait panel stays at the top of the viewport while skills, projects, and about content scroll underneath. The panel is sticky inside the story, so it releases before the contact footer. It occupies 36svh, bounded to 190–300px, and shares the portrait's cream background. Section and keyboard-focus scroll margins account for its height. Subsequent mobile sections use solid surfaces for reading. Desktop retains the side-by-side portrait rail.
- The two projects without supplied screenshots explicitly label their interface concepts as illustrative.

## Validation scope

Production build and ESLint pass. Browser checks cover desktop hero, sticky portrait through skills and projects, mobile hero, project anchor navigation, image loading, reveal attributes, and horizontal overflow. The browser reported no warnings/errors during the checked flow.

Four behavior tests (`node --test tests/scroll-reveals.test.mjs`) cover above-fold visibility, one-time reveal, reduced-motion changes, cleanup, and unsupported-observer fallback. Reduced-motion styling is also checked from CSS rules. No frame-rate or device-performance claim is made; a mid-range phone recording remains the appropriate measurement for hardware-specific smoothness.

## Pinned project sequence (October 2026)

Inspired by the reference site's scroll-driven project deck, selected work now progresses
through a layered card stack beside the stationary desktop portrait. Mobile reserves
24svh (160–205px) for the portrait and places the deck below it. Skills retain their
one-time upward/fade reveals. The orange/cream identity is unchanged.

`ProjectSequence` is a progressive client enhancement around server-rendered cards.
Native CSS sticky controls positioning; a passive scroll listener schedules one animation
frame to update each layer's transform and opacity. React updates only when the active
project changes, not each frame. There is no scroll interception or new dependency.
The reading pause, card progression, and reverse motion are deterministic geometry.

Each card remains fully readable. If the tallest card plus controls and portrait cannot
fit the viewport, pinning is not enabled. Reduced-motion and unsupported ResizeObserver
also keep all projects in normal flow. Direct project buttons support keyboard navigation;
inactive layers are inert and excluded from the accessibility tree. A list-view toggle
exposes all cards and preserves the current project when switching views. Observer,
listener and animation-frame cleanup restores the original document on unmount.

Validation includes unit tests for scroll geometry, reversal, interactive-card selection,
enhancement cleanup, reduced motion, short screens and unsupported-browser fallback;
plus browser inspection of desktop and mobile native scrolling and list mode. Browser
viewport checks do not replace measurements on physical mobile hardware. No frame-rate
claim is made. This iteration is local only until separately deployed.
