# Design System Specification: The Academic Monolith

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Archive"**
This design system moves beyond simple flashcards to create an environment of "High-Stakes Focus." Drawing inspiration from premium editorial journals and high-performance engineering tools like Linear, the system treats information as a sacred asset.

We break the "template" look by rejecting the standard 1px box-model. Instead of boxes inside boxes, we use **Tonal Architecture**. By utilizing intentional asymmetry—such as oversized display typography paired with compact, utilitarian data labels—we create a rhythmic hierarchy that guides the eye through complex information without visual fatigue.

---

## 2. Colors & Surface Philosophy

The palette is rooted in a deep, nocturnal foundation that prioritizes optical comfort during long study sessions.

### The "No-Line" Rule

**Explicit Instruction:** Prohibit the use of `1px solid` borders for sectioning. Structural boundaries must be defined exclusively through background color shifts.

- **The Technique:** A `surface-container-low` section sitting on a `surface` background creates a "natural seam" that is felt rather than seen. This removes visual "noise" and allows the content to breathe.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers—stacked sheets of heavy-stock paper or frosted glass.

- **Level 0 (Base):** `surface` (#faf8ff) or `surface_dim` (#d2d9f4).
- **Level 1 (Sections):** `surface_container_low` (#f2f3ff).
- **Level 2 (Active Cards):** `surface_container_highest` (#dae2fd) or `surface_container_lowest` (#ffffff) for maximum pop.

### The "Glass & Gradient" Rule

To elevate the "Academic" feel into "Premium," use Glassmorphism for floating navigation and overlays.

- **Implementation:** Apply `surface` with 80% opacity and a `backdrop-blur: 12px`.
- **Signature Textures:** For primary CTAs, do not use flat fills. Use a subtle linear gradient from `primary` (#2a14b4) to `primary_container` (#4338ca) at a 135-degree angle. This provides a "jewel-like" depth that feels intentional and authoritative.

---

## 3. Typography

The system relies on **Inter** to bridge the gap between technical precision and readability.

- **Display (lg/md/sm):** Used for "Chapter" level milestones. Set with a tight `-0.02em` letter-spacing to feel "architectural."
- **Headline & Title:** The "Curator's Voice." These levels use `on_surface` (#131b2e) to provide high-contrast anchors for the eye.
- **Body (lg/md/sm):** Optimized for long-form cognition. Use `on_surface_variant` (#464554) for secondary body text to reduce optical vibration against the bright background.
- **Labels:** The "Utility Layer." Use `label-md` in `primary` (#2a14b4) with uppercase styling for metadata (e.g., "LAST STUDIED" or "DIFFICULTY").

---

## 4. Elevation & Depth

### The Layering Principle

Depth is achieved through **Tonal Layering**, not shadows.

- **Example:** To make a study deck stand out, place a `surface_container_lowest` card on a `surface_container_low` background. The slight shift in luminosity creates a soft, natural lift.

### Ambient Shadows

When an element must float (e.g., a Modal or Popover):

- **Shadow Specs:** `0px 20px 40px rgba(19, 27, 46, 0.06)`.
- **Note:** The shadow color is a tinted version of `on_surface`, ensuring it looks like ambient light occlusion rather than a "dirty" grey drop-shadow.

### The "Ghost Border" Fallback

If a border is required for accessibility (e.g., high-contrast mode), use a **Ghost Border**:

- `outline_variant` (#c7c4d7) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons

- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text, `md` (0.375rem) corner radius.
- **Secondary:** `surface_container_high` background with `on_surface` text. No border.
- **Tertiary:** Ghost style. Transparent background, `primary` text. Becomes `surface_container` on hover.

### Study Cards & Lists

- **Rule:** Forbid divider lines.
- **Alternative:** Use `Spacing 4` (1.4rem) to separate list items. For focused "Card" views, use a subtle `surface_container_lowest` fill to encapsulate the content.
- **Interactive State:** On hover, a card should shift from `surface_container` to `surface_container_high` with a 200ms ease-in-out transition.

### Input Fields

- **Style:** Minimalist underline or subtle background fill (`surface_container_low`).
- **Focus:** Transition the background to `surface_container_highest` and apply a 2px "Ghost Border" in `primary`.

### Specialized Component: The Progress Monolith

- A custom progress bar using `surface_container_highest` as the track and a `primary` to `primary_fixed` gradient for the fill.
- Height should be minimal (4px) to remain "Serious and Professional."

---

## 6. Do’s and Don’ts

### Do

- **Do** use asymmetrical margins. For example, a wider left margin for titles to create an editorial "gutter" feel.
- **Do** use `Spacing 16` (5.5rem) and `Spacing 20` (7rem) for page-level padding to emphasize a "Calm" brand personality.
- **Do** use `primary_fixed` for subtle highlights in text (like a digital highlighter).

### Don’t

- **Don’t** use pure black (#000000). Use `on_surface` (#131b2e) for all deep tones.
- **Don’t** use "Rounded Full" pill shapes for anything other than status tags (Chips). Functional elements should stay within the `md` to `lg` roundedness scale to maintain a "Professional" edge.
- **Don’t** use traditional "alert" yellows. For warnings, use `tertiary` (#692400) and `tertiary_container` (#8f3400) for a more sophisticated, academic warning tone.
