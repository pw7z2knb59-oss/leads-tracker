Continuing from Section 8.

---

## 8. Figma Build Setup Guide (Practical)

This section tells you exactly how to translate System D into a working Figma file. Follow this in order.

---

### Step 1: Create the Local Variables / Color Styles Structure

Create a local color styles library organized into three groups. Use slash notation for grouping.

**Primitives group** (create these first — they are referenced by everything):

```
Primitives/black          #000000
Primitives/onyx           #131314
Primitives/charcoal       #1C1C1E
Primitives/graphite       #2A2A2C
Primitives/steel          #3A3A3C
Primitives/iron           #6B6B6B
Primitives/silver         #999999
Primitives/ash            #C5C5C3
Primitives/dust           #D7D7D3
Primitives/bone           #E5E5E3
Primitives/cloud          #EBEBEA
Primitives/mist           #F0F0EE
Primitives/fog            #F5F5F3
Primitives/white          #FFFFFF

Primitives/yale-blue           #003D59
Primitives/yale-blue-hover     #004D70
Primitives/yale-blue-active    #002E44
Primitives/yale-blue-light     #4A8BA8
Primitives/yale-blue-subtle    #E6EDF1
Primitives/yale-blue-deep      #0A1A24

Primitives/khaki           #B1A599
Primitives/khaki-light     #C8BFB6
Primitives/khaki-dark      #97877A
Primitives/khaki-subtle    #F2EFEC
Primitives/khaki-deep      #1A1714

Primitives/success              #2D5A3D
Primitives/success-subtle-lt    #EDF5F0
Primitives/success-subtle-dk    #0D1A12
Primitives/warning              #8A6914
Primitives/warning-subtle-lt    #F8F3E6
Primitives/warning-subtle-dk    #1A1508
Primitives/danger               #9A2B2B
Primitives/danger-subtle-lt     #F8ECEC
Primitives/danger-subtle-dk     #0D0D0D
```

**Dark shell semantic group:**

```
Dark/bg/canvas          #000000
Dark/bg/surface         #131314
Dark/bg/elevated        #1C1C1E
Dark/bg/hover           #2A2A2C
Dark/bg/inverse         #FFFFFF
Dark/bg/subtle          #000000

Dark/text/primary       #FFFFFF
Dark/text/secondary     #D7D7D3
Dark/text/muted         #6B6B6B
Dark/text/inverse       #131314

Dark/border/subtle      rgba(255,255,255,0.08)
Dark/border/strong      rgba(255,255,255,0.16)
Dark/border/inverse     #FFFFFF

Dark/accent/primary          #003D59
Dark/accent/primary-subtle   #0A1A24
Dark/accent/warm             #B1A599
Dark/accent/warm-subtle      #1A1714

Dark/focus/ring         #4A8BA8

Dark/state/success          #2D5A3D
Dark/state/success-subtle   #0D1A12
Dark/state/warning          #8A6914
Dark/state/warning-subtle   #1A1508
Dark/state/danger           #9A2B2B
Dark/state/danger-subtle    #0D1A1D

Dark/interactive/default          #FFFFFF
Dark/interactive/hover            #E5E5E3
Dark/interactive/active           #D7D7D3
Dark/interactive/disabled         #3A3A3C
Dark/interactive/default-text     #131314
```

**Light shell semantic group:**

```
Light/bg/canvas         #FFFFFF
Light/bg/surface        #F5F5F3
Light/bg/elevated       #EBEBEA
Light/bg/hover          #F0F0EE
Light/bg/inverse        #000000
Light/bg/subtle         #F0F0EE

Light/text/primary      #131314
Light/text/secondary    #6B6B6B
Light/text/muted        #999999
Light/text/inverse      #FFFFFF

Light/border/subtle     #E5E5E3
Light/border/strong     #D7D7D3
Light/border/inverse    #131314

Light/accent/primary          #003D59
Light/accent/primary-subtle   #E6EDF1
Light/accent/warm             #B1A599
Light/accent/warm-subtle      #F2EFEC

Light/focus/ring        #003D59

Light/state/success          #2D5A3D
Light/state/success-subtle   #EDF5F0
Light/state/warning          #8A6914
Light/state/warning-subtle   #F8F3E6
Light/state/danger           #9A2B2B
Light/state/danger-subtle    #F8ECEC

Light/interactive/default          #131314
Light/interactive/hover            #2A2A2C
Light/interactive/active           #3A3A3C
Light/interactive/disabled         #C5C5C3
Light/interactive/default-text     #FFFFFF
```

