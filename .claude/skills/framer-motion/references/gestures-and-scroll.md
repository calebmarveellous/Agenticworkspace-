# Gestures & Scroll — Reference

---

## Gesture props overview

Motion provides cross-device gesture recognition (mouse, touch, pointer) via declarative props.

| Prop | Triggers when |
|------|--------------|
| `whileHover` | Pointer is over the element |
| `whileTap` | Pointer is pressed down on the element |
| `whileFocus` | Element has keyboard focus |
| `whileDrag` | Element is being dragged |
| `whileInView` | Element is visible in the viewport |
| `drag` | Enables drag gesture (`true`, `"x"`, `"y"`) |

---

## Hover

```tsx
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  transition={{ type: "spring", stiffness: 400, damping: 20 }}
/>

// Event handlers
<motion.div
  onHoverStart={(event, info) => console.log("hovered")}
  onHoverEnd={(event, info) => console.log("left")}
/>
```

> `whileHover` uses pointer enter/leave, not CSS `:hover` — works correctly with touch.

---

## Tap / Press

```tsx
<motion.button
  whileTap={{ scale: 0.95, backgroundColor: "#1d4ed8" }}
/>

// Event handlers
<motion.div
  onTap={(event, info) => console.log("tapped at", info.point)}
  onTapStart={(event, info) => {}}
  onTapCancel={(event, info) => {}}   // pointer released outside element
/>
```

---

## Focus (accessibility)

```tsx
<motion.input
  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px #3b82f6" }}
/>
```

---

## Viewport detection (`whileInView`)

```tsx
// Basic scroll reveal
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}             // only animate once
  transition={{ duration: 0.6 }}
/>

// With margin — triggers 100px before it enters view
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px 0px" }}
/>

// Custom scroll root
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ root: scrollContainerRef }}
/>

// Trigger only when 50% visible
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ amount: 0.5 }}
/>
```

### `useInView` hook (imperative)

```tsx
import { useInView } from "framer-motion"

function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.5s" }}>
      {/* Can also use with useAnimate for complex in-view sequences */}
    </div>
  )
}
```

---

## Drag

### Basic drag

```tsx
// Free drag
<motion.div drag />

// Constrained to an axis
<motion.div drag="x" />
<motion.div drag="y" />
```

### Constraints

```tsx
// Pixel constraints (relative to resting position)
<motion.div
  drag
  dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }}
/>

// Constrain within a parent element
const constraintsRef = useRef(null)

<div ref={constraintsRef} style={{ width: 400, height: 400, position: "relative" }}>
  <motion.div
    drag
    dragConstraints={constraintsRef}
    style={{ width: 80, height: 80 }}
  />
</div>
```

### Elastic boundaries and physics

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}              // 0 = hard stop, 1 = fully elastic, default 0.5
  dragMomentum={true}            // apply inertia on release (default: true)
  dragTransition={{
    bounceStiffness: 600,        // spring stiffness when hitting boundary
    bounceDamping: 20            // spring damping at boundary
  }}
/>
```

### Drag events

```tsx
<motion.div
  drag
  onDragStart={(event, info) => {
    console.log("Started at", info.point.x, info.point.y)
  }}
  onDrag={(event, info) => {
    // info.delta — distance since last event
    // info.offset — distance from origin
    // info.velocity — current velocity
    // info.point — position relative to page
  }}
  onDragEnd={(event, info) => {
    console.log("Velocity:", info.velocity.x, info.velocity.y)
    // Common pattern: dismiss if dragged far enough or fast enough
    if (Math.abs(info.velocity.x) > 500 || Math.abs(info.offset.x) > 150) {
      dismiss()
    }
  }}
/>
```

### External drag controls

Use when the drag handle is separate from the draggable element:

```tsx
import { useDragControls } from "framer-motion"

