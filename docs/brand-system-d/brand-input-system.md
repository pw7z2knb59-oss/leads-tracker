I have all files already read in full. Here is the complete input/field system extraction.

---

## 1. Files Scanned

| File | Relevance |
|---|---|
| brand-system/components/component-contracts.json | Input contract: tokens, state matrix, transition |
| brand-system/css/slate-tokens.css | Resolved CSS variables per shell + global focus-visible rule |
| brand-system/tokens/tokens.json | Spacing, radius, typography, motion token values |
| brand-system/tailwind/slate-preset.js | Tailwind spacing/font-size resolution |
| brand-system/reference/SlateReference.jsx | Reference screen implementation |
| brand-system/governance/governance-model.json | Geometry, motion rules |
| brand-system/governance/visual-dna.md | Restraint rules |
| brand-system/qa/qa-checklist.json | QA-012: input state matrix check |

Critical note before reading: There is no Input component rendered anywhere in SlateReference.jsx. The reference screen demonstrates buttons, cards, badges, TopBar, SideRail, Footer, and WarmHero only. Every input definition in this document comes exclusively from component-contracts.json, slate-tokens.css, and tokens.json. There is no inferred usage from the reference implementation because the reference does not use inputs.

---

## 2. Input Tokens
All token bindings defined in component-contracts.json lines 100–121, with values resolved from slate-tokens.css and tokens.json.

### Structural Tokens

| Property | Token | CSS Variable | Resolved Value | Source |
|---|---|---|---|---|
| Height | (literal) | — | 40px | component-contracts.json line 103 |
| Padding X | spacing.3 | --sl-space-3 | 12px | tokens.json line 245 / slate-tokens.css line 115 |
| Padding Y | Not defined | — | Not explicitly stated | Gap — see Section 10 |
| Radius | radius.md | --sl-radius-md | 4px | tokens.json line 261 / slate-tokens.css line 131 |
| Border width | border.width.thin | --sl-border-thin | 1px | tokens.json line 268 / slate-tokens.css line 139 |

### Color Tokens (resolved per shell in Section 8)

| Property | CSS Variable | Used In State |
|---|---|---|
| Background | --sl-bg-surface | Default, hover, focused, error |
| Border (default) | --sl-border-subtle | Default |
| Border (hover) | --sl-border-strong | Hover |
| Border (focused) | --sl-focus-ring | Focused |
| Border (error) | --sl-state-danger | Error |
| Focus shadow | --sl-accent-primary-subtle | Focused (0 0 0 2px) |
| Error shadow | --sl-state-danger-subtle | Error (0 0 0 2px) |
| Text (value) | --sl-text-primary | All states |
| Text (placeholder) | --sl-text-muted | Default |
| Opacity (disabled) | --sl-opacity-disabled | Disabled (0.4) |

### Typography Tokens

| Property | CSS Variable | Resolved Value |
|---|---|---|
| Font family | --sl-font-body | 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif |
| Font size | --sl-text-base | 0.875rem / 14px |

Font weight is not defined in the input contract. See Section 10.

### Motion Tokens

| Property | CSS Variable | Resolved Value |
|---|---|---|
| Duration | --sl-duration-standard | 200ms |
| Easing | --sl-ease-default | cubic-bezier(0.25, 0.1, 0.25, 1.0) |

Source: component-contracts.json line 120 / tokens.json lines 306, 311 / slate-tokens.css lines 165, 169

---

## 3. Input Variants
Source: component-contracts.json line 101

Exactly one variant is defined. The description reads:
> "Text input, textarea, select. Single variant, full state matrix."

There are no size variants, style variants, or type variants defined in the contract. All three element types (text input, textarea, select) share the same contract. No differentiation between them is specified.

---

## 4. Input Sizes
Source: component-contracts.json line 103

Exactly one size is defined:

| Property | Value |
|---|---|
| Height | 40px |
| Padding X | 12px (--sl-space-3) |
| Padding Y | Not defined |
| Font size | 14px (--sl-text-base) |
| Radius | 4px (--sl-radius-md) |