**Warm shell semantic group:**

```
Warm/bg/canvas          #B1A599
Warm/bg/surface         #B1A599
Warm/bg/elevated        #C8BFB6
Warm/bg/hover           #97877A
Warm/bg/inverse         #131314
Warm/bg/subtle          #97877A

Warm/text/primary       #131314
Warm/text/secondary     #2A2A2C
Warm/text/muted         #3A3A3C
Warm/text/inverse       #FFFFFF

Warm/border/subtle      rgba(0,0,0,0.10)
Warm/border/strong      rgba(0,0,0,0.20)
Warm/border/inverse     #131314

Warm/accent/primary          #003D59
Warm/accent/primary-subtle   #E6EDF1
Warm/accent/warm             #97877A
Warm/accent/warm-subtle      #C8BFB6

Warm/focus/ring         #003D59

Warm/state/success          #2D5A3D
Warm/state/success-subtle   #EDF5F0
Warm/state/warning          #8A6914
Warm/state/warning-subtle   #F8F3E6
Warm/state/danger           #9A2B2B
Warm/state/danger-subtle    #F8ECEC

Warm/interactive/default          #131314
Warm/interactive/hover            #2A2A2C
Warm/interactive/active           #000000
Warm/interactive/disabled         #97877A
Warm/interactive/default-text     #FFFFFF
```

**Key rule:** When applying fills to components in Figma, always apply from the Dark/, Light/, or Warm/ groups — never from Primitives/. Primitives are reference values only.

---

### Step 2: Create Text Styles

Create all text styles with these exact names. Font: Inter for everything except Wordmark/Default.

```
Display/Hero       80px / 700 / LH 84px / LS -0.02em / uppercase
Display/Default    56px / 700 / LH 60px / LS -0.02em
Heading/H1         40px / 700 / LH 44px / LS -0.02em
Heading/H2         28px / 600 / LH 32px / LS -0.01em
Heading/H3         20px / 600 / LH 24px / LS -0.01em
Body/Default       14px / 400 / LH 22px / LS 0em
Body/Small         12px / 400 / LH 18px / LS 0em
Label/Meta         11px / 500 / LH 16px / LS 0.06em / uppercase
Label/Caption      11px / 400 / LH 16px / LS 0em
Button/Default     13px / 600 / LH 13px / LS 0.04em / uppercase
Button/Large       15px / 600 / LH 15px / LS 0.03em / uppercase
Mono/Default       12px / 400 / LH 18px (1.5×) — JetBrains Mono
Wordmark/Default   12px / 700 / LS 0.08em / uppercase — 911 Porsche
```

**Note on Button/Default:** The small button (`sm` size) uses 11px / 0.06em — this matches the Label/Meta style in all properties except it is a button, not a label. You may share the same Figma text style for both, but keep them labeled separately for clarity.

---

### Step 3: Create Effect Styles (Shadows)

Create these as Figma effect styles:

```
Shadow/None       —
Shadow/XS         X:0 Y:1 Blur:2 Spread:0 Color:rgba(0,0,0,0.05)
Shadow/SM         X:0 Y:2 Blur:4 Spread:0 Color:rgba(0,0,0,0.08)
Shadow/MD         X:0 Y:4 Blur:12 Spread:0 Color:rgba(0,0,0,0.12)
Shadow/LG         X:0 Y:8 Blur:24 Spread:0 Color:rgba(0,0,0,0.16)
Shadow/Overlay    X:0 Y:16 Blur:48 Spread:0 Color:rgba(0,0,0,0.24)
```

---

### Step 4: Create Grid / Layout Styles

Create these as Figma grid styles:

```
Grid/12-column    12 columns / gutter 24px / centered
```

For component frames, note the spacing tokens:
- TopBar height: 56px
- SideRail collapsed width: 64px
- SideRail expanded width: 240px
- Max content width: 1200px
- Max wide: 1400px
- Max prose: 640px

