# Pulse Design System

Quiet luxury. Soft black, warm stone, platinum accent. Prefer emptiness over decoration.

## Brand

- **Name:** Pulse
- **Tone:** calm, editorial, precise — minimal and refined
- **Primary fill:** warm stone (`--ds-signal` / `--ds-bone`) on soft black

## Color rules

| Token | Hex | Use |
| --- | --- | --- |
| `--ds-ink` | `#0b0b0c` | Page background |
| `--ds-ink-elevated` | `#121214` | Panels / rails |
| `--ds-bone` | `#f3f1ec` | Primary text + CTA fills |
| `--ds-mist` | `#7c7a74` | Secondary text |
| `--ds-signal` | `#f3f1ec` | Active states, send, CTAs |
| `--ds-on-signal` | `#0b0b0c` | Text/icons on bone fills |
| `--ds-signal-bright` | `#c5c0b4` | Live dot / soft highlight |
| `--ds-line` | bone alpha | Dividers only |

Filled buttons must use `.ds-btn-signal` / `.ds-btn-primary` (or `Button` variants) so contrast stays high.

Do **not** introduce purple gradients, cream/terracotta pairings, broadsheet layouts, or loud neon accents.

## Typography

- Display / hero / section titles → `font-display` (**Instrument Serif**, italic in EN)
- Body / UI → `font-sans` (**Plus Jakarta Sans**)
- **Persian (`fa`)** → **Vazirmatn** for display + body (via `body.is-fa`)

When `dir="rtl"` and locale is `fa`, the layout flips with logical CSS (`ms`/`me`/`ps`/`pe`/`border-e`).

## Layout & breakpoints

1. **Phone (< 768px):** single column; conversation list OR thread; bottom system switcher
2. **Tablet (768–1023px):** list + thread
3. **Desktop (≥ 1024px):** systems rail + list + thread

Spacing from `--ds-space-*` and `--ds-page-x`. Prefer `clamp()` over hard px jumps.

## Components

Prefer primitives in `components/ui`:

- `Button` — primary / ghost / signal
- `Input` / `Textarea`
- `Avatar` / `Badge`
- `Panel` — elevated surface without decorative card chrome

Chat surfaces live in `components/chat` and must consume the same tokens.

## Motion

1. Page / section reveal (staggered fade-up)
2. Message enter (soft rise + fade)
3. Locale overlay transition

Easing: `--ds-ease-out`. Avoid bounce and perpetual glow on interactive controls.

## Content density

One job per section. Landing hero: brand, one headline, one sentence, one CTA group. Chat chrome stays quiet so messages dominate.