There are no sm, lg, or any other size variants. The 40px height matches the md button height, suggesting visual alignment between inputs and md buttons. This is not stated explicitly in any file — it is an observation.

---

## 5. Input States
Source: component-contracts.json lines 113–119, slate-tokens.css global focus rule lines 465–472

### Default

| Property | Token | Note |
|---|---|---|
| Background | --sl-bg-surface | Shell-adaptive |
| Border | 1px solid --sl-border-subtle | Shell-adaptive |
| Text | --sl-text-primary | Shell-adaptive |
| Placeholder | --sl-text-muted | Shell-adaptive |
| Shadow | none | — |

### Hover

| Property | Token | Change from Default |
|---|---|---|
| Background | --sl-bg-surface | No change |
| Border | 1px solid --sl-border-strong | Stronger border |
| Text | --sl-text-primary | No change |
| Shadow | none | No change |

Only the border changes on hover.

### Focused

| Property | Token | Note |
|---|---|---|
| Background | --sl-bg-surface | No change |
| Border | 1px solid --sl-focus-ring | Border color changes to focus ring |
| Shadow | 0 0 0 2px --sl-accent-primary-subtle | Glow ring using subtle accent |
| Text | --sl-text-primary | No change |

### Error

| Property | Token | Note |
|---|---|---|
| Background | --sl-bg-surface | No change |
| Border | 1px solid --sl-state-danger | Danger color border |
| Shadow | 0 0 0 2px --sl-state-danger-subtle | Danger glow ring |
| Text | --sl-text-primary | No change |
| Error text color | Not defined in contract | See Section 10 |

### Disabled

| Property | Token/Value | Note |
|---|---|---|
| Opacity | 0.4 (--sl-opacity-disabled) | Applied to entire element |
| Cursor | not-allowed |  |
| Background | --sl-bg-surface (implied) | No explicit fill change — opacity covers it |
| Border | --sl-border-subtle (implied) | No explicit border change |
| Text | --sl-text-primary (implied) | No explicit text color change |

Note: The disabled state only defines opacity and cursor. No background, text, or border color changes are specified. The visual disabled appearance is achieved entirely through opacity: 0.4 applied to whatever the default state values are.

---

## 6. Input Typography
Source: component-contracts.json lines 108–112, tokens.json lines 196–236, slate-tokens.css lines 391–455

### Input Value Text

| Property | Token / CSS Variable | Resolved Value |
|---|---|---|
| Font family | --sl-font-body | Inter stack |
| Font size | --sl-text-base | 14px |
| Font weight | Not defined in contract | Not explicitly specified — see Section 10 |
| Line height | Not defined in contract | Not explicitly specified — see Section 10 |
| Letter spacing | Not defined in contract | Not explicitly specified — see Section 10 |
| Color | --sl-text-primary | Shell-adaptive (see Section 8) |

### Placeholder Text

| Property | Token / CSS Variable | Resolved Value |
|---|---|---|
| Color | --sl-text-muted | Shell-adaptive (see Section 8) |
| Font family | Inherits from input | Inter |
| Font size | Inherits from input | 14px |
| Font weight | Not defined | — |

### Label Text
Not defined anywhere in any System D file. No label typography spec exists in component-contracts.json, tokens.json, slate-tokens.css, or any other file. See Section 10.

### Helper / Error Text
Not defined anywhere in any System D file. No helper text or error message typography spec exists. See Section 10.

---

## 7. Input Spacing / Padding / Layout
Source: component-contracts.json lines 103–105, tokens.json spacing scale

| Property | Token | Value | Defined? |
|---|---|---|---|
| Height | — | 40px | Explicitly defined |
| Padding horizontal | --sl-space-3 | 12px | Explicitly defined |
| Padding vertical | Not defined | Unknown | Not defined — see Section 10 |
| Border width | --sl-border-thin | 1px | Explicitly defined |
| Focus shadow spread | — | 0 0 0 2px | Explicitly defined in state matrix |
| Error shadow spread | — | 0 0 0 2px | Explicitly defined in state matrix |
| Label to field gap | Not defined | Unknown | Not defined — see Section 10 |
| Field to helper text gap | Not defined | Unknown | Not defined — see Section 10 |
| Icon gap (leading/trailing) | Not defined | Unknown | Not defined — see Section 10 |
| Min-width | Not defined | Unknown | Not defined |
| Max-width | Not defined | Unknown | Not defined |

---

## 8. Input Shell Behavior (Dark / Light / Warm)
All values resolved from slate-tokens.css for each shell context.

### Background (--sl-bg-surface)

| Shell | Resolved Hex | Primitive |
|---|---|---|
| Dark | #131314 | onyx |
| Light | #F5F5F3 | fog |
| Warm | #B1A599 | khaki |

### Default Border (--sl-border-subtle)

| Shell | Resolved Value | Note |
|---|---|---|
| Dark | rgba(255, 255, 255, 0.08) | Opacity-based |
| Light | #E5E5E3 | Solid hex (bone) |
| Warm | rgba(0, 0, 0, 0.10) | Opacity-based |

### Hover Border (--sl-border-strong)

| Shell | Resolved Value | Note |
|---|---|---|
| Dark | rgba(255, 255, 255, 0.16) | Opacity-based |
| Light | #D7D7D3 | Solid hex (dust) |
| Warm | rgba(0, 0, 0, 0.20) | Opacity-based |

### Focused Border (--sl-focus-ring)

| Shell | Resolved Hex | Primitive |
|---|---|---|
| Dark | #4A8BA8 | yale-blue-light |
| Light | #003D59 | yale-blue |
| Warm | #003D59 | yale-blue |

### Focused Shadow (0 0 0 2px --sl-accent-primary-subtle)

| Shell | Resolved Hex | Primitive |
|---|---|---|
| Dark | #0A1A24 | yale-blue-deep |
| Light | #E6EDF1 | yale-blue-subtle |
| Warm | #E6EDF1 | yale-blue-subtle |

### Error Border (--sl-state-danger)

| Shell | Resolved Hex | Note |
|---|---|---|
| Dark | #9A2B2B | Same across all shells |
| Light | #9A2B2B | Same across all shells |
| Warm | #9A2B2B | Same across all shells |

### Error Shadow (0 0 0 2px --sl-state-danger-subtle)

| Shell | Resolved Hex | Primitive |
|---|---|---|
| Dark | #1A0D0D | danger-subtle-dk |
| Light | #F8ECEC | danger-subtle-lt |
| Warm | #F8ECEC | danger-subtle-lt |

### Value Text (--sl-text-primary)

| Shell | Resolved Hex | Primitive |
|---|---|---|
| Dark | #FFFFFF | white |
| Light | #131314 | onyx |
| Warm | #131314 | onyx |

### Placeholder Text (--sl-text-muted)

| Shell | Resolved Hex | Primitive |
|---|---|---|
| Dark | #6B6B6B | iron |
| Light | #999999 | silver |
| Warm | #3A3A3C | steel |

Source: slate-tokens.css lines 209–345

---

## 9. Conflicts and Mismatches
Two real conflicts found.

---

### Conflict 1 — Focused state: global CSS vs component contract

File A: `slate-tokens.css` lines 465–472

The global CSS base styles define focus behavior for input:focus-visible:

outline: none;
box-shadow: 0 0 0 2px var(--sl-focus-ring);

This means on focus: no outline, and a 2px box-shadow using the focus ring color itself.

File B: `component-contracts.json` lines 116

The contract defines the focused state as:

border: var(--sl-focus-ring)
shadow: 0 0 0 2px var(--sl-accent-primary-subtle)

This means on focus: border changes to focus ring color, and the 2px shadow uses the accent subtle color — not the focus ring color.

The difference:

| Layer | Global CSS | Component Contract |
|---|---|---|
| Outline | none | not mentioned |
| Border | not mentioned | changes to --sl-focus-ring |
| Box shadow color | --sl-focus-ring | --sl-accent-primary-subtle |

