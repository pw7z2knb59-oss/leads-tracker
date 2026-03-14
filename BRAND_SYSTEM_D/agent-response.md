I have every file already read in full. Here is the complete, exact color system — nothing invented, nothing missing.

Files cited:
- /Users/kainiskanen/Desktop/BRAND SYSTEMS/D/brand-system/tokens/tokens.json — lines 10–186
- /Users/kainiskanen/Desktop/BRAND SYSTEMS/D/brand-system/css/slate-tokens.css — lines 29–344

---

## Slate System D — Complete Color System

---

## PART 1 — PRIMITIVE TOKENS
These are the raw, mode-independent values. Never reference in components — always use semantics.

---

### Monochrome Scale (14 steps)

| Token Name | CSS Variable | Hex |
|---|---|---|
| black | --sl-black | #000000 |
| onyx | --sl-onyx | #131314 |
| charcoal | --sl-charcoal | #1C1C1E |
| graphite | --sl-graphite | #2A2A2C |
| steel | --sl-steel | #3A3A3C |
| iron | --sl-iron | #6B6B6B |
| silver | --sl-silver | #999999 |
| ash | --sl-ash | #C5C5C3 |
| dust | --sl-dust | #D7D7D3 |
| bone | --sl-bone | #E5E5E3 |
| cloud | --sl-cloud | #EBEBEA |
| mist | --sl-mist | #F0F0EE |
| fog | --sl-fog | #F5F5F3 |
| white | --sl-white | #FFFFFF |

Source: tokens.json lines 14–27 / slate-tokens.css lines 31–44

---

### Yale Blue Family (Cold Accent)

| Token Name | CSS Variable | Hex | Note |
|---|---|---|---|
| yale-blue | --sl-yale-blue | #003D59 | Primary accent. ≤5% surface area. |
| yale-blue-hover | --sl-yale-blue-hover | #004D70 | Accent button hover state. |
| yale-blue-active | --sl-yale-blue-active | #002E44 | Accent button pressed state. |
| yale-blue-light | --sl-yale-blue-light | #4A8BA8 | Focus ring on dark shell. |
| yale-blue-subtle | --sl-yale-blue-subtle | #E6EDF1 | Subtle accent bg — light + warm shells. |
| yale-blue-deep | --sl-yale-blue-deep | #0A1A24 | Subtle accent bg — dark shell. |

Source: tokens.json lines 29–32 / slate-tokens.css lines 47–52

Note: --sl-yale-blue-hover and --sl-yale-blue-active are defined in slate-tokens.css lines 48–49 but do not appear as named entries in tokens.json primitives. They are in the system and used in component-contracts.json accent button state matrix.

---

### Khaki Family (Warm Accent)

| Token Name | CSS Variable | Hex | Note |
|---|---|---|---|
| khaki | --sl-khaki | #B1A599 | Warm accent. Warm shell canvas/surface. |
| khaki-light | --sl-khaki-light | #C8BFB6 | Warm elevated surface. |
| khaki-dark | --sl-khaki-dark | #97877A | Warm hover/subtle surface. |
| khaki-subtle | --sl-khaki-subtle | #F2EFEC | Subtle warm bg — light + warm shells. |
| khaki-deep | --sl-khaki-deep | #1A1714 | Subtle warm bg — dark shell. |

Source: tokens.json lines 34–38 / slate-tokens.css lines 55–59

---

### State / Feedback Primitives

| Token Name | CSS Variable | Hex |
|---|---|---|
| success | --sl-success | #2D5A3D |
| success-subtle-lt | --sl-success-subtle-lt | #EDF5F0 |
| success-subtle-dk | --sl-success-subtle-dk | #0D1A12 |
| warning | --sl-warning | #8A6914 |
| warning-subtle-lt | --sl-warning-subtle-lt | #F8F3E6 |
| warning-subtle-dk | --sl-warning-subtle-dk | #1A1508 |
| danger | --sl-danger | #9A2B2B |
| danger-subtle-lt | --sl-danger-subtle-lt | #F8ECEC |
| danger-subtle-dk | --sl-danger-subtle-dk | #1A0D0D |

Source: tokens.json lines 40–48 / slate-tokens.css lines 62–70

