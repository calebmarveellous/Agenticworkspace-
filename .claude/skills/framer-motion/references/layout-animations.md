# Layout Animations — Reference

Layout animations are one of Motion's most powerful features. They automatically detect changes in an element's size, position, or order in the DOM and animate the transition using an optimized FLIP technique.

---

## `layout` prop

Add `layout` to any `motion` element. Motion measures the element before and after a render, then animates between the two positions using transforms — no re-layout jank.

```tsx
// Full layout animation (size + position)
<motion.div layout />

// Only position (skips size animation — better for text)
<motion.div layout="position" />

// Only size
<motion.div layout="size" />
```

### Accordion example

```tsx
function Accordion({ content }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      style={{ borderRadius: 8, overflow: "hidden" }}
    >
      <motion.h3 layout="position">Title</motion.h3>
      {isOpen && <p>{content}</p>}
    </motion.div>
  )
}
```

> Use `layout="position"` on text/heading elements inside a layout container — full `layout` on text causes scale distortion.

### `layoutDependency` — performance optimization

By default, Motion measures on every render. Limit measurements to specific state changes:

```tsx
<motion.nav layout layoutDependency={isOpen} />
```

---

## `layoutId` — shared element transitions (magic move)

Elements with the same `layoutId` will animate between their positions and sizes when one unmounts and another mounts. This creates seamless "expanding card" or "selected tab" effects.

```tsx
// Tab indicator that slides between selected tabs
function Tabs({ tabs, selected, onSelect }) {
  return (
    <div style={{ display: "flex" }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onSelect(tab.id)} style={{ position: "relative" }}>
          {tab.label}
          {selected === tab.id && (
            <motion.div
              layoutId="tab-indicator"          // same ID on all tabs
              style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: 2,
                background: "#3b82f6"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
```

### Expanding card pattern

```tsx
function CardGrid({ cards }) {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      {cards.map(card => (
        <motion.div
          key={card.id}
          layoutId={`card-${card.id}`}
          onClick={() => setSelectedId(card.id)}
          style={{ borderRadius: 12 }}
        >
          <motion.h2 layoutId={`card-title-${card.id}`}>{card.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={`card-${selectedId}`}    // same as the clicked card
            className="expanded-card"
            style={{ borderRadius: 24 }}        // Motion interpolates borderRadius too
          >
            <motion.h2 layoutId={`card-title-${selectedId}`}>
              {cards.find(c => c.id === selectedId).title}
            </motion.h2>
            <button onClick={() => setSelectedId(null)}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

> `layoutId` only works when both components are rendered at different times (one unmounts before the other mounts) OR are in separate branches. The matched elements animate between their positions.

---

## LayoutGroup — coordinating separate component trees

`LayoutGroup` makes layout animations aware of each other across separate component subtrees. Without it, sibling components don't know to animate when another changes.

```tsx
import { LayoutGroup } from "framer-motion"

// Without LayoutGroup, the other accordions don't smoothly rearrange
// when one expands. With it, they do.
function AccordionList() {
  return (
    <LayoutGroup>
      <Accordion id="a" />
      <Accordion id="b" />
      <Accordion id="c" />
    </LayoutGroup>
  )
}
```

### `id` prop — namespacing layoutIds

When multiple independent component instances use the same `layoutId` internally, they conflict. Use `LayoutGroup`'s `id` to namespace them:

```tsx
function TabGroup({ tabs, id }) {
  return (
    <LayoutGroup id={id}>            // namespaces all child layoutIds
      {tabs.map(tab => (
        <Tab key={tab.id} isSelected={...} />
      ))}
    </LayoutGroup>
  )
}

// Now two TabGroups can exist independently
<TabGroup id="nav-tabs" tabs={navTabs} />
<TabGroup id="content-tabs" tabs={contentTabs} />
```

---

## AnimatePresence — in-depth

See SKILL.md §5 for basics. Here are the advanced patterns.

### `mode="popLayout"` for list mutations

When items are removed from a list, `popLayout` immediately removes the exiting element from document flow so remaining items reflow instantly, while the exit animation plays on top:

```tsx
<AnimatePresence mode="popLayout">
  {notifications.map(n => (
    <motion.div
      key={n.id}
      layout                                    // smooth reordering of remaining items
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, margin: 0 }}
    />
  ))}
</AnimatePresence>
```

### Custom exit data with `custom` prop

When a component exits, its props are frozen. Use `AnimatePresence`'s `custom` to pass dynamic data into exit variants:

```tsx
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
}

function Slideshow({ page, direction }) {
  return (
    <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={page}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3 }}
      />
    </AnimatePresence>
  )
}
```

### Fixing layout animations with `LayoutGroup` + `mode="sync"`

When exit and layout animations compete, wrap in `LayoutGroup`:

```tsx
<LayoutGroup>
  <motion.ul layout>
    <AnimatePresence mode="sync">
      {items.map(item => (
        <motion.li layout key={item.id} exit={{ opacity: 0 }} />
      ))}
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>
```

---

## Layout animation in scrollable containers

Layout animations need to know the scroll offset of ancestor elements to position correctly.

```tsx
// Mark any overflow:scroll ancestor with layoutScroll
<motion.div layoutScroll style={{ overflow: "scroll", height: 400 }}>
  <motion.div layout />
</motion.div>
```

For `position: fixed` elements:

```tsx
// Mark position:fixed ancestors with layoutRoot
<motion.div layoutRoot style={{ position: "fixed", inset: 0 }}>
  <motion.div layout />
</motion.div>
```

---

## transition for layout animations

Control timing specifically for layout changes:

```tsx
<motion.div
  layout
  transition={{
    layout: {
      type: "spring",
      stiffness: 300,
      damping: 30
    },
    opacity: { duration: 0.2 }    // non-layout props have their own timing
  }}
/>
```

---

## Common pitfalls

### Scale distortion on children
When a parent uses `layout` and changes size, children can appear stretched. Fix by giving children their own `layout` prop:

```tsx
<motion.div layout>
  <motion.p layout="position">This text won't stretch</motion.p>
</motion.div>
```

### `layoutId` not transitioning
- Ensure both elements are wrapped in `AnimatePresence` if one unmounts
- Ensure both elements exist in a shared React tree (or use `LayoutGroup`)
- Add `transition` to the element that *enters* (not exits)

### Performance
- Use `layoutDependency` to limit when measurements happen
- Avoid animating `width`/`height` directly — use `layout` prop instead (transforms are GPU-accelerated)
- `motion.create()` must be called outside render functions to prevent animation resets
