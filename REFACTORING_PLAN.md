# Refactoring Plan: Feature-Component Design Pattern

## 1. Overview
The current project uses a classic "role-based" directory structure (separating by `components`, `screens`, `constants`, `hooks`). To improve scalability, maintainability, and encapsulation, we will transition to a **Feature-Component Design Pattern** (similar to Feature-Sliced Design). This approach groups files by domain or feature rather than by technical type.

## 2. Identified Features
Based on the current components and screens, the application primarily revolves around three distinct features:
1. **Animal Sounds List:** Exploring and playing animal sounds.
2. **Guess Animal Game:** A quiz/guessing game based on sounds.
3. **Animal Piano:** A playful piano interface using animal sounds.

## 3. Proposed Directory Structure

We will introduce a `src/` directory to encapsulate the application logic, separating it from the Expo Router `app/` directory.

```text
/var/www/html/old/animals/
├── app/                      # Expo Router files (Routes)
│   ├── _layout.tsx           # Main layout, Providers
│   └── index.tsx             # Main entry point (imports from features)
├── src/
│   ├── core/                 # Shared logic, UI, and configs used globally
│   │   ├── components/       # Global UI (themed-view, collapsible, icon-symbol)
│   │   ├── constants/        # theme.ts, animals.ts
│   │   ├── hooks/            # Global hooks
│   │   └── navigation/       # Navigation-specific components (e.g., tab-bar.tsx)
│   │
│   ├── features/             # Domain-specific modules
│   │   ├── animal-sounds/    # Feature 1
│   │   │   ├── components/   # e.g., animal-grid-card.tsx
│   │   │   ├── screens/      # e.g., all-sounds-screen.tsx
│   │   │   └── hooks/        # Specific logic for this feature
│   │   │
│   │   ├── guess-animal/     # Feature 2
│   │   │   ├── components/   # e.g., choice-card.tsx
│   │   │   ├── screens/      # e.g., guess-screen.tsx
│   │   │   └── hooks/
│   │   │
│   │   └── animal-piano/     # Feature 3
│   │       ├── components/   # e.g., piano-key.tsx
│   │       ├── screens/      # e.g., animal-piano-screen.tsx
│   │       └── hooks/
│   │
│   ├── assets/               # Images, Voices, Fonts
│   └── types/                # Global TypeScript definitions
```

## 4. Migration Steps

### Step 1: Create the new structure
- Create `src/core`, `src/features/animal-sounds`, `src/features/guess-animal`, and `src/features/animal-piano` directories.

### Step 2: Relocate Core & Shared Assets
- Move `constants/` into `src/core/constants/`.
- Move global UI components (`themed-view.tsx`, `themed-text.tsx`, `parallax-scroll-view.tsx`, `ui/`) to `src/core/components/`.
- Move `components/animal/tab-bar.tsx` and `components/haptic-tab.tsx` to `src/core/navigation/`.
- Move `types/` and `assets/` into `src/`.

### Step 3: Refactor Features
- **Animal Sounds Feature:**
  - Move `components/animal/animal-grid-card.tsx` to `src/features/animal-sounds/components/`.
  - Move `screens/all-sounds-screen.tsx` to `src/features/animal-sounds/screens/`.
- **Guess Animal Feature:**
  - Move `components/animal/choice-card.tsx` to `src/features/guess-animal/components/`.
  - Move `screens/guess-screen.tsx` to `src/features/guess-animal/screens/`.
- **Animal Piano Feature:**
  - Move `components/animal/piano-key.tsx` to `src/features/animal-piano/components/`.
  - Move `screens/animal-piano-screen.tsx` to `src/features/animal-piano/screens/`.

### Step 4: Update Imports
- Fix relative paths across all files. Using absolute imports (e.g., configuring `tsconfig.json` paths like `@/core/*` and `@/features/*`) is highly recommended at this stage to avoid complex `../../../` paths.

### Step 5: Clean Up Expo Router (`app/`)
- Ensure that `app/` strictly handles routing. Routes should cleanly import the corresponding screen components from `src/features/.../screens/`.
- Delete the old `screens/` and `components/` directories at the project root once empty.

## 5. Benefits of this Pattern
- **Scalability:** New features can be added as isolated modules without cluttering global directories.
- **Maintainability:** Developers can easily find all code related to a specific feature (UI, logic, state) in one place.
- **Encapsulation:** Features are less likely to become tightly coupled to each other.