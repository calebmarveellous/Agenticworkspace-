# framer-motion skill

> Specialized skill for **Motion for React** (formerly Framer Motion) — the industry-standard animation library for React. Provides expert knowledge on the full API, implementation patterns, performance optimization, and accessibility.

---

## Install

```bash
# Via skills CLI (recommended)
npx skills add alexsnchz/skills --skill framer-motion

# Or install the full collection
npx skills add alexsnchz/skills
```

Works with: **Claude Code**, **Cursor**, **Windsurf**, **OpenCode**, **Copilot**, and [40+ other agents](https://skills.sh).

---

## What does this skill cover?

| Area | Includes |
|------|----------|
| **`motion` component** | Animation props, transitions, variants, declarative gestures |
| **Presence & exit** | `AnimatePresence`, `wait`/`sync`/`popLayout` modes, exit animations |
| **Variants** | Declarative state machines, orchestration, stagger across children |
| **Layout animations** | Automatic FLIP, `layoutId` (shared element), `LayoutGroup` |
| **Motion Values** | `useMotionValue`, `useTransform`, `useSpring`, `useVelocity`, `useMotionTemplate` |
| **Gestures** | Drag, hover, tap, focus, pan, `useDragControls` |
| **Scroll** | `useScroll`, `useTransform`, parallax, scroll-linked animations, scroll velocity |
| **Imperative animation** | `useAnimate`, `useAnimation`, sequences, programmatic stagger |
| **Performance** | `LazyMotion`, bundle splitting, motion values vs. React state |
| **Accessibility** | `useReducedMotion`, `MotionConfig reducedMotion`, WCAG support |
| **TypeScript** | Full types: `Variants`, `MotionProps`, `PanInfo`, `Transition` |

---

## Reference files

```
framer-motion/
├── SKILL.md                              # Core: full API and essential patterns
└── references/
    ├── motion-values.md                  # useMotionValue, useTransform, useSpring, useAnimate
    ├── layout-animations.md              # layout, layoutId, LayoutGroup, advanced AnimatePresence
    ├── gestures-and-scroll.md            # Drag, gestures, useScroll, scroll-linked animations
    └── patterns-and-performance.md       # UI patterns, optimization, TypeScript, debugging
```

---

## Example prompts that trigger this skill

### Basic animations

```
Animate a card entry with fade + slide using framer-motion
```

```
How do I make a div appear with a spring animation when it changes position in the DOM?
```

```
Create a smooth page transition in Next.js App Router using AnimatePresence
```

### Variants & stagger

```
I want a list of items to appear one by one with a cascade (stagger) effect
```

```
Design a navigation menu that animates its items with a delay between each when it opens
```

```
How do I define variants to orchestrate animations between a parent and its children?
```

### Gestures & interaction

```
Implement a swipeable bottom sheet that closes when the user drags it down fast enough
```

```
Add a magnetic cursor effect to a CTA button
```

```
Build a drag-and-drop component with constraints and an elastic effect at the boundaries
```

### Layout & shared element

```
I want a gallery where clicking an image smoothly expands it to fill the screen (shared element transition)
```

```
Implement a selected tab indicator that slides between tabs using layoutId
```

```
How do I animate list reordering when items are added or removed?
```

### Scroll-linked animations

```
Create a parallax effect on the page hero using useScroll and useTransform
```

```
I want sections to fade in on scroll, but only the first time (once: true)
```

```
Implement a reading progress bar that advances as the user scrolls
```

```
Build a sticky horizontal scroll effect where sections slide sideways on vertical scroll
```

### Advanced Motion Values

```
I need a card's shadow to follow the user's cursor in real time without re-renders
```

```
Create an animated counter that smoothly increments to a target number
```

```
Use useTransform to map an element's scroll progress to a continuous rotation (clamp: false)
```

### Performance & optimization

```
How do I reduce the framer-motion bundle size in my Next.js app?
```

```
When should I use useMotionValue + style instead of useState + animate?
```

```
How do I make my animations respect the OS prefers-reduced-motion setting?
```

### Debugging

```
My exit animation isn't playing even though I have AnimatePresence
```

```
The layout animation jumps instead of animating smoothly — why?
```

```
whileInView fires on every render, not just the first time
```

---

## Compatibility notes

| Scenario | Correct import |
|----------|---------------|
| Standard project with `framer-motion` | `import { motion } from "framer-motion"` |
| Project using the `motion` package | `import { motion } from "motion/react"` |
| Next.js Server Components | `import * as motion from "motion/react-client"` |
| Optimized bundle (LazyMotion) | `import { m } from "framer-motion"` |

> Both packages (`framer-motion` and `motion`) share an identical API. This skill covers both.

---

## Dependencies

```bash
# Option A (most common in existing projects)
npm install framer-motion

# Option B (updated naming)
npm install motion
```

Minimum recommended version: **v11+** (React 18/19 compatible, with improvements to layout animations and concurrent rendering).

---

## Official resources

- [motion.dev/docs/react](https://motion.dev/docs/react) — Official documentation
- [motion.dev/docs/react-animation](https://motion.dev/docs/react-animation) — Animation guide
- [motion.dev/docs/react-motion-component](https://motion.dev/docs/react-motion-component) — motion component API
