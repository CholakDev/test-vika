# PRD — Чолак Вікторія · Targeted Ads Landing

## Original Problem Statement
Mobile-first one-page landing for a Targeted-ads specialist (Facebook/Instagram), to be linked from Instagram bio. Audience: entrepreneurs, SMB owners and experts who want stable sales/leads. Tone: confident, expert, no jargon, focused on ad ROI. UA + EN switcher. Lots of unusual WOW animations. Design must perfectly match attached photo (woman in cafe, muted black/white/grey/green palette with yellow umbrella accents).

## User personas
- SMB owner who wasted budget before and is skeptical
- Expert/coach launching paid traffic for the first time
- E-commerce brand looking to scale ROAS

## Core requirements (static)
- One-page mobile-first
- UA default + EN switcher (full translation)
- Editorial premium aesthetic that pairs with the photo
- CTA → Telegram + Instagram only (no form)
- Lots of cool animations (WOW)
- Sticky nav, footer with brand mark

## Implemented (2025-12-08)
- Editorial landing using Fraunces (display) + Manrope (body) + JetBrains Mono (utility)
- Palette: bone #f3ede2, ink #0e0e0f, sage-deep #3f4a36, mustard #e8c547
- Sections: Nav, Hero (photo + giant typography + parallax + sticker), Marquee, Stats (animated counters), About, Services (accordion), Process (timeline), Cases (placeholder ROAS), Testimonials, FAQ, Dark CTA block (Telegram + Instagram pills), Footer with giant brand wordmark
- Animations: custom cursor (dot + magnetic ring with mix-blend-difference), film grain overlay, split-text per-word reveal, fade-up reveals, scramble text, marquee, magnetic buttons, animated CTA orbs, accordion expand, sticker spin, parallax photo
- Bilingual UA/EN via /app/frontend/src/i18n.js
- Hero photo `/public/hero.webp` (converted from HEIC)
- All interactive elements have data-testid

## Backlog (P1)
- Add scroll-triggered horizontal section (e.g. logos of clients)
- Add WhatsApp / form variant if user later wants it
- SEO meta + OG image generation
- Add real cases & swap placeholders

## Backlog (P2)
- Lottie/Rive micro-animations on stats
- Lazy-load below-the-fold images
- Light-on-dark photo treatment toggle
