# Stopwatch Assignment

Build a fully functional stopwatch application with the following features:

### Required Functionality

- **Time Display**: Show elapsed time in `MM:SS:MS` format
- **Start**: Begin timing
- **Stop**: Pause timing (should be able to resume)
- **Reset**: Reset timer to 00:00:00
- **Lap**: Record lap times while the stopwatch is running

### Technical Requirements

- Work on a branch formatted as `feature/<your_name>` and push it when you're done
- Use Vue 3 Composition API with `<script setup>`
- Implement proper TypeScript typing
- **Use CCM internal UI components** from the installed libraries
- Ensure the UI is responsive and user-friendly
- All UI code should be contained in the App.vue.
  - You should still use composables as needed

## Getting Started

### 1. Setup Internal Package Registry

First, create a `.npmrc` file in the project root with the following content:

```
registry=https://registry.npmjs.org/
@ccm-engineering:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}
legacy-peer-deps=true
```

Make sure you have the `NPM_AUTH_TOKEN` environment variable set with your GitHub personal access token. If you're unsure how to do this you can instead replace it with your AUTH token. Just make sure it's not committed!

### 2. Install Required Internal Libraries

Add the following CCM internal packages to your project:

```bash
@ccm-engineering/ccm-common-style@1.3.21
@ccm-engineering/base-ui-library@2.1.0
@ccm-engineering/ui-components@2.0.1
```

### 3. Install other dependencies:

```bash
npm install
```

### 4. Start the development server:

```bash
npm run dev
```

## Tips

- Consider using `setInterval` for time updates
- Think about state management (refs, computed properties)
- Format time display consistently
- Handle edge cases (multiple starts, resets during timing, etc.)
- Explore the CCM UI component libraries to see what components are available
- Use CCM styling components for consistent design
  - You will need to explore existing repos to understand how the imports should be structured