---

## PART 2 — SEMANTIC TOKENS PER SHELL
All three shells resolve --sl-* semantic variables to different primitive values. Components always reference these semantic names.

---

### DARK SHELL
Applied via :root, .shell-dark, or [data-shell="dark"]. This is the default shell.
Source: slate-tokens.css lines 209–256 / tokens.json lines 52–94

#### Backgrounds

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| bg-canvas | --sl-bg-canvas | #000000 | black |
| bg-surface | --sl-bg-surface | #131314 | onyx |
| bg-elevated | --sl-bg-elevated | #1C1C1E | charcoal |
| bg-hover | --sl-bg-hover | #2A2A2C | graphite |
| bg-inverse | --sl-bg-inverse | #FFFFFF | white |
| bg-subtle | --sl-bg-subtle | #000000 | black |

#### Text

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| text-primary | --sl-text-primary | #FFFFFF | white |
| text-secondary | --sl-text-secondary | #D7D7D3 | dust |
| text-muted | --sl-text-muted | #6B6B6B | iron |
| text-inverse | --sl-text-inverse | #131314 | onyx |

#### Borders

| Semantic Name | CSS Variable | Resolved Value | Note |
|---|---|---|---|
| border-subtle | --sl-border-subtle | rgba(255, 255, 255, 0.08) | Opacity-based — not a hex primitive |
| border-strong | --sl-border-strong | rgba(255, 255, 255, 0.16) | Opacity-based — not a hex primitive |
| border-inverse | --sl-border-inverse | #FFFFFF | white |

#### Accent

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| accent-primary | --sl-accent-primary | #003D59 | yale-blue |
| accent-primary-subtle | --sl-accent-primary-subtle | #0A1A24 | yale-blue-deep |
| accent-warm | --sl-accent-warm | #B1A599 | khaki |
| accent-warm-subtle | --sl-accent-warm-subtle | #1A1714 | khaki-deep |

#### Focus

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| focus-ring | --sl-focus-ring | #4A8BA8 | yale-blue-light |

Note: Dark shell uses the lighter yale-blue variant for the focus ring so it is visible against dark surfaces.

#### State

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| state-success | --sl-state-success | #2D5A3D | success |
| state-success-subtle | --sl-state-success-subtle | #0D1A12 | success-subtle-dk |
| state-warning | --sl-state-warning | #8A6914 | warning |
| state-warning-subtle | --sl-state-warning-subtle | #1A1508 | warning-subtle-dk |
| state-danger | --sl-state-danger | #9A2B2B | danger |
| state-danger-subtle | --sl-state-danger-subtle | #1A0D0D | danger-subtle-dk |

#### Interactive

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| interactive-default | --sl-interactive-default | #FFFFFF | white |
| interactive-hover | --sl-interactive-hover | #E5E5E3 | bone |
| interactive-active | --sl-interactive-active | #D7D7D3 | dust |
| interactive-disabled | --sl-interactive-disabled | #3A3A3C | steel |
| interactive-default-text | --sl-interactive-default-text | #131314 | onyx |

Note on dark shell interactive: The primary button on dark is white-filled with onyx text — the monochrome inverse. interactive-default-text is defined in slate-tokens.css line 255 (dark shell block only).

---

### LIGHT SHELL
Applied via .shell-light or [data-shell="light"]. Source: slate-tokens.css lines 261–301 / tokens.json lines 97–139

#### Backgrounds

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| bg-canvas | --sl-bg-canvas | #FFFFFF | white |
| bg-surface | --sl-bg-surface | #F5F5F3 | fog |
| bg-elevated | --sl-bg-elevated | #EBEBEA | cloud |
| bg-hover | --sl-bg-hover | #F0F0EE | mist |
| bg-inverse | --sl-bg-inverse | #000000 | black |
| bg-subtle | --sl-bg-subtle | #F0F0EE | mist |

#### Text

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| text-primary | --sl-text-primary | #131314 | onyx |
| text-secondary | --sl-text-secondary | #6B6B6B | iron |
| text-muted | --sl-text-muted | #999999 | silver |
| text-inverse | --sl-text-inverse | #FFFFFF | white |

