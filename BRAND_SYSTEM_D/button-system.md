I have all files already read in full. Here is the complete button extraction — nothing redesigned, nothing added.

---

## 1. Files Scanned

| File | Relevance |
|---|---|
| brand-system/components/component-contracts.json | State matrix, token bindings, do/don'ts |
| brand-system/reference/SlateReference.jsx | Live implementation (JSX classes) |
| brand-system/css/slate-tokens.css | Resolved CSS variable values per shell |
| brand-system/tokens/tokens.json | Typography roles, radius, spacing, motion |
| brand-system/tailwind/slate-preset.js | Tailwind class value resolution |
| brand-system/governance/governance-model.json | Accent budget rules |
| brand-system/qa/qa-checklist.json | QA-011: button state matrix check |

---

## 2. Button Tokens
Every token the button system touches, with resolved values per shell.

### Radius

| Token | CSS Variable | Value | Source |
|---|---|---|---|
| radius.md | --sl-radius-md | 4px | tokens.json line 261, all 3 sizes |

All three button sizes use rounded-md / var(--sl-radius-md) / 4px. No size exception. Pills prohibited.

---

### Interactive Surface Tokens (resolved per shell)

| Token | CSS Variable | Dark Shell | Light Shell | Warm Shell |
|---|---|---|---|---|
| interactive.default | --sl-interactive-default | #FFFFFF | #131314 | #131314 |
| interactive.hover | --sl-interactive-hover | #E5E5E3 | #2A2A2C | #2A2A2C |
| interactive.active | --sl-interactive-active | #D7D7D3 | #3A3A3C | #000000 |
| interactive.disabled | --sl-interactive-disabled | #3A3A3C | #C5C5C3 | #97877A |
| interactive-default-text | --sl-interactive-default-text | #131314 | #FFFFFF | #FFFFFF |

Source: slate-tokens.css lines 251–255 (dark), 296–300 (light), 340–344 (warm)

---

### Text Tokens (used by secondary, ghost, disabled)

| Token | CSS Variable | Dark Shell | Light Shell | Warm Shell |
|---|---|---|---|---|
| text.primary | --sl-text-primary | #FFFFFF | #131314 | #131314 |
| text.secondary | --sl-text-secondary | #D7D7D3 | #6B6B6B | #2A2A2C |
| text.muted | --sl-text-muted | #6B6B6B | #999999 | #3A3A3C |

Source: slate-tokens.css lines 223–226 (dark), 272–275 (light), 317–320 (warm)

---

### Border Tokens (used by secondary button)

| Token | CSS Variable | Dark Shell | Light Shell | Warm Shell |
|---|---|---|---|---|
| border.subtle | --sl-border-subtle | rgba(255,255,255,0.08) | #E5E5E3 | rgba(0,0,0,0.10) |
| border.strong | --sl-border-strong | rgba(255,255,255,0.16) | #D7D7D3 | rgba(0,0,0,0.20) |
| border.inverse | --sl-border-inverse | #FFFFFF | #131314 | #131314 |

Source: slate-tokens.css lines 229–231 (dark), 278–280 (light), 322–324 (warm)

---

### Accent Tokens (used by accent button)

| Token | CSS Variable | All Shells |
|---|---|---|
| accent.primary | --sl-accent-primary | #003D59 |
| yale-blue-hover | --sl-yale-blue-hover | #004D70 |
| yale-blue-active | --sl-yale-blue-active | #002E44 |

Source: slate-tokens.css lines 47–49 (primitives, global).

--sl-yale-blue-hover and --sl-yale-blue-active are primitives referenced directly in the accent button — they do not remap per shell.

---

### Background Token (used for hover surface and focus ring offset)

| Token | CSS Variable | Dark Shell | Light Shell | Warm Shell |
|---|---|---|---|---|
| bg.hover | --sl-bg-hover | #2A2A2C | #F0F0EE | #97877A |
| bg.canvas | --sl-bg-canvas | #000000 | #FFFFFF | #B1A599 |

