# Motion Values — Reference

Motion values are observable, reactive primitives that animate independently of React's render cycle. They're the performance backbone for interactive and scroll-driven animations.

---

## useMotionValue

Creates a raw motion value. Updating it with `.set()` triggers animations on subscribed `motion` components without a re-render.

```tsx
import { useMotionValue, motion } from "framer-motion"

function DraggableCard() {
  const x = useMotionValue(0)          // initial value

  return (
    <motion.div
      drag="x"
      style={{ x }}                   // binds value to CSS x transform
    />
  )
}
```

### API
```tsx
const x = useMotionValue(0)

x.get()           // read current value
x.set(100)        // update value (triggers animation if subscribed)
x.jump(100)       // instantly jump without animation
x.on("change", (latest) => console.log(latest))    // subscribe to changes
x.on("animationStart", () => {})
x.on("animationComplete", () => {})
```

### Listening in components

```tsx
import { useMotionValueEvent } from "framer-motion"

useMotionValueEvent(x, "change", (latest) => {
  // fires on every frame change — use for side effects
  setDisplayValue(Math.round(latest))
})
```

---

## useTransform

Derives a new motion value from one or more existing ones. Zero re-renders. Updates every frame.

### Input → Output range mapping

```tsx
const x = useMotionValue(0)

// Maps x from [-200, 0, 200] to opacity [0, 1, 0]
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

// Color interpolation
const background = useTransform(x, [0, 100], ["#ff0088", "#0d63f8"])

// With easing
import { circOut } from "framer-motion"
const scale = useTransform(x, [0, 100], [0.8, 1.2], { ease: circOut })

// Unclamped (for infinite/continuous effects)
const rotate = useTransform(x, [0, 100], [0, 360], { clamp: false })
```

### Transform function (reactive computed)

```tsx
const x = useMotionValue(0)
const y = useMotionValue(0)

// Subscribes to both x and y — updates when either changes
const distance = useTransform(() =>
  Math.sqrt(x.get() ** 2 + y.get() ** 2)
)
```

### Multiple outputs from one input (reduces repetition)

```tsx
const { opacity, scale, filter } = useTransform(scrollY, [0, 300], {
  opacity: [1, 0],
  scale: [1, 0.8],
  filter: ["blur(0px)", "blur(8px)"]
})
```

### Common patterns

```tsx
// Scroll-linked parallax
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, -150])    // parallax offset
const opacity = useTransform(scrollY, [0, 300], [1, 0]) // fade on scroll

// Velocity-based scale (rubberbanding feel)
const xVelocity = useVelocity(x)
const scale = useTransform(xVelocity, [-3000, 0, 3000], [1.3, 1, 1.3], { clamp: false })

// Time-based perpetual rotation
const time = useTime()
const rotate = useTransform(time, [0, 3000], [0, 360], { clamp: false })
```

---

## useSpring

Wraps a motion value or number in spring physics. The spring "follows" the source value, producing smooth, physical-feeling animation.

```tsx
const x = useMotionValue(0)
const smoothX = useSpring(x, {
  stiffness: 300,   // how strong the spring pulls
  damping: 30,      // how much it slows down (higher = less bounce)
  mass: 1           // weight of the object (higher = slower response)
})

// Or attach to cursor position for magnetic effects
const mouseX = useMotionValue(0)
const springX = useSpring(mouseX, { stiffness: 200, damping: 20 })
```

### As standalone animated value

```tsx
const y = useSpring(0)  // starts at 0

// Later:
y.set(100)    // springs to 100
y.jump(50)    // instantly snaps to 50 without spring
```

### Spring presets reference

| Feel | stiffness | damping |
|------|-----------|---------|
| Snappy UI | 400 | 28 |
| Balanced (default-ish) | 300 | 30 |
| Soft / floaty | 150 | 20 |
| Wobbly / bouncy | 80 | 10 |
| Very stiff | 600 | 40 |