#### Borders

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| border-subtle | --sl-border-subtle | #E5E5E3 | bone |
| border-strong | --sl-border-strong | #D7D7D3 | dust |
| border-inverse | --sl-border-inverse | #131314 | onyx |

Note: Light shell uses solid hex values for borders (unlike dark shell which uses opacity-based rgba).

#### Accent

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| accent-primary | --sl-accent-primary | #003D59 | yale-blue |
| accent-primary-subtle | --sl-accent-primary-subtle | #E6EDF1 | yale-blue-subtle |
| accent-warm | --sl-accent-warm | #B1A599 | khaki |
| accent-warm-subtle | --sl-accent-warm-subtle | #F2EFEC | khaki-subtle |

#### Focus

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| focus-ring | --sl-focus-ring | #003D59 | yale-blue |

Note: Light shell uses the full yale-blue for focus ring (not the lighter variant).

#### State

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| state-success | --sl-state-success | #2D5A3D | success |
| state-success-subtle | --sl-state-success-subtle | #EDF5F0 | success-subtle-lt |
| state-warning | --sl-state-warning | #8A6914 | warning |
| state-warning-subtle | --sl-state-warning-subtle | #F8F3E6 | warning-subtle-lt |
| state-danger | --sl-state-danger | #9A2B2B | danger |
| state-danger-subtle | --sl-state-danger-subtle | #F8ECEC | danger-subtle-lt |

#### Interactive

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| interactive-default | --sl-interactive-default | #131314 | onyx |
| interactive-hover | --sl-interactive-hover | #2A2A2C | graphite |
| interactive-active | --sl-interactive-active | #3A3A3C | steel |
| interactive-disabled | --sl-interactive-disabled | #C5C5C3 | ash |
| interactive-default-text | --sl-interactive-default-text | #FFFFFF | white |

Note on light shell interactive: Primary button on light is onyx-filled with white text — inverse of dark shell.

---

### WARM SHELL
Applied via .shell-warm or [data-shell="warm"]. Reserved for premium feature moments, hero callouts. Not for app chrome (TopBar/SideRail). Source: slate-tokens.css lines 306–345 / tokens.json lines 142–184

#### Backgrounds

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| bg-canvas | --sl-bg-canvas | #B1A599 | khaki |
| bg-surface | --sl-bg-surface | #B1A599 | khaki |
| bg-elevated | --sl-bg-elevated | #C8BFB6 | khaki-light |
| bg-hover | --sl-bg-hover | #97877A | khaki-dark |
| bg-inverse | --sl-bg-inverse | #131314 | onyx |
| bg-subtle | --sl-bg-subtle | #97877A | khaki-dark |

