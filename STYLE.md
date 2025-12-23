# Development Style Guide

Welcome to the **Carbophile Group Hermes** project. This guide outlines the development standards, architectural decisions, and conventions we follow to maintain a high-quality, maintainable, and scalable codebase.

## 1. Toolchain & Environment

*   **Package Manager:** We use **pnpm** exclusively. Please do not use `npm` or `yarn` to avoid lockfile conflicts.
*   **Linting & Formatting:** We use **Biome** for both linting and formatting.
		*   **Command:** `pnpm run check` (checks and formats).
		*   **Fix:** `pnpm run check:unsafe` (applies automatic fixes).
		*   **Note:** We do *not* use ESLint or Prettier.

## 2. Code Style & Patterns

### TypeScript
*   **Strict Mode:** TypeScript strict mode is enabled. Avoid `any` types; strictly type props, state, and return values.
*   **Interfaces vs Types:** Use `interface` for object definitions that might be extended, and `type` for unions, intersections, or simple aliases.

### Component Syntax
*   **Arrow Functions:** We prefer arrow functions for components and utilities over the `function` keyword.
	```tsx
	// Good
	const GoodComponent = () => {}

	// Avoid
	function BadComponent() {}
	```
*   **Export:** Use named exports or default exports as appropriate for the file type (e.g., Next.js pages require default exports). Inline regular exports, place default export at the end of the file.
	```tsx
	// Good
	export const MyGoodComponent = () => {}
	export const myUtility = () => {}
	const MyDefaultComponent = () => {}
	export default MyDefaultComponent

	// Avoid
	const MyBadComponent = () => {}
	export { MyBadComponent }
	```

### Imports
*   **Aliases:** Use path aliases defined in `tsconfig.json` (e.g., `@lib/`, `@components/`, `@l10n/`) instead of relative paths like `../../lib/`.

## 3. Architecture

This project uses the **Next.js App Router** with a specific structure:

*   **`app/[lang]/`**: The core application logic. The `[lang]` segment enforces internationalization at the routing level.
*   **`lib/`**: Pure utility functions and shared logic (SEO, asset helpers).
*   **`l10n/`**: Localization core. Contains the schema and dictionaries.
*   **`blog/` & `projects/`**: Data access layers and content for our MDX-based CMS.

## 4. Internationalization (i18n)

We use a strictly typed, schema-driven approach to localization.

1.  **Schema First:** All translation keys are defined in `l10n/dict.schema.json`.
2.  **Type Generation:** Run `pnpm run types` to update TypeScript definitions based on the schema.
3.  **Dictionaries:** Implement the translations in `l10n/dicts/` (e.g., `CG-dict.en.json`).
4.  **Usage:** Pass only the necessary slice of the dictionary to client components to minimize bundle size.

## 5. Content Management (MDX)

Content is treated as code.

*   **Blog Posts:** Located in `blog/content/[language]/`.
*   **Projects:** Located in `projects/content/[language]/`.
*   **Naming:** File names must be **English** and identical across all language directories (e.g., `projects/content/en/my-project.mdx` and `projects/content/hr/my-project.mdx`).

## 6. Asset Management

We use a custom asset fingerprinting system for cache busting.

*   **Source:** Place raw assets in the `assets/` root directory.
*   **Usage:** Never import directly from `assets/` in code. Use the `getAssetPath` helper from `@lib/assets`.
*   **Build:** The `pnpm run fingerprint` script hashes files and moves them to `public/assets/`.

## 7. Styling

*   **Tailwind CSS:** We use Tailwind CSS for all styling.
*   **Structure:** Keep styles utility-first. Avoid extracting `@apply` classes unless a pattern is repeated significantly.
*   **Responsiveness:** Mobile-first approach.

---

*By following these guidelines, we ensure that Hermes remains a robust, accessible and maintainable platform for Carbophile Group for years to come.*
