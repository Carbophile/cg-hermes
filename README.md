# Carbophile Group Hermes

This project is an informational web application serving as the hub for information about Carbophile Group, the Croatian
cybersecurity nonprofit.

It has a static site generation (SSG) architecture with built-in support for internationalization (i18n) and an
MDX-based content management system to allow easy writing of blogs and projects.

The project codename comes from [Hermes](https://en.wikipedia.org/wiki/Hermes), the messenger of the Greek gods.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Cloudflare Workers
- **Content:** MDX (Markdown + JSX)

## Local Development

### Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/Carbophile/cg-hermes.git
   cd cg-hermes
   ```

2. Install the dependencies:
   ```shell
   pnpm install
   ```

### Running Locally

To start the development server with hot-reloading and dynamic compilation:

```shell
pnpm run dev
```

### Testing for Production

To emulate a production environment for testing:

```shell
pnpm run preview
```

### Deployment

The `HEAD` of the `main` branch is automatically deployed.

## Development Guidelines

### Project Structure

- **`app/[lang]/`:** Contains the application routes. The `[lang]` dynamic segment handles localization (e.g., `/en/`
  `/hr/`)
- **`l10n/`:** Handles localization logic and houses the dictionaries
- **`blog/` & `projects/`**: Contain the data access layers and MDX content for blog posts and project showcases
- **`assets/`**: Source for static assets such as images and videos (fingerprinted at build time)

### Internationalization (i18n)

The application supports multiple languages (currently English and Croatian). Content is localized using typed JSON
dictionaries. Everything must be fully localized.

#### Adding a new translation string

1. Add the new key, along with a description, to `l10n/dict.schema.json`
2. Regenerate types:
   ```shell
   pnpm run types
   ```
3. Navigate to `l10n/dicts/`.
4. Add the corresponding key translations to each of the dictionaries.

Client components should get a reduced dictionary with only the keys they need to reduce the bundle size.

### Content Management (MDX)

Blog posts and project entries are stored as MDX files. File names should be in English regardless of language.

#### Adding a New Blog Post

1. Navigate to `blog/content/[language]/`.
2. Create a new `.mdx` file.
3. Populate the file with the frontmatter and the blog content itself.
4. If needed, add the author's headshot to `assets/headshots/`
5. Create variations for all other languages with the same file name.

#### Adding a New Project:

1. Navigate to `projects/content/[language]/`.
2. Create a new `.mdx` file.
3. Populate the file with the frontmatter and the project write-up itself.
4. Create variations for all other languages with the same file name.

### Code Quality and Formatting

This project uses **Biome** for fast linting and formatting. It replaces ESLint and Prettier.

To automatically fix issues in the code:

```shell
pnpm run check
```

To apply unsafe fixes (they are fine most of the time, just verify they didn't mess anything up):

```shell
pnpm run check:unsafe
```

You will not be able to merge into `main` if there are formatting issues.