--sl-bg-canvas is used as the ring-offset-color on focus — the focus ring offset color always matches the shell's page background.

---

### Focus Token

| Token | CSS Variable | Dark Shell | Light Shell | Warm Shell |
|---|---|---|---|---|
| focus.ring | --sl-focus-ring | #4A8BA8 | #003D59 | #003D59 |

Source: slate-tokens.css lines 240 (dark), 287 (light), 331 (warm)

---

### Motion Tokens (used by all button transitions)

| Token | CSS Variable | Value |
|---|---|---|
| motion.duration.standard | --sl-duration-standard | 200ms |
| motion.easing.default | --sl-ease-default | cubic-bezier(0.25, 0.1, 0.25, 1.0) |

Source: tokens.json lines 306–307, 311 / slate-tokens.css lines 165, 169

---

### Opacity Token (used by disabled state)

| Token | CSS Variable | Value |
|---|---|---|
| opacity.disabled | --sl-opacity-disabled | 0.4 |

Source: tokens.json line 319 / slate-tokens.css line 201

---

## 3. Button Variants
Source: component-contracts.json lines 8–67, SlateReference.jsx lines 80–100

Four variants defined. All use the same radius (4px) and typography (uppercase, semibold).

---

### primary
The monochrome shell-adaptive button. Not accent. Uses the shell's strong interactive color.

| Layer | Token | Dark Resolved | Light Resolved | Warm Resolved |
|---|---|---|---|---|
| Background | --sl-interactive-default | #FFFFFF | #131314 | #131314 |
| Text | --sl-interactive-default-text | #131314 | #FFFFFF | #FFFFFF |
| Border | transparent | — | — | — |

The primary button is white-on-dark (dark shell) and black-on-light (light/warm shell). It is not the Yale Blue button. That is the accent variant.

---

### secondary
Outline button. Transparent fill, border visible.

| Layer | Token | Dark Resolved | Light Resolved | Warm Resolved |
|---|---|---|---|---|
| Background | transparent | — | — | — |
| Text | --sl-text-primary | #FFFFFF | #131314 | #131314 |
| Border | 1px solid --sl-border-strong | rgba(255,255,255,0.16) | #D7D7D3 | rgba(0,0,0,0.20) |

---

### accent
Yale Blue button. Maximum 1 per viewport. Revenue/primary CTA only.

| Layer | Token/Value | Resolved |
|---|---|---|
| Background | --sl-accent-primary | #003D59 |
| Text | #FFFFFF (hardcoded) | #FFFFFF |
| Border | transparent | — |

Note: Accent button text color is hardcoded #FFFFFF in both the JSX (text-white) and component-contracts.json. It does not use a semantic text token. This is consistent across both files. The accent button does not remap per shell — the background is always #003D59 regardless of dark/light/warm.

---

### ghost
No background, no border. Secondary text color at rest, promotes to primary on hover.

| Layer | Token | Dark Resolved | Light Resolved | Warm Resolved |
|---|---|---|---|---|
| Background | transparent | — | — | — |
| Text (default) | --sl-text-secondary | #D7D7D3 | #6B6B6B | #2A2A2C |
| Text (hover) | --sl-text-primary | #FFFFFF | #131314 | #131314 |
| Border | transparent | — | — | — |

---

## 4. Button Sizes
Source: component-contracts.json lines 12–15, SlateReference.jsx lines 75–78, tailwind/slate-preset.js spacing scale

All values confirmed consistent between the JSX (h-8, px-3, etc.) and component-contracts.json explicit pixel values.

| Size | Height | Padding X | Font Size | Letter Spacing | Radius | Icon Size |
|---|---|---|---|---|---|---|
| sm | 32px (h-8) | 12px (px-3) | 11px | 0.06em | 4px | 16px |
| md | 40px (h-10) | 16px (px-4) | 13px | 0.04em | 4px | 18px |
| lg | 48px (h-12) | 24px (px-6) | 15px | 0.03em | 4px | 20px |

