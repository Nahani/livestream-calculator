# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
yarn dev                 # Start Vite dev server at localhost:5173
yarn build              # Build for production + generate sitemap
yarn preview            # Preview production build locally
yarn lint               # Run ESLint

# Firebase Deployment
firebase deploy --only hosting
```

## Project Overview

A React + TypeScript trading calculator app for position sizing based on drawdown, stop loss, and platform rules. Supports both futures contracts (TopStep/APEX) and CFD platforms (FTMO/WGF/UFUNDED).

## Architecture

### Core Calculation Flow

1. **Input** → `useCalculator` hook manages drawdown, stop loss, and platform selection
2. **Platform Detection** → `isCfdPlatform()` determines if CFD or futures contract
3. **Max Loss Calculation** → `calculateMaxLoss()` uses platform-specific divisor (5, 10, or 15)
4. **Position Sizing**:
   - Futures: `useContractCalculation` → calculates mini + micro contracts
   - CFD: `useCfdCalculation` → calculates lots

### Key Architectural Patterns

**Separation of Concerns:**
- Calculation logic: `/src/utils/calculatorUtils.ts` (pure functions)
- Business logic hooks: `/src/hooks/useContractCalculation.ts`, `/src/hooks/useCfdCalculation.ts`
- UI components: `/src/components/contract/ContractOption.tsx`, `/src/components/cfd/CfdOption.tsx`

**State Management:**
- React Context API for theme (`ThemeContext`) and language (`LanguageContext`)
- LocalStorage persistence for user preferences (platform, theme, language)
- Firebase Analytics for usage tracking

**Contract Definitions:**
- All contract tick values in `/src/constants/contracts.ts`
- Platform definitions with divisors in `/src/types/index.ts`

### Platform-Specific Logic

**Futures Contracts (TopStep/APEX):**
- Combines mini + micro contracts for optimal position sizing
- Auto-converts 10 micro → 1 mini suggestion
- Shows alternative positions within 2% of max loss
- Warning indicators when exceeding max allowed loss

**CFD (FTMO/WGF/UFUNDED):**
- Platform-specific cards: `PlatformCfdCard.tsx`
- FTMO: pointMultiplier = 1
- WGF: pointMultiplier = 0.1
- UFUNDED: divisor = 15 (vs 10 for others)

## Internationalization

All user-facing text must be added to both `en` and `fr` in `/src/utils/i18n.ts`. Language auto-detects from browser via `getBrowserLanguage()`.

## SEO & PWA

- SEO component (`/src/components/SEO.tsx`) handles meta tags, Open Graph, structured data
- Sitemap auto-generated on build via `scripts/generate-sitemap.js`
- PWA manifest in `/public/manifest.json`
- 404 page with language support in `/public/404.html`

## Firebase Analytics Events

Tracked in `/src/utils/analytics.ts`:
- `calculation_performed` - calculation with drawdown/stop loss
- `platform_changed` - platform selection
- `theme_changed` - dark/light mode toggle
- `language_changed` - language switch
- `contract_viewed` - contract card interaction
- `cfd_calculation` - CFD position calculation

## Environment Variables

Required in `.env` for Firebase Analytics (see `.env.example`):
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

## Code Style

- Use doublequotes for strings
- Prefer editing existing files over creating new ones
- TailwindCSS for all styling with dark mode support
- TypeScript strict mode enabled