---

### Step 5: Page Structure in Figma

Organize the Figma file as follows:

```
Page 1: 🏗 Foundations
  — Color primitives grid (all primitives shown as swatches)
  — Semantic color table (dark, light, warm side by side)
  — Typography scale (all 13 text styles shown in a single frame)
  — Spacing scale (4px grid visualization)
  — Radius scale (0, 2, 4, 6, 8 shown as squares)
  — Shadow scale (all 5 shadows shown on a surface)
  — Motion reference (duration + easing label reference)

Page 2: 🧩 Components
  — Button (all 4 variants × 3 sizes × 6 states = 72 states)
  — Badge (all 4 variants)
  — Input (all 5 states)
  — Card/Default
  — Card/Elevated
  — Card/Media (with 16:9 and 4:3 aspect ratio variants)
  — TopBar
  — SideRail (collapsed state, showing default and active item)
  — Footer (light shell)
  — Modal
  — Spinner (all 3 sizes)
  — EmptyState

Page 3: 🖥 Screens
  — Reference Screen — Dark Shell (full composition matching SlateReference.jsx)
  — WarmHero Section — Warm Shell
  — Footer Section — Light Shell

Page 4: ✅ QA
  — Shell discipline check frames (one per shell)
  — Accent budget check (viewport with 1 accent CTA labeled)
  — Focus ring coverage documentation
  — Contrast annotation (copy the contrast table from Section 3)
```

---

### Step 6: Component Set Organization in Figma

For each component, create a **Component Set** with Variant Properties.

**Button variant properties:**
- `Variant`: primary / secondary / accent / ghost
- `Size`: sm / md / lg
- `State`: default / hover / active / focused / disabled / loading

This gives 4 × 3 × 6 = 72 button instances. Only the accent button variant needs the accent budget annotation ("max 1 per viewport").

**Badge variant properties:**
- `Variant`: default / success / warning / danger

**Input variant properties:**
- `State`: default / hover / focused / error / disabled

**Card variant properties:**
- `Variant`: default / elevated
- `State`: default / hover

**SideRail item variant properties:**
- `State`: default / active / hover

---

### Step 7: Variant Naming Conventions

Follow this convention when naming variants in Figma:

- Property names: PascalCase (Variant, Size, State)
- Property values: lowercase (primary, secondary, sm, md, default, hover)
- No spaces in property values
- Shell designation: use frame-level naming (e.g., "TopBar — Dark Shell")

---

### Step 8: Preserving Shell Discipline in Figma

- Create three master "Shell Canvas" frames — one per shell — each with the correct background color.
- Label them clearly: [Dark Shell], [Light Shell], [Warm Shell].
- All components placed inside a shell canvas frame should use the corresponding semantic color group (Dark/, Light/, Warm/).
- Never drop a light-shell component into a dark-shell frame without changing its color styles to the correct shell.
- Add a visible annotation layer on each shell canvas labeling which shell it is.
- When building multi-section screens (e.g., dark app + warm hero + light footer as in the reference), create three stacked frames — one per shell section — never one frame mixing shells.

---

### Step 9: Keeping Accent Usage Controlled in Figma

- When placing an accent button on any screen artboard, immediately scan the entire artboard for other accent buttons. There should be zero others.
- Add a Figma annotation label to every accent button in any screen composition: "Accent CTA — max 1 per viewport."
- On the QA page, maintain a checklist frame that documents accent button count per artboard.
- In the components page, mark the accent button variant with a note: "Budget: ≤5% surface area. Max 1 per viewport."

---

## 9. Do / Don't Reference

### Color Usage

**Do:**
- Use `Dark/bg/surface` (`#131314`) as the fill for cards, TopBar, and SideRail in the dark shell.
- Use `Dark/text/secondary` (`#D7D7D3`) for supporting text (nav labels, descriptions, secondary copy).
- Use `Dark/border/subtle` (`rgba(255,255,255,0.08)`) for all card and divider borders in the dark shell.
- Use the warm shell (`#B1A599` canvas) only for hero/feature callout sections, never for app chrome.
- Keep state colors (success, warning, danger) to badges and feedback indicators only.