All sizes: font-weight 600, text-transform uppercase, font-family Inter.

---

## 5. Button States (Full Matrix)
Source: component-contracts.json lines 21–53, SlateReference.jsx lines 80–103

### primary States

| State | Background | Text | Border | Other |
|---|---|---|---|---|
| default | --sl-interactive-default | --sl-interactive-default-text | transparent | — |
| hover | --sl-interactive-hover | --sl-interactive-default-text | transparent | — |
| active | --sl-interactive-active | --sl-interactive-default-text | transparent | — |
| focused | --sl-interactive-default | --sl-interactive-default-text | — | ring: 2px --sl-focus-ring, offset: 2px --sl-bg-canvas |
| disabled | --sl-interactive-disabled | --sl-text-muted | transparent | opacity: 0.4, cursor: not-allowed |
| loading | --sl-interactive-default | transparent | — | Spinner (sm) visible, aria-busy=true |

### secondary States

| State | Background | Text | Border | Other |
|---|---|---|---|---|
| default | transparent | --sl-text-primary | --sl-border-strong | — |
| hover | --sl-bg-hover | --sl-text-primary | --sl-border-strong | — |
| active | --sl-bg-hover | --sl-text-primary | --sl-border-inverse | — |
| focused | transparent | --sl-text-primary | — | ring: 2px --sl-focus-ring, offset: 2px --sl-bg-canvas |
| disabled | transparent | --sl-text-muted | --sl-border-subtle | opacity: 0.4 |
| loading | transparent | transparent | --sl-border-strong | Spinner (sm) |

### accent States

