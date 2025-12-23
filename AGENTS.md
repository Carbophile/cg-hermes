# Carbophile Group Hermes

## Project Overview

**Codename:** Hermes
**Purpose:** Informational hub for Carbophile Group, a Croatian cybersecurity nonprofit.
**Type:** Static Web Application (SSG)
**Tech Stack:**
*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Content:** MDX
*   **Deployment:** Cloudflare Workers / Pages
*   **Tooling:** Biome (Linting/Formatting), pnpm (Package Manager)

## Architecture & Structure

The project follows a standard Next.js App Router structure with specific conventions for i18n and content management.

*   `app/[lang]/`: Application routes. The `[lang]` dynamic segment handles localization (e.g., `/en/`, `/hr/`).
*   `l10n/`: Localization logic. Contains the JSON schema (`dict.schema.json`) and the typed dictionaries.
*   `blog/` & `projects/`: Data access layers and MDX content for blog posts and project showcases.
*   `assets/`: Source directory for static assets (images, videos).
*   `lib/`: Shared utility functions (e.g., SEO, asset paths).
*   `scripts/`: Build-time scripts (e.g., `fingerprint.ts` for asset hashing).
*   `public/`: Output directory for fingerprinted assets.

## Building and Running

*   **Install Dependencies:** `pnpm install`
*   **Development Server:** `pnpm run dev`
*   **Production Build:** `pnpm run build`
*   **Preview Production Build:** `pnpm run preview`
*   **Update Types (i18n):** `pnpm run types`
*   **Lint & Format:** `pnpm run check` (Use `pnpm run check:unsafe` for auto-fixes)
*   **Asset Fingerprinting:** `pnpm run fingerprint` (Runs automatically on `prepare`)

## Development Conventions

### Internationalization (i18n)
*   **Strictly Typed:** Localization is handled via typed JSON dictionaries defined in `l10n/dict.schema.json`.
*   **Workflow:**
		1.  Add new keys to `l10n/dict.schema.json`.
		2.  Run `pnpm run types` to regenerate TypeScript definitions.
		3.  Update dictionaries in `l10n/dicts/` (e.g., `CG-dict.en.json`, `CG-dict.hr.json`).
*   **Usage:** Client components should receive reduced dictionaries containing only necessary keys.

### Content Management (MDX)
*   **Location:** `blog/content/[language]/` and `projects/content/[language]/`.
*   **Format:** MDX files with frontmatter.
*   **Naming:** Filenames should be in English and consistent across languages.

### Code Style
*   **Formatter:** Biome is the single source of truth for formatting and linting. Do not use Prettier or ESLint.
*   **Style:** Functional components with TypeScript. Use arrow functions for components and utilities. Inline exports except default which is at end of file.
*   **Assets:** Use `lib/assets.ts` and `getAssetPath` to reference static assets to ensure proper hashing.
*   **Indentation:** Always use tabs unless explicitly unsupported (like in YAML).
