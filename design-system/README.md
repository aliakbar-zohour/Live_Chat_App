# Pulse Design System

Use this document whenever you add UI so the product stays visually synced.

## Brand

- **Name:** Pulse
- **Tone:** editorial, kinetic, precise — Awwwards product energy without gimmicks
- **Primary signal:** acid lime (`--ds-signal`) on deep ink

## Color rules

| Token | Use |
| --- | --- |
| `--ds-ink` | Page background |
| `--ds-ink-elevated` | Panels / rails |
| `--ds-bone` | Primary text |
| `--ds-mist` | Secondary text |
| `--ds-signal` | CTA, live indicators, focus |
| `--ds-line` | Dividers only — never as a card frame by default |

Do **not** introduce purple gradients, cream/terracotta pairings, or broadsheet newspaper layouts.

## Typography

- Display / brand / section titles → `font-display` (Syne)
- Body / UI → `font-sans` (Outfit)
- Codes / invites / handles → `font-mono`

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

Easing: `--ds-ease-out`. Avoid bounce and perpetual glow loops.

## Content density

One job per section. Chat chrome stays quiet so messages dominate. No floating promo badges on hero media.