These are two different focused appearances. The global CSS produces a shadow using the active focus ring color (e.g., #4A8BA8 on dark shell). The contract produces a shadow using the subtle accent background (e.g., #0A1A24 on dark shell — a very dark, near-invisible shadow). The border-change behavior in the contract is absent from the global CSS.

Which takes effect depends on implementation order — but the intent from the contracts is clearly different from the global baseline.

---

### Conflict 2 — Transition scope

File A: `component-contracts.json` line 120

border-color var(--sl-duration-standard) var(--sl-ease-default), box-shadow var(--sl-duration-standard) var(--sl-ease-default)

Two properties animated: border-color and box-shadow. Both at 200ms.

File B: `slate-tokens.css` (global base styles)

No transition is set on the global input base styles. The transition is entirely a component-level concern.

No real conflict here — just noting that there is no global CSS transition on inputs, meaning if the contract transition is not implemented, inputs have instant state changes with no animation. The contract is the only source for transition behavior.

---

## 10. Missing Definitions / Ambiguities
The following are explicitly not defined in any System D file.

---

### Not Defined: Input size variants
Only one size (40px height, 12px padding X, 14px font size) exists. No sm, lg, or other sizes are specified anywhere.

---

### Not Defined: Padding Y (vertical padding)
paddingX is defined as --sl-space-3 (12px). No paddingY is specified in component-contracts.json or any other file. The height is fixed at 40px, so padding-top and padding-bottom are implied by the height — but the exact values are not stated.

---

### Not Defined: Input value text font weight
component-contracts.json specifies fontFamily and fontSize for the input. Font weight is absent. No instruction exists for whether input text should be 400 (regular) or another weight.

---

### Not Defined: Input value text line height
No lineHeight is defined for input value text in the contract.

---

### Not Defined: Input value text letter spacing
No letterSpacing is defined for input value text.

---

### Not Defined: Label typography
No label text style is defined anywhere. There is no specification for:
- Label font size
- Label font weight
- Label color
- Label text transform
- Required field indicator style

---

### Not Defined: Helper text
No helper/description text below inputs is defined. No specification for:
- Helper text font size
- Helper text color
- Helper text weight

---

### Not Defined: Error message text
No error message text style is defined. The error state for the input only defines border and shadow colors. No specification for:
- Error message font size
- Error message color token
- Error message position or spacing

---

### Not Defined: Label-to-field gap
No spacing between a label and its input field is defined in any file.

---

### Not Defined: Field-to-helper-text gap
No spacing between an input field and any helper or error text below it is defined.

---

### Not Defined: Leading/trailing icon treatment
No specification exists for icons inside inputs (search icon, clear button, password toggle, etc.). No icon size, padding, or color token assignment for input icons.

---

### Not Defined: Textarea-specific height / resize behavior
component-contracts.json includes textarea in the single-variant description but defines no specific height, min-height, max-height, or resize behavior for textareas.

---

### Not Defined: Select-specific treatment
component-contracts.json includes select in the single-variant description but defines no dropdown arrow icon, custom styling, or select-specific tokens.

---

### Not Defined: Read-only state
No read-only state is defined. The state matrix contains only: default, hover, focused, error, disabled.

---

### Not Defined: Success state for inputs
The component contract defines no success border state (e.g., after validation passes). The badge system has a success variant, but inputs have no equivalent.

---

### Not Defined: Loading state for inputs
No loading state exists for inputs (contrasted with buttons which have a defined loading state).

---

### Not Defined: Input appears in no reference screen
The reference implementation (SlateReference.jsx) does not render any input component. There is no visual reference for how an input looks in context, within a form, or alongside other components. All input definitions come exclusively from component-contracts.json with no corroborating reference rendering.

---

### QA Coverage (for reference)
qa-checklist.json line QA-012:
> "Input state matrix complete: default, hover, focused, error, disabled"
> Pass condition: "All 5 states render correctly with proper token bindings"

This confirms the 5 states as the complete intended set. No additional states are expected by the QA system.
