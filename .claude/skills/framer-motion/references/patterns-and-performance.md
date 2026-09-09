# Patterns & Performance — Reference

---

## Orchestration patterns

### Stagger children with variants

The cleanest way to animate lists with staggered entry. Parent defines the timing, children define their own animation.

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,       // seconds between each child
      delayChildren: 0.1,          // wait before first child starts
      staggerDirection: 1,         // 1 = forward, -1 = reverse
      when: "beforeChildren"       // parent animates first
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 28 }
  }
}

function StaggeredList({ items }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show">
      {items.map(item => (
        <motion.li key={item.id} variants={item}>
          {item.label}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Stagger with `useAnimate`

For imperative stagger (e.g., triggered by button click):

```tsx
import { useAnimate, stagger } from "framer-motion"

function AnimatedGrid() {
  const [scope, animate] = useAnimate()

  const reveal = async () => {
    await animate(
      ".card",
      { opacity: [0, 1], y: [20, 0] },
      { delay: stagger(0.05), duration: 0.4 }
    )
  }

  // stagger options
  stagger(0.1, { from: "first" })     // default: left-to-right
  stagger(0.1, { from: "last" })      // right-to-left
  stagger(0.1, { from: "center" })    // center-outward
  stagger(0.1, { from: 3 })           // from specific index

  return <div ref={scope}>{/* ... */}</div>
}
```

### Sequence animations

Chain animations in order using `await`:

```tsx
const [scope, animate] = useAnimate()

const sequence = async () => {
  // Each await waits for the previous animation to finish
  await animate(".hero", { opacity: 1 }, { duration: 0.5 })
  await animate(".subtitle", { opacity: 1, y: 0 }, { duration: 0.4 })
  animate(".cta", { opacity: 1, scale: 1 }, { duration: 0.3 })  // no await = fire and forget
}
```

---

## Common UI patterns

### Smooth number counter

```tsx
function AnimatedCounter({ to }: { to: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(rounded, "change", setDisplay)

  useEffect(() => {
    animate(count, to, { duration: 1.5, ease: "easeOut" })
  }, [to])

  return <span>{display}</span>
}
```

### Text reveal word by word

```tsx
function RevealText({ text }: { text: string }) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  }

  const word = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.p variants={container} initial="hidden" animate="visible">
      {words.map((w, i) => (
        <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.3em" }}>
          {w}
        </motion.span>
      ))}
    </motion.p>
  )
}
```

### Cursor-following magnetic element

```tsx
function MagneticButton({ children }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.button>
  )
}
```

### Infinite ticker / marquee

```tsx
function Marquee({ items }: { items: string[] }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        style={{ display: "flex", gap: 40, width: "max-content" }}
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </motion.div>
    </div>
  )
}
```

### Skeleton → content transition

```tsx
// Skeleton card and real card share layoutId
// When skeleton unmounts and card mounts, they animate between positions

function ProductCard({ id, isLoading, product }) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          layoutId={`product-${id}`}
          className="skeleton-card"
          exit={{ opacity: 0 }}
        />
      ) : (
        <motion.div
          key="content"
          layoutId={`product-${id}`}
          className="product-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {product.name}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Modal with backdrop

```tsx
function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-6"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## MotionConfig — global settings

```tsx
import { MotionConfig } from "framer-motion"

// Set default transition for entire app
<MotionConfig transition={{ type: "spring", stiffness: 300, damping: 30 }}>
  <App />
</MotionConfig>

// Respect OS reduced-motion preference
<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>

// Always disable (e.g., in tests)
<MotionConfig reducedMotion="always">
  <App />
</MotionConfig>
```

---

## `useReducedMotion` — accessibility

```tsx
import { useReducedMotion } from "framer-motion"

function AnimatedSidebar({ isOpen }) {
  const shouldReduce = useReducedMotion()

  // Replace x-axis movement with opacity for reduced-motion users
  const x = shouldReduce ? 0 : isOpen ? 0 : -240

  return (
    <motion.aside
      animate={{ x, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.4 }}
    />
  )
}
```

---

## Performance optimization

### LazyMotion — reduce bundle size

The `motion` component is ~34KB. `LazyMotion` + `m` component brings it to ~4.6KB by splitting features:

```tsx
import { LazyMotion, domAnimation, m } from "framer-motion"

// domAnimation (+15KB): animations, variants, exit, tap/hover/focus gestures
// domMax (+17KB): domAnimation + drag, layout, pan gestures

function App({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  )
}

// Replace <motion.div> with <m.div>
function MyComponent() {
  return <m.div animate={{ opacity: 1 }} />
}

// Async load to split from main bundle
const loadFeatures = () => import("./motion-features").then(m => m.default)
<LazyMotion features={loadFeatures}> {/* async load */} </LazyMotion>
```

### Prefer `style` over `animate` for values that update every frame

```tsx
// ❌ Less performant — runs through animation scheduler
const [x, setX] = useState(0)
<motion.div animate={{ x }} />

// ✅ Better — bypasses React entirely
const x = useMotionValue(0)
<motion.div style={{ x }} />
```

### Avoid layout animations on many elements simultaneously

Layout animations require DOM measurement. If hundreds of items need layout animation, consider:
- Only animating the items that actually changed
- Using `layoutDependency` to limit measurement frequency
- CSS grid/flex reordering with CSS transitions instead

### Independent transforms

Motion handles transforms independently, which prevents conflicts:

```tsx
// All these work simultaneously without overriding each other
<motion.div
  style={{ x: 100 }}           // from motion value
  whileHover={{ scale: 1.1 }}  // from gesture
  animate={{ rotate: 45 }}     // from animation
/>
```

---

## Testing animations

### Disable in tests

```tsx
// In your test setup or test render wrapper:
<MotionConfig reducedMotion="always">
  <ComponentUnderTest />
</MotionConfig>
```

### Mock framer-motion

```ts
// jest.mock or vitest.mock
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion")
  return {
    ...actual,
    AnimatePresence: ({ children }) => children,
    motion: {
      div: "div",
      span: "span",
      // ... etc
    }
  }
})
```

---

## TypeScript types

```ts
import type {
  Variants,              // { [key: string]: TargetAndTransition }
  MotionProps,           // all motion component props
  PanInfo,               // { point, delta, offset, velocity }
  AnimationControls,     // from useAnimationControls()
  MotionValue,           // from useMotionValue()
  Transition,            // transition config object
  TargetAndTransition,   // animate/initial/exit value
} from "framer-motion"

// Typed variants example
const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Component that accepts motion props
interface CardProps extends MotionProps {
  title: string
}
```

---

## Debugging checklist

1. **Exit animation not playing** → wrap in `<AnimatePresence>`, add unique `key` prop
2. **Animation resets on each render** → `motion.create()` called inside component — move outside
3. **Layout animation jumps** → add `layoutScroll` to scrollable ancestors; use `LayoutGroup` for siblings
4. **`whileInView` fires repeatedly** → add `viewport={{ once: true }}`
5. **Drag feels sticky** → add `touchAction: "none"` to draggable element's style
6. **Spring overshoots too much** → increase `damping` or lower `bounce`
7. **Too many re-renders** → replace `useState` + `animate` with `useMotionValue` + `style`
8. **`layoutId` transition not happening** → ensure both elements are wrapped in/near `AnimatePresence` and have the same `layoutId` string