**Don't:**
- Don't use Yale Blue (`#003D59`) as a card fill, section background, or body text color.
- Don't use more than 1 accent-filled button in any single viewport.
- Don't use any color not in this system's token list.
- Don't use the primitive tokens directly in components — always use semantic tokens.
- Don't add gradients to any surface, overlay, or component.

---

### Typography Usage

**Do:**
- Use Inter for all UI and display text without exception.
- Apply tight tracking (`-0.02em`) to display and H1 text only.
- Apply `0.06em` tracking to all uppercase labels (Meta, Badge, Button text).
- Use the sl-meta style (11px/500/uppercase) for section overlines and column headings.
- Use sl-caption (11px/400) for timestamps, counts, and metadata.

**Don't:**
- Don't use 911 Porsche for anything except the SLATE wordmark (.sl-wordmark).
- Don't apply tight tracking to body text (14px or 12px sizes).
- Don't use more than 2 font weights in a single component.
- Don't use JetBrains Mono for UI text — only for code, credit values, and technical data.
- Don't vary font sizes arbitrarily — only use values in the defined type scale.

---

### Spacing / Layout

**Do:**
- Use only values on the 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- Use 20px card padding at comfortable density.
- Use 32px gaps between sections at comfortable density.
- Set max-width to 1200px for all content sections.
- Use 24px grid gutters.

**Don't:**
- Don't use arbitrary spacing values like 10px, 14px, 18px, or 22px.
- Don't set max-width beyond 1400px for any content container.
- Don't mix comfortable and compact density in the same section without explicit design intent.
- Don't add spacing outside the defined token set.

---

### Components

**Do:**
- Include all 6 button states (default, hover, active, focused, disabled, loading) in component sets.
- Apply aria-label to every icon-only button.
- Use the dashed border for empty states (1px dashed --sl-border-strong).
- Use --sl-bg-elevated + --sl-shadow-md for elevated cards.
- Use 4px radius for buttons and inputs, 6px for cards, 8px for modals.

**Don't:**
- Don't add shadows to buttons.
- Don't use more than one primary button per logical group.
- Don't use pill radius on any component.
- Don't use colored fills on card backgrounds (monochrome or image only).
- Don't render the warm shell for TopBar or SideRail (app chrome is always dark in the reference).

---

### Accent Usage

**Do:**
- Use Yale Blue for: the single revenue CTA per viewport, focus rings, active SideRail indicator (2px left border), link text where appropriate, credit/monetary value display.
- Keep Yale Blue under 5% of any viewport's total surface area at all times.

**Don't:**
- Don't use Yale Blue as a background fill for large surfaces.
- Don't place two accent (Yale Blue) buttons in the same viewport.
- Don't use Yale Blue on body text.
- Don't use Yale Blue for decorative borders or dividers.
- Don't use Khaki as a UI accent color within the dark or light shell (it is a shell — not a component accent in those contexts).

---

### Shell Usage

**Do:**
- Assign exactly one shell per layout section.
- Use dark shell as the default app chrome.
- Use warm shell for feature hero sections and premium callout moments.
- Use light shell for marketing footers and external-facing document sections.

**Don't:**
- Don't nest one shell inside another.
- Don't mix shell classes in the same section container.
- Don't use the warm shell as the primary app UI shell.
- Don't apply shell-specific fills directly — always apply via the shell's semantic color group.

---

## 10. QA Checklist (Plain English)

**Source mapping:** qa/qa-checklist.json

---