Use `visualDuration` + `bounce` as an alternative (easier to reason about):
```tsx
transition={{ type: "spring", visualDuration: 0.3, bounce: 0.2 }}
// visualDuration: seconds to "visually" reach target
// bounce: 0 = no bounce, 0.5 = moderate, 1 = extreme
```

---

## useVelocity

Returns a motion value that tracks the velocity (rate of change per second) of another motion value.

```tsx
const x = useMotionValue(0)
const xVelocity = useVelocity(x)

// Chain: velocity of velocity = acceleration
const xAcceleration = useVelocity(xVelocity)

// Use case: stretch a draggable card based on drag speed
const scaleX = useTransform(xVelocity, [-2000, 0, 2000], [1.3, 1, 1.3])
```

---

## useMotionTemplate

Constructs a CSS string that updates reactively from motion values — no re-renders.

```tsx
import { useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

// Dynamic gradient that follows cursor
function RadialGradientCard() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const background = useMotionTemplate`
    radial-gradient(circle at ${mouseX}% ${mouseY}%, #3b82f6, transparent 60%)
  `

  return (
    <motion.div
      style={{ background }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
      }}
    />
  )
}

// Dynamic drop-shadow
const shadowX = useSpring(0)
const shadowY = useMotionValue(0)
const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
```

---

## useAnimate — imperative animation sequences

For programmatic control, complex sequences, or animations triggered by events outside React's render cycle.

```tsx
import { useAnimate, stagger } from "framer-motion"

function AnimatedMenu() {
  const [scope, animate] = useAnimate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = async () => {
    if (!isOpen) {
      // Sequence: container first, then stagger items
      await animate(scope.current, { height: "auto" })
      animate("li", { opacity: 1, x: 0 }, { delay: stagger(0.05) })
    } else {
      await animate("li", { opacity: 0, x: -10 }, { delay: stagger(0.03, { from: "last" }) })
      animate(scope.current, { height: 0 })
    }
    setIsOpen(!isOpen)
  }

  return (
    <div ref={scope}>
      <button onClick={toggleMenu}>Menu</button>
      <ul>
        {items.map(item => (
          <motion.li key={item} initial={{ opacity: 0, x: -10 }}>
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
```

### Selectors within scope

The `animate` function from `useAnimate` accepts CSS selectors that are scoped to the `scope` ref — they only select children of that element, not the whole document. This is intentional and prevents accidental global selections.

```tsx
animate("li", ...)          // all <li> children of scope
animate(".card", ...)       // all .card children of scope
animate(specificRef, ...)   // a specific element ref
```

### animate() return value — cancel or await

```tsx
const animation = animate(element, { x: 100 }, { duration: 1 })

await animation                   // wait for completion
animation.cancel()                // stop immediately
animation.complete()              // jump to end
animation.pause() / .play()       // control playback
animation.time = 0.5              // scrub to specific time
animation.speed = 2               // playback rate multiplier
```

---

## useAnimation — programmatic variant control

Use when you need to trigger animations from external events (data fetch, WebSocket, etc.) and coordinate across many elements using variant names.

```tsx
import { useAnimationControls } from "framer-motion"

function Dashboard() {
  const controls = useAnimationControls()

  useEffect(() => {
    socket.on("alert", async () => {
      await controls.start("pulse")
      controls.start("idle")
    })
  }, [])

  return (
    <motion.div
      animate={controls}
      variants={{
        idle: { boxShadow: "0 0 0 rgba(239,68,68,0)" },
        pulse: {
          boxShadow: ["0 0 0 rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.8)", "0 0 0 rgba(239,68,68,0)"],
          transition: { duration: 0.8 }
        }
      }}
    />
  )
}
```

---

## Performance notes

- **Prefer `style={{ x, opacity }}` over `animate={{ x, opacity }}`** when values change every frame (e.g. cursor tracking) — avoids the animation scheduler overhead.
- Motion values update via the WAAPI scheduler, bypassing React's reconciler entirely for interpolated values.
- Use `useMotionValueEvent` instead of `useEffect` + `.on()` — it handles cleanup automatically.
- `useTransform` chains are lazy — they only compute when subscribed by a rendered element.