| State | Background | Text | Border | Other |
|---|---|---|---|---|
| default | --sl-accent-primary (#003D59) | #FFFFFF | transparent | — |
| hover | #004D70 (--sl-yale-blue-hover) | #FFFFFF | transparent | — |
| active | #002E44 (--sl-yale-blue-active) | #FFFFFF | transparent | — |
| focused | --sl-accent-primary | #FFFFFF | — | ring: 2px --sl-focus-ring, offset: 2px --sl-bg-canvas |
| disabled | --sl-interactive-disabled | --sl-text-muted | transparent | opacity: 0.4 |
| loading | --sl-accent-primary | transparent | — | Spinner (sm) |

### ghost States

| State | Background | Text | Border | Other |
|---|---|---|---|---|
| default | transparent | --sl-text-secondary | transparent | — |
| hover | --sl-bg-hover | --sl-text-primary | transparent | — |
| active | --sl-bg-hover | --sl-text-primary | transparent | — |
| focused | transparent | --sl-text-secondary | — | ring: 2px --sl-focus-ring, offset: 2px --sl-bg-canvas |
| disabled | transparent | --sl-text-muted | transparent | opacity: 0.4 |
| loading | transparent | transparent | — | Spinner (sm) |

---

## 6. Button Typography
Source: tokens.json lines 235–236 (roles.button, roles.button-lg), slate-tokens.css lines 424–440, component-contracts.json lines 16–20, SlateReference.jsx lines 75–78, 106

| Property | sm | md | lg | Source |
|---|---|---|---|---|
| Font family | Inter | Inter | Inter | All files consistent |
| Font weight | 600 | 600 | 600 | All files consistent |
| Text transform | uppercase | uppercase | uppercase | All files consistent |
| Font size | 11px | 13px | 15px | JSX / contracts |
| Letter spacing | 0.06em | 0.04em | 0.03em | JSX / contracts |
| Line height | Not explicitly set | 13px | 15px | tokens.json roles only |

Named typography roles from tokens.json:

| Role Name | Size | Weight | Line Height | Spacing | Transform |
|---|---|---|---|---|---|
| button | 13px | 600 | 13px | 0.04em | uppercase |
| button-lg | 15px | 600 | 15px | 0.03em | uppercase |

Note: There is no named typography role for the sm button size (11px / 0.06em). It exists in the reference implementation and component-contracts.json size table, but tokens.json only defines roles for md and lg text sizes. Documented as a gap in Section 8 (Conflicts).

CSS classes defined:
- .sl-button-text — 13px / 600 / line-height 13px / 0.04em / uppercase
- .sl-button-text-lg — 15px / 600 / line-height 15px / 0.03em / uppercase

Source: slate-tokens.css lines 424–440

---

## 7. Button Spacing / Padding / Layout
Source: component-contracts.json lines 12–15, SlateReference.jsx lines 75–78, 107

| Property | Value | Source |
|---|---|---|
| Layout | inline-flex, align-items: center, justify-content: center | SlateReference.jsx line 107 |
| Icon–label gap | 8px (gap-2) | SlateReference.jsx line 107 |
| Padding (sm) | 0 vertical / 12px horizontal | contracts + JSX |
| Padding (md) | 0 vertical / 16px horizontal | contracts + JSX |
| Padding (lg) | 0 vertical / 24px horizontal | contracts + JSX |
| Height (sm) | 32px fixed | contracts + JSX |
| Height (md) | 40px fixed | contracts + JSX |
| Height (lg) | 48px fixed | contracts + JSX |
| Border width (secondary) | 1px | contracts |
| Border width (focus ring) | 2px | JSX + CSS global |
| Focus ring offset | 2px | JSX line 110 |
| Radius | 4px (all sizes) | contracts + JSX |
| Shadow | none (all states, all variants) | no shadow defined anywhere |

---

## 8. Conflicts and Mismatches
Three real conflicts found between files.

---

### Conflict 1 — Disabled state: single style vs per-variant style

File A: `SlateReference.jsx` lines 102, 112

The reference applies one flat disabled class to all variants when disabled=true:

```
bg-[var(--sl-interactive-disabled)] text-[var(--sl-text-muted)] opacity-40 cursor-not-allowed
```

This overrides the variant-specific classes entirely. All four variants look identical when disabled.

File B: `component-contracts.json` lines 35, 51

The contracts define per-variant disabled states:

| Variant | Disabled bg | Disabled text | Disabled border |
|---|---|---|---|
| primary | --sl-interactive-disabled | --sl-text-muted | transparent |
| secondary | transparent | --sl-text-muted | --sl-border-subtle |
| accent | --sl-interactive-disabled | --sl-text-muted | transparent |
| ghost | transparent | --sl-text-muted | transparent |

Secondary and ghost variants keep transparent background in the contracts, but the reference's flat disabled class applies --sl-interactive-disabled background to them too.

Practical impact: Secondary disabled should show transparent background with subtle border per contract; reference implementation renders it with a filled disabled background instead.

---

### Conflict 2 — Transition property scope

File A: `SlateReference.jsx` line 109

Uses Tailwind class transition-colors, which animates: color, background-color, border-color, text-decoration-color, fill, stroke.

File B: `component-contracts.json` line 56

Specifies:

```
"transition": "background-color var(--sl-duration-standard) var(--sl-ease-default)"
```

Only background-color is listed. Border-color and text color are not explicitly included in the contract's transition definition.

Practical impact: Minor. The reference implementation is broader (color changes on ghost text also transition). The contracts are narrower. Both use 200ms and the default easing — the difference is which CSS properties are animated.

---

### Conflict 3 — sm size typography has no named token role

File A: `component-contracts.json` line 12 / `SlateReference.jsx` line 75

sm button uses font-size: 11px and letter-spacing: 0.06em. Both files agree on this.

File B: `tokens.json` lines 235–236 / `slate-tokens.css` lines 424–440

Named typography roles and CSS classes only define:
- button = 13px / 0.04em
- button-lg = 15px / 0.03em

There is no button-sm role defined in tokens.json and no .sl-button-text-sm CSS class in slate-tokens.css. The sm button size values exist at the component level but have no corresponding named token role in the typography system.

Practical impact: In Figma, you will need to manually create an sm button text style from the values given in the component contracts (11px / 600 / 0.06em / uppercase) without a matching named token to reference.
