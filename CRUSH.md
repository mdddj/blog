# CRUSH.md for blog

This file outlines common commands and code style guidelines for this repository.

## Commands

- **Build**: `umi build`
- **Start Development Server**: `umi dev`
- **Lint (Code)**: `oxlint`
- **Lint (Styles)**: `stylelint "**/*.{css,less,scss}"`
- **Test**: `umi test`
- **Test (single file)**: `umi test <path-to-test-file>`

## Code Style Guidelines

- **Formatting**: Adhere to the existing Prettier/ESLint configurations if any.
- **Imports**: Use absolute imports where possible, relative imports for sibling files.
- **Types**: Use TypeScript for all new code and refactors.
- **Naming Conventions**:
    - `PascalCase` for components and types.
    - `camelCase` for variables and functions.
    - `kebab-case` for CSS classes and file names.
- **Error Handling**: Use `try...catch` blocks for asynchronous operations and API calls.
- **Components**: Prefer functional components with React Hooks.
- **State Management**: Utilize Zustand for global state.
- **CSS**: Use Tailwind CSS and Ant Design for styling.
