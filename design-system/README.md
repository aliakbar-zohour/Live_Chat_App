# Pulse Design System

Use this document whenever you add UI so the product stays visually synced.

## Brand

- **Name:** Pulse
- **Tone:** kinetic, precise, oceanic — Awwwards product energy without gimmicks
- **Primary signal:** electric blue (`--ds-signal`) on deep navy

## Color rules

| Token | Hex | Use |
| --- | --- | --- |
| `--ds-ink` | `#050A14` | Page background |
| `--ds-ink-elevated` | `#0B1528` | Panels / rails |
| `--ds-bone` | `#EAF1FF` | Primary text |
| `--ds-mist` | `#7B8EAE` | Secondary text |
| `--ds-signal` | `#2F7BFF` | CTA fills, live indicators |
| `--ds-on-signal` | `#FFFFFF` | Text/icons on signal fills |
| `--ds-signal-bright` | `#79B0FF` | Kickers / highlights |
| `--ds-glow` | `#5EC8FF` | Soft gradient accents |
| `--ds-line` | blue-tinted alpha | Dividers only |

Filled buttons must use `.ds-btn-signal` / `.ds-btn-primary` (or `Button` variants) so background + label contrast never drops.

Do **not** introduce purple gradients, cream/terracotta pairings, or broadsheet newspaper layouts.

## Typography

- Display / brand / section titles → `font-display` (**Unbounded**)
- Body / UI → `font-sans` (**Manrope**)
- Codes / invites / handles → `font-mono` (**JetBrains Mono**)

Hero titles use `--ds-text-hero` with tight leading and negative tracking.

## Layout & breakpoints

Design three compositions and fluidly bridge them:

1. **Phone (< 768px):** single column; conversation list OR thread; bottom system switcher
2. **Tablet (768–1023px):** list + thread; create panels as sheets
3. **Desktop (≥ 1024px):** systems rail + list + thread

Spacing must come from `--ds-space-*` and `--ds-page-x`. Prefer `clamp()` over hard px jumps.

## Components

Prefer primitives in `components/ui`:

- `Button` — primary / ghost / signal
- `Input` / `Textarea`
- `Avatar` / `Badge`
- `Panel` — elevated surface without decorative card chrome

Chat surfaces live in `components/chat` and must consume the same tokens.

## Motion

Ship intentional motion only:

1. Page / section reveal (staggered fade-up)
2. Message enter (soft rise + fade)
3. System / rail transitions (shared layout or slide)
4. Landing aurora / float for atmosphere

Easing: `--ds-ease-out`. Avoid bounce and perpetual glow loops on interactive controls.

## Content density

One job per section. Chat chrome stays quiet so messages dominate. No floating promo badges on hero media.