function DragSheet() {
  const dragControls = useDragControls()

  return (
    <div>
      {/* Handle — user drags this */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        style={{ cursor: "grab", touchAction: "none" }}
      >
        ⣿ Drag handle
      </div>

      {/* Draggable content — not directly draggable */}
      <motion.div
        drag="y"
        dragControls={dragControls}
        dragListener={false}              // disable drag from element itself
        dragConstraints={{ top: 0 }}
      />
    </div>
  )
}
```

### Drag direction lock

```tsx
<motion.div drag dragDirectionLock />
// Locks to whichever axis (x or y) the user moves first
```

### Drag-to-dismiss bottom sheet

```tsx
function BottomSheet({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="bottom-sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        drag="y"
        dragConstraints={{ top: 0 }}       // can only drag down
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.velocity.y > 400 || info.offset.y > 150) {
            onClose()
          }
        }}
        transition={{ type: "spring", damping: 40, stiffness: 400 }}
      />
    </AnimatePresence>
  )
}
```

---

## Pan gesture (non-drag)

Tracks pointer movement without moving the element:

```tsx
<motion.div
  onPan={(event, info) => {
    // Track panning without moving the element
    console.log(info.delta.x, info.delta.y)
  }}
  onPanStart={(event, info) => {}}
  onPanEnd={(event, info) => {}}
/>
```

---

## Scroll animations

### `useScroll` — track scroll position

```tsx
import { useScroll, useTransform } from "framer-motion"

function App() {
  // Window scroll
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll()
  // scrollY — pixels scrolled from top
  // scrollYProgress — 0 to 1 (top to bottom of page)
}
```

### Element-relative scroll progress

Track how far a specific element has scrolled through the viewport:

```tsx
function FadeSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
    // ["when element top hits viewport bottom", "when element bottom hits viewport top"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])

  return (
    <motion.section ref={ref} style={{ opacity, scale }}>
      Content
    </motion.section>
  )
}
```

### `offset` parameter reference

The `offset` array defines two scroll positions as `[container, target]` intersections:

| Value | Meaning |
|-------|---------|
| `"start start"` | Element top aligns with viewport top |
| `"end end"` | Element bottom aligns with viewport bottom |
| `"start end"` | Element top reaches viewport bottom (element enters from bottom) |
| `"end start"` | Element bottom reaches viewport top (element exits through top) |
| `"center center"` | Element center aligns with viewport center |
| `"0.5"` | Same as `"center"` |

### Scroll-linked parallax

```tsx
function ParallaxImage({ src, speed = 0.3 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"])

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.img src={src} style={{ y, scale: 1.3 }} />
    </div>
  )
}
```

### Scroll progress bar

```tsx
function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed", top: 0, left: 0, right: 0,
        height: 3,
        background: "#3b82f6"
      }}
    />
  )
}
```

### Horizontal scroll-linked animation

```tsx
function HorizontalScroll() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  return (
    <section ref={ref} style={{ height: "400vh" }}>
      <div style={{ position: "sticky", top: 0, overflow: "hidden" }}>
        <motion.div style={{ x, display: "flex", width: "400%" }}>
          {panels.map(panel => <Panel key={panel.id} {...panel} />)}
        </motion.div>
      </div>
    </section>
  )
}
```

### Scroll-velocity effect (natural scroll feel)

```tsx
function ScrollSkew() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  // Negative clamp: tilt forward when scrolling fast, then spring back
  const skewY = useTransform(scrollVelocity, [-2000, 0, 2000], [5, 0, -5])
  const smoothSkew = useSpring(skewY, { stiffness: 300, damping: 30 })

  return (
    <motion.div style={{ skewY: smoothSkew }}>
      {children}
    </motion.div>
  )
}
```

---

## Propagation control

Prevent child gestures from triggering parent animations:

```tsx
<motion.div whileTap={{ scale: 1.1 }}>
  {/* This button's tap won't fire the parent's scale */}
  <motion.button
    whileTap={{ opacity: 0.8 }}
    propagate={{ tap: false }}
  />
</motion.div>
```

Stop pointer events from reaching motion parents:

```tsx
<motion.div whileHover={{ scale: 1.1 }}>
  <button onPointerDownCapture={e => e.stopPropagation()}>
    This button won't trigger parent hover
  </button>
</motion.div>
```