| ID | Category | Check | Pass Condition | Common Failure Example |
|---|---|---|---|---|
| QA-001 | Color | All component colors use semantic tokens (--sl-*), never hardcoded hex values. | Zero hardcoded hex values in any component outside the token definition files. | A card with fill: #1C1C1E instead of Dark/bg/elevated. |
| QA-002 | Color | Yale Blue (#003D59) surface area is ≤5% of any viewport. Maximum 1 accent button visible at once. Maximum 6 accent reference types total. | Scroll through the screen. Count accent CTA buttons visible. Should be 1 or 0. | A hero section with an accent button AND an accent badge AND an accent link all visible at the same time. |
| QA-003 | Contrast | Core text/background pairs meet WCAG AA (4.5:1 normal text, 3:1 large text). Test the pairs listed in the source. | All defined contrast pairs pass: White on Onyx (15.4:1), Dust on Onyx (10.2:1), Onyx on Fog (13.5:1), Onyx on Khaki (5.8:1). | Using --sl-text-muted (Iron, 3.22:1 on Onyx) for a required readable body paragraph. |
| QA-004 | Accessibility | All interactive elements show a visible focus ring when tabbed to. | Tab through every button, input, link, and card. Focus ring must appear using --sl-focus-ring. | A ghost button with no focus ring style applied. |
| QA-005 | Shell | One shell family per screen section. No nested shells. | Visual scan: no section container has both dark and light semantic tokens active. | A light-shell card placed inside a dark-shell section container without re-scoping the shell class. |
| QA-006 | Geometry | All border-radius values are from the approved tiers: 0, 2, 4, 6, 8. Zero pill shapes. | No radius values outside 0, 2, 4, 6, 8 anywhere. No 9999px or 50% on UI components. | A button with border-radius: 20px. A tag with border-radius: 9999px. |
| QA-007 | Typography | Only approved font families in use: Inter (body/UI), 911 Porsche (wordmark), JetBrains Mono (code). | No other font families referenced anywhere. | Accidentally applying a system font stack instead of Inter. |
| QA-008 | Typography | 911 Porsche used ONLY for .sl-wordmark — never in body copy, buttons, headings, nav, or labels. | Zero uses of 911 Porsche font outside the wordmark element. | A section headline set in 911 Porsche because it "looks branded." |
| QA-009 | Spacing | All spacing values align to the 4px grid. | No arbitrary values like 5px, 10px, 14px, 18px, 22px in padding/margin/gap. | A card with padding: 15px instead of 16px. |
| QA-010 | Motion | All transitions use token durations and easing curves. | No hardcoded transition: all 0.3s ease or similar. All transitions reference --sl-duration-* and --sl-ease-*. | A button hover with transition: 0.25s ease-in-out hardcoded. |
| QA-011 | Component | Button state matrix is complete: default, hover, active, focus-visible, disabled, loading. | All 6 states render correctly for all 4 button variants. Cross-reference with component-contracts.json. | A secondary button with no visible disabled state. |
| QA-012 | Component | Input state matrix is complete: default, hover, focused, error, disabled. | All 5 input states render correctly with correct token bindings. | An input with no visible error state border. |
| QA-013 | Layout | Max content width is constrained to 1200px. | No content element extends beyond 1200px. | A grid of cards with no max-width constraint that bleeds to 1600px on a large monitor. |
| QA-014 | Responsive | Layout adapts correctly at breakpoints: 640px, 768px, 1024px, 1280px. | No horizontal scroll or overflow at any breakpoint. | The 4-column outputs grid causing horizontal scroll on a 768px viewport. |
| QA-015 | Brand Identity | No gradients anywhere in the system (except skeleton loading shimmer). | Zero gradient fills on any component, surface, or background. | A hero card with a subtle dark-to-transparent overlay gradient on the image area. |
| QA-016 | Brand Identity | Maximum 1 accent CTA button visible per viewport at any time. | Scroll through each viewport section. Count accent-filled buttons. Never more than 1. | Both a "Start Generating" and a "Upgrade" button showing in Yale Blue fill in the same viewport. |
| QA-017 | Accessibility | prefers-reduced-motion is respected — all animation durations collapse to 0ms. | Enable reduced motion in OS. Verify all transitions and animations stop. | The spinner still spinning under reduced motion. |
| QA-018 | Accessibility | All icon-only buttons have aria-label. | Inspect all icon buttons. Every one must have an accessible text label. | The SideRail Settings icon button rendered with no aria-label. |
| QA-019 | Brand Identity | Visual coherence with rara.png (the visual benchmark). | Side-by-side comparison passes the "squint test" — same brand feel at a glance. | A composition that technically uses the token values but feels visually different from the benchmark due to layout or density decisions. |
| QA-020 | Infrastructure | App builds and renders without errors. All routes functional. Zero console errors. | npm run build completes clean. All screens render. Browser console is clear. | A missing font file causing the 911 Porsche font not to load, breaking the wordmark. |

---

## 11. Open Questions / Ambiguities

The following items are not fully resolved between source files. They are listed for team review, not filled with guesses.

---

**1. `--sl-yale-blue-hover` and `--sl-yale-blue-active` not in tokens.json primitives**

`--sl-yale-blue-hover` (`#004D70`) and `--sl-yale-blue-active` (`#002E44`) are defined in `slate-tokens.css` as root-level CSS custom properties and used directly (as hardcoded hex strings) in the accent button state matrix in `component-contracts.json`. They do not appear in `tokens/tokens.json` as named primitive entries.

*Impact:* If the token governance process requires all values to exist in tokens.json, these two values are undocumented there. For Figma purposes, treat them as real values and create color styles for them as shown in Section 8.

---

**2. `--sl-interactive-default-text` only defined in dark shell CSS block**

The CSS variable `--sl-interactive-default-text` appears in the dark shell block of `slate-tokens.css` but is not re-declared in the light or warm shell blocks. It resolves to `#131314` (onyx) for dark shell. The component-contracts.json references it as `"var(--sl-interactive-default-text)"` in the primary button state matrix.

*Impact:* In a light or warm shell context, if a primary button is rendered and references this variable, it will inherit the dark shell value (`#131314`) rather than a light-shell-specific override. The light shell primary button (`interactive-default` = onyx) with onyx text (`interactive-default-text` = onyx) would be invisible.

*Note:* The light shell interactive default is already `#131314` (onyx fill), and the text should logically be `#FFFFFF` (white). The CSS block for light shell includes `--sl-interactive-default-text: var(--sl-white)` which is consistent. Check the actual CSS — on re-reading: the light shell block in slate-tokens.css DOES include `--sl-interactive-default-text: var(--sl-white)`. This is not a real conflict — both shells define this variable. Confirmed: both dark and light shell blocks define `--sl-interactive-default-text`.

---

**3. `--sl-border-medium` (1.5px) usage is not explicitly assigned to any component**

`--sl-border-medium` is defined as `1.5px` and is described in `tokens/tokens.json` as a border width token. However, no component in `component-contracts.json` or reference/SlateReference.jsx explicitly references this value. The `icon.stroke` token (`1.5px`) is a separate definition.

*Impact:* Low. For Figma, create the style but mark it as "reserved — not currently assigned to a named component."

---

**4. "Badge variant: accent" listed in governance but not in component-contracts.json**

`governance-model.json` lists "Badge variant: accent" as one of the allowed contexts for Yale Blue. However, `component-contracts.json` defines only four badge variants: `default`, `success`, `warning`, `danger`. No `accent` badge variant is defined with token bindings.

*Impact:* Do not create an "accent" badge variant in Figma based on governance alone without the token bindings being specified. Flag this as a gap for the design systems team to resolve if an accent badge is needed.

---

**5. "Info feedback state" referenced in governance but not defined in tokens**

`governance-model.json` lists "Info feedback state" as an allowed context for Yale Blue. No `info` state tokens are defined in `tokens/tokens.json`, `slate-tokens.css`, or `component-contracts.json`.

*Impact:* Do not create an `info` state badge or component variant in Figma. Flag this as an intentional gap or future addition. If an info badge is needed, it would logically use `--sl-accent-primary` for text and `--sl-accent-primary-subtle` for background — but this is not confirmed in the source files.

---

**6. SideRail expanded state (240px) not demonstrated in reference implementation**

`tokens/tokens.json` and `slate-tokens.css` define both `sidebar.collapsed` (64px) and `sidebar.expanded` (240px). The reference implementation only demonstrates the collapsed state (64px icon-only rail). No expanded state layout, behavior, or typography is defined in the component contract or reference.

*Impact:* Build only the collapsed SideRail in Figma based on what is defined. Document the 240px expanded width as a future state and do not invent its layout.

---

**7. Provenance confidence on several primitive tokens**

Multiple primitive tokens have `"provenance": "inferred"` with confidence as low as 0.75 (state colors). The system note in tokens.json states: "Every value cross-referenced against rara.png." Values with lower confidence are still the canonical system values and should be used as defined, but token owners should verify these against rara.png if the source image becomes available.

---

*End of document. Every value, rule, and spec in this document is sourced directly from the files listed in Section 1. Nothing has been invented.*