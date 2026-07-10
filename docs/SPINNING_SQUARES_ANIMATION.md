# Spinning Squares Animation - Step by Step

## What You See

12 white squares (12×12 pixels each) start stacked at the center. Over 5 seconds:

1. They spread out into a circle (radius = 144px)
2. The circle spins for another 2.5 seconds
3. Repeats forever

---

## The Timer

```
progress goes from 0 → 720° over 5 seconds, then resets

Time:    0s        1.25s      2.5s       3.75s      5s → reset
         |----------|----------|----------|----------|
Progress: 0°        180°       360°       540°       720°
          │                    │                     │
          Start                Circle formed         All spinning together
```

---

## Each Square's "Stop Angle"

Each square has a `finalAngle` - the angle where it stops rotating and locks into position.

| Square | Formula  | Stop Angle            |
| ------ | -------- | --------------------- |
| ind=0  | 30° × 11 | **330°** (stops last) |
| ind=1  | 30° × 10 | **300°**              |
| ind=2  | 30° × 9  | **270°**              |
| ind=3  | 30° × 8  | **240°**              |
| ind=4  | 30° × 7  | **210°**              |
| ind=5  | 30° × 6  | **180°**              |
| ind=6  | 30° × 5  | **150°**              |
| ind=7  | 30° × 4  | **120°**              |
| ind=8  | 30° × 3  | **90°**               |
| ind=9  | 30° × 2  | **60°**               |
| ind=10 | 30° × 1  | **30°**               |
| ind=11 | 30° × 0  | **0°** (stops first)  |

---

## Following ONE Square Through Time

Let's trace **Square 2** (ind=2, finalAngle=270°):

### Phase 1: Rotating (0s → ~1.9s)

```
Time   | progress | rotate calculation              | rotate | What happens
-------|----------|--------------------------------|--------|---------------------------
0.0s   | 0°       | min(270°, 0°) = 0°             | 0°     | No rotation yet
0.5s   | 72°      | min(270°, 72°) = 72°           | 72°    | Rotating...
1.0s   | 144°     | min(270°, 144°) = 144°         | 144°   | Rotating...
1.5s   | 216°     | min(270°, 216°) = 216°         | 216°   | Rotating...
1.875s | 270°     | min(270°, 270°) = 270°         | 270°   | REACHED final angle!
```

When `rotate === finalAngle`, the square springs outward 144px to form the circle.

### Phase 2: Waiting (1.9s → 2.5s)

```
Time   | progress | rotate calculation              | rotate | What happens
-------|----------|--------------------------------|--------|---------------------------
2.0s   | 288°     | min(270°, 288°) = 270°         | 270°   | Stays at 270° (capped)
2.25s  | 324°     | min(270°, 324°) = 270°         | 270°   | Still waiting
2.5s   | 360°     | min(270°, 360°) = 270°         | 270°   | Circle complete!
```

### Phase 3: Spinning with everyone (2.5s → 5s)

After 360°, a new rule kicks in: "Has progress passed my spot?"

```
Condition: (progress - 360°) >= finalAngle?

Time   | progress | progress - 360° | >= 270°? | rotate | What happens
-------|----------|-----------------|----------|--------|---------------------------
2.5s   | 360°     | 0°              | No       | 270°   | Still waiting
3.25s  | 468°     | 108°            | No       | 270°   | Still waiting
3.75s  | 540°     | 180°            | No       | 270°   | Still waiting
4.0s   | 576°     | 216°            | No       | 270°   | Still waiting
4.125s | 594°     | 234°            | No       | 270°   | Still waiting
4.375s | 630°     | 270°            | YES!     | 630°   | NOW rotating with everyone!
4.5s   | 648°     | -               | -        | 648°   | Spinning freely
5.0s   | 720°     | -               | -        | 720°   | Animation ends, resets to 0°
```

---

## Why This Creates a Circle

The magic is in the **transform order**:

```tsx
transform: [
  { rotate: '270deg' }, // 1. First, rotate the coordinate system
  { translateY: -144 } // 2. Then move "up" in the rotated system
];
```

When you rotate first, "up" changes direction:

```
Square 11 (0°):    "up" = actual up       ↑
Square 8 (90°):    "up" = actual right    →
Square 5 (180°):   "up" = actual down     ↓
Square 2 (270°):   "up" = actual left     ←
```

So all squares move "up" by 144px, but they each face different directions, creating a circle!

```
                    ind=11 (0°)
                        ↑
          ind=10 (30°)  │  ind=0 (330°)
                   ╲    │    ╱
                    ╲   │   ╱
        ind=9 (60°) ─── ● ─── ind=1 (300°)
                    ╱   │   ╲
                   ╱    │    ╲
          ind=8 (90°)   │  ind=2 (270°)
                        ↓
                    ind=5 (180°)
```

---

## The Translation Logic

```tsx
translateY = useDerivedValue(() => {
  if (rotate.value === finalAngle) {
    return withSpring(-144); // Spring outward to circle position
  }
  // ... other cases for smooth initial stacking
});
```

Each square springs to **-144px** (the circle radius) when it reaches its final angle. Since they're all rotated differently, this creates the circular formation.

---

## Summary

| Time      | What's Happening                                                                   |
| --------- | ---------------------------------------------------------------------------------- |
| 0s        | All 12 squares stacked at center, rotate = 0°                                      |
| 0s → 2.5s | Squares rotate one by one, each stopping at their finalAngle and springing outward |
| 2.5s      | Circle is formed, all squares at 144px from center                                 |
| 2.5s → 5s | Entire circle rotates together (each square now follows progress)                  |
| 5s        | Reset to 0, animation repeats                                                      |

The key insight: **rotate-then-translate** makes "move up" go in different directions for each square, naturally forming a circle.