Note: Canvas and surface are identical in the warm shell (#B1A599 / khaki).

#### Text

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| text-primary | --sl-text-primary | #131314 | onyx |
| text-secondary | --sl-text-secondary | #2A2A2C | graphite |
| text-muted | --sl-text-muted | #3A3A3C | steel |
| text-inverse | --sl-text-inverse | #FFFFFF | white |

#### Borders

| Semantic Name | CSS Variable | Resolved Value | Note |
|---|---|---|---|
| border-subtle | --sl-border-subtle | rgba(0, 0, 0, 0.10) | Opacity-based black |
| border-strong | --sl-border-strong | rgba(0, 0, 0, 0.20) | Opacity-based black |
| border-inverse | --sl-border-inverse | #131314 | onyx |

Note: Warm shell borders use opacity-based black (matching the approach used for dark shell with opacity-based white — both avoid hard hex strokes on tinted surfaces).

#### Accent

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| accent-primary | --sl-accent-primary | #003D59 | yale-blue |
| accent-primary-subtle | --sl-accent-primary-subtle | #E6EDF1 | yale-blue-subtle |
| accent-warm | --sl-accent-warm | #97877A | khaki-dark |
| accent-warm-subtle | --sl-accent-warm-subtle | #C8BFB6 | khaki-light |

Note: In the warm shell, the warm accent tokens shift — accent-warm resolves to khaki-dark (darker tone for contrast on the warm surface) and accent-warm-subtle resolves to khaki-light (lighter tone).

#### Focus

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| focus-ring | --sl-focus-ring | #003D59 | yale-blue |

#### State

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| state-success | --sl-state-success | #2D5A3D | success |
| state-success-subtle | --sl-state-success-subtle | #EDF5F0 | success-subtle-lt |
| state-warning | --sl-state-warning | #8A6914 | warning |
| state-warning-subtle | --sl-state-warning-subtle | #F8F3E6 | warning-subtle-lt |
| state-danger | --sl-state-danger | #9A2B2B | danger |
| state-danger-subtle | --sl-state-danger-subtle | #F8ECEC | danger-subtle-lt |

Note: Warm shell uses light variants for state subtle backgrounds (same as light shell) — not the dark variants used in the dark shell.

#### Interactive

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive |
|---|---|---|---|
| interactive-default | --sl-interactive-default | #131314 | onyx |
| interactive-hover | --sl-interactive-hover | #2A2A2C | graphite |
| interactive-active | --sl-interactive-active | #000000 | black |
| interactive-disabled | --sl-interactive-disabled | #97877A | khaki-dark |
| interactive-default-text | --sl-interactive-default-text | #FFFFFF | white |

Note: Warm shell interactive-active resolves to #000000 (pure black) — the deepest press state. interactive-disabled resolves to khaki-dark which is unique to this shell.

---

## BONUS: Additional CSS-defined Color Values
These appear in slate-tokens.css but are not part of the semantic shell system. Include them in Framer as standalone swatches.

Text selection (slate-tokens.css lines 477–480):

| Usage | Background | Text |
|---|---|---|
| ::selection | #003D59 (yale-blue) | #FFFFFF (white) |

Scrollbar (slate-tokens.css lines 485–498):

| Usage | Value | Primitive |
|---|---|---|
| Scrollbar thumb (default) | #2A2A2C | graphite |
| Scrollbar thumb (hover) | #3A3A3C | steel |
| Scrollbar track | transparent | — |

---

## Summary Count

| Category | Count |
|---|---|
| Monochrome primitives | 14 |
| Yale Blue primitives | 6 |
| Khaki primitives | 5 |
| State/feedback primitives | 9 |
| Total primitives | 34 |
| Dark shell semantic tokens | 27 |
| Light shell semantic tokens | 27 |
| Warm shell semantic tokens | 27 |
| Total semantic tokens | 81 |
| Additional (selection, scrollbar) | 4 |
| Grand total distinct values | ~85 |


I have every file already read in full. Here is the complete, exact color system — nothing invented, nothing missing. Files cited: - /Users/kainiskanen/Desktop/BRAND SYSTEMS/D/brand-system/tokens/tokens.json — lines 10–186 - /Users/kainiskanen/Desktop/BRAND SYSTEMS/D/brand-system/css/slate-tokens.css — lines 29–344 --- ## Slate System D — Complete Color System --- ## PART 1 — PRIMITIVE TOKENS These are the raw, mode-independent values. Never reference in components — always use semantics. --- ### Monochrome Scale (14 steps) | Token Name | CSS Variable | Hex | |---|---|---| | black | --sl-black | #000000 | | onyx | --sl-onyx | #131314 | | charcoal | --sl-charcoal | #1C1C1E | | graphite | --sl-graphite | #2A2A2C | | steel | --sl-steel | #3A3A3C | | iron | --sl-iron | #6B6B6B | | silver | --sl-silver | #999999 | | ash | --sl-ash | #C5C5C3 | | dust | --sl-dust | #D7D7D3 | | bone | --sl-bone | #E5E5E3 | | cloud | --sl-cloud | #EBEBEA | | mist | --sl-mist | #F0F0EE | | fog | --sl-fog | #F5F5F3 | | white | --sl-white | #FFFFFF | Source: tokens.json lines 14–27 / slate-tokens.css lines 31–44 --- ### Yale Blue Family (Cold Accent) | Token Name | CSS Variable | Hex | Note | |---|---|---|---| | yale-blue | --sl-yale-blue | #003D59 | Primary accent. ≤5% surface area. | | yale-blue-hover | --sl-yale-blue-hover | #004D70 | Accent button hover state. | | yale-blue-active | --sl-yale-blue-active | #002E44 | Accent button pressed state. | | yale-blue-light | --sl-yale-blue-light | #4A8BA8 | Focus ring on dark shell. | | yale-blue-subtle | --sl-yale-blue-subtle | #E6EDF1 | Subtle accent bg — light + warm shells. | | yale-blue-deep | --sl-yale-blue-deep | #0A1A24 | Subtle accent bg — dark shell. | Source: tokens.json lines 29–32 / slate-tokens.css lines 47–52 Note: --sl-yale-blue-hover and --sl-yale-blue-active are defined in slate-tokens.css lines 48–49 but do not appear as named entries in tokens.json primitives. They are in the system and used in component-contracts.json accent button state matrix. --- ### Khaki Family (Warm Accent) | Token Name | CSS Variable | Hex | Note | |---|---|---|---| | khaki | --sl-khaki | #B1A599 | Warm accent. Warm shell canvas/surface. | | khaki-light | --sl-khaki-light | #C8BFB6 | Warm elevated surface. | | khaki-dark | --sl-khaki-dark | #97877A | Warm hover/subtle surface. | | khaki-subtle | --sl-khaki-subtle | #F2EFEC | Subtle warm bg — light + warm shells. | | khaki-deep | --sl-khaki-deep | #1A1714 | Subtle warm bg — dark shell. | Source: tokens.json lines 34–38 / slate-tokens.css lines 55–59 --- ### State / Feedback Primitives | Token Name | CSS Variable | Hex | |---|---|---| | success | --sl-success | #2D5A3D | | success-subtle-lt | --sl-success-subtle-lt | #EDF5F0 | | success-subtle-dk | --sl-success-subtle-dk | #0D1A12 | | warning | --sl-warning | #8A6914 | | warning-subtle-lt | --sl-warning-subtle-lt | #F8F3E6 | | warning-subtle-dk | --sl-warning-subtle-dk | #1A1508 | | danger | --sl-danger | #9A2B2B | | danger-subtle-lt | --sl-danger-subtle-lt | #F8ECEC | | danger-subtle-dk | --sl-danger-subtle-dk | #1A0D0D | Source: tokens.json lines 40–48 / slate-tokens.css lines 62–70 --- ## PART 2 — SEMANTIC TOKENS PER SHELL All three shells resolve --sl-* semantic variables to different primitive values. Components always reference these semantic names. --- ### DARK SHELL Applied via :root, .shell-dark, or [data-shell="dark"]. This is the default shell. Source: slate-tokens.css lines 209–256 / tokens.json lines 52–94 #### Backgrounds | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | bg-canvas | --sl-bg-canvas | #000000 | black | | bg-surface | --sl-bg-surface | #131314 | onyx | | bg-elevated | --sl-bg-elevated | #1C1C1E | charcoal | | bg-hover | --sl-bg-hover | #2A2A2C | graphite | | bg-inverse | --sl-bg-inverse | #FFFFFF | white | | bg-subtle | --sl-bg-subtle | #000000 | black | #### Text

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | text-primary | --sl-text-primary | #FFFFFF | white | | text-secondary | --sl-text-secondary | #D7D7D3 | dust | | text-muted | --sl-text-muted | #6B6B6B | iron | | text-inverse | --sl-text-inverse | #131314 | onyx | #### Borders | Semantic Name | CSS Variable | Resolved Value | Note | |---|---|---|---| | border-subtle | --sl-border-subtle | rgba(255, 255, 255, 0.08) | Opacity-based — not a hex primitive | | border-strong | --sl-border-strong | rgba(255, 255, 255, 0.16) | Opacity-based — not a hex primitive | | border-inverse | --sl-border-inverse | #FFFFFF | white | #### Accent | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | accent-primary | --sl-accent-primary | #003D59 | yale-blue | | accent-primary-subtle | --sl-accent-primary-subtle | #0A1A24 | yale-blue-deep | | accent-warm | --sl-accent-warm | #B1A599 | khaki | | accent-warm-subtle | --sl-accent-warm-subtle | #1A1714 | khaki-deep | #### Focus | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | focus-ring | --sl-focus-ring | #4A8BA8 | yale-blue-light | Note: Dark shell uses the lighter yale-blue variant for the focus ring so it is visible against dark surfaces. #### State | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | state-success | --sl-state-success | #2D5A3D | success | | state-success-subtle | --sl-state-success-subtle | #0D1A12 | success-subtle-dk | | state-warning | --sl-state-warning | #8A6914 | warning | | state-warning-subtle | --sl-state-warning-subtle | #1A1508 | warning-subtle-dk | | state-danger | --sl-state-danger | #9A2B2B | danger | | state-danger-subtle | --sl-state-danger-subtle | #1A0D0D | danger-subtle-dk | #### Interactive | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | interactive-default | --sl-interactive-default | #FFFFFF | white | | interactive-hover | --sl-interactive-hover | #E5E5E3 | bone | | interactive-active | --sl-interactive-active | #D7D7D3 | dust | | interactive-disabled | --sl-interactive-disabled | #3A3A3C | steel | | interactive-default-text | --sl-interactive-default-text | #131314 | onyx | Note on dark shell interactive: The primary button on dark is white-filled with onyx text — the monochrome inverse. interactive-default-text is defined in slate-tokens.css line 255 (dark shell block only). --- ### LIGHT SHELL Applied via .shell-light or [data-shell="light"]. Source: slate-tokens.css lines 261–301 / tokens.json lines 97–139 #### Backgrounds | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | bg-canvas | --sl-bg-canvas | #FFFFFF | white | | bg-surface | --sl-bg-surface | #F5F5F3 | fog | | bg-elevated | --sl-bg-elevated | #EBEBEA | cloud | | bg-hover | --sl-bg-hover | #F0F0EE | mist | | bg-inverse | --sl-bg-inverse | #000000 | black | | bg-subtle | --sl-bg-subtle | #F0F0EE | mist | #### Text | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | text-primary | --sl-text-primary | #131314 | onyx | | text-secondary | --sl-text-secondary | #6B6B6B | iron | | text-muted | --sl-text-muted | #999999 | silver | | text-inverse | --sl-text-inverse | #FFFFFF | white | #### Borders | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | border-subtle | --sl-border-subtle | #E5E5E3 | bone | | border-strong | --sl-border-strong | #D7D7D3 | dust | | border-inverse | --sl-border-inverse | #131314 | onyx | Note: Light shell uses solid hex values for borders (unlike dark shell which uses opacity-based rgba). #### Accent

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | accent-primary | --sl-accent-primary | #003D59 | yale-blue | | accent-primary-subtle | --sl-accent-primary-subtle | #E6EDF1 | yale-blue-subtle | | accent-warm | --sl-accent-warm | #B1A599 | khaki | | accent-warm-subtle | --sl-accent-warm-subtle | #F2EFEC | khaki-subtle | #### Focus | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | focus-ring | --sl-focus-ring | #003D59 | yale-blue | Note: Light shell uses the full yale-blue for focus ring (not the lighter variant). #### State | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | state-success | --sl-state-success | #2D5A3D | success | | state-success-subtle | --sl-state-success-subtle | #EDF5F0 | success-subtle-lt | | state-warning | --sl-state-warning | #8A6914 | warning | | state-warning-subtle | --sl-state-warning-subtle | #F8F3E6 | warning-subtle-lt | | state-danger | --sl-state-danger | #9A2B2B | danger | | state-danger-subtle | --sl-state-danger-subtle | #F8ECEC | danger-subtle-lt | #### Interactive | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | interactive-default | --sl-interactive-default | #131314 | onyx | | interactive-hover | --sl-interactive-hover | #2A2A2C | graphite | | interactive-active | --sl-interactive-active | #3A3A3C | steel | | interactive-disabled | --sl-interactive-disabled | #C5C5C3 | ash | | interactive-default-text | --sl-interactive-default-text | #FFFFFF | white | Note on light shell interactive: Primary button on light is onyx-filled with white text — inverse of dark shell. --- ### WARM SHELL Applied via .shell-warm or [data-shell="warm"]. Reserved for premium feature moments, hero callouts. Not for app chrome (TopBar/SideRail). Source: slate-tokens.css lines 306–345 / tokens.json lines 142–184 #### Backgrounds | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | bg-canvas | --sl-bg-canvas | #B1A599 | khaki | | bg-surface | --sl-bg-surface | #B1A599 | khaki | | bg-elevated | --sl-bg-elevated | #C8BFB6 | khaki-light | | bg-hover | --sl-bg-hover | #97877A | khaki-dark | | bg-inverse | --sl-bg-inverse | #131314 | onyx | | bg-subtle | --sl-bg-subtle | #97877A | khaki-dark | Note: Canvas and surface are identical in the warm shell (#B1A599 / khaki). #### Text | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | text-primary | --sl-text-primary | #131314 | onyx | | text-secondary | --sl-text-secondary | #2A2A2C | graphite | | text-muted | --sl-text-muted | #3A3A3C | steel | | text-inverse | --sl-text-inverse | #FFFFFF | white | #### Borders | Semantic Name | CSS Variable | Resolved Value | Note | |---|---|---|---| | border-subtle | --sl-border-subtle | rgba(0, 0, 0, 0.10) | Opacity-based black | | border-strong | --sl-border-strong | rgba(0, 0, 0, 0.20) | Opacity-based black | | border-inverse | --sl-border-inverse | #131314 | onyx | Note: Warm shell borders use opacity-based black (matching the approach used for dark shell with opacity-based white — both avoid hard hex strokes on tinted surfaces). #### Accent | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | accent-primary | --sl-accent-primary | #003D59 | yale-blue | | accent-primary-subtle | --sl-accent-primary-subtle | #E6EDF1 | yale-blue-subtle | | accent-warm | --sl-accent-warm | #97877A | khaki-dark | | accent-warm-subtle | --sl-accent-warm-subtle | #C8BFB6 | khaki-light | Note: In the warm shell, the warm accent tokens shift — accent-warm resolves to khaki-dark (darker tone for contrast on the warm surface) and accent-warm-subtle resolves to khaki-light (lighter tone). #### Focus | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | focus-ring | --sl-focus-ring | #003D59 | yale-blue | #### State

| Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | state-success | --sl-state-success | #2D5A3D | success | | state-success-subtle | --sl-state-success-subtle | #EDF5F0 | success-subtle-lt | | state-warning | --sl-state-warning | #8A6914 | warning | | state-warning-subtle | --sl-state-warning-subtle | #F8F3E6 | warning-subtle-lt | | state-danger | --sl-state-danger | #9A2B2B | danger | | state-danger-subtle | --sl-state-danger-subtle | #F8ECEC | danger-subtle-lt | Note: Warm shell uses light variants for state subtle backgrounds (same as light shell) — not the dark variants used in the dark shell. #### Interactive | Semantic Name | CSS Variable | Resolved Hex | Resolved Primitive | |---|---|---|---| | interactive-default | --sl-interactive-default | #131314 | onyx | | interactive-hover | --sl-interactive-hover | #2A2A2C | graphite | | interactive-active | --sl-interactive-active | #000000 | black | | interactive-disabled | --sl-interactive-disabled | #97877A | khaki-dark | | interactive-default-text | --sl-interactive-default-text | #FFFFFF | white | Note: Warm shell interactive-active resolves to #000000 (pure black) — the deepest press state. interactive-disabled resolves to khaki-dark which is unique to this shell. --- ## BONUS: Additional CSS-defined Color Values These appear in slate-tokens.css but are not part of the semantic shell system. Include them in Framer as standalone swatches. Text selection (slate-tokens.css lines 477–480): | Usage | Background | Text | |---|---|---| | ::selection | #003D59 (yale-blue) | #FFFFFF (white) | Scrollbar (slate-tokens.css lines 485–498): | Usage | Value | Primitive | |---|---|---| | Scrollbar thumb (default) | #2A2A2C | graphite | | Scrollbar thumb (hover) | #3A3A3C | steel | | Scrollbar track | transparent | — | --- ## Summary Count | Category | Count | |---|---| | Monochrome primitives | 14 | | Yale Blue primitives | 6 | | Khaki primitives | 5 | | State/feedback primitives | 9 | | Total primitives | 34 | | Dark shell semantic tokens | 27 | | Light shell semantic tokens | 27 | | Warm shell semantic tokens | 27 | | Total semantic tokens | 81 | | Additional (selection, scrollbar) | 4 | | Grand total distinct values | ~85 |
