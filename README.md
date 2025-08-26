# Day 3.5: Advanced Vue Features & Reactive Navigation

## Task 1: Category-Based Navigation

Update the navigation to support categories. Move the clock-related pages under a Clock category.

**Requirements:**

- Organize existing clock functionality under a "Clock" category
- Implement nested/grouped navigation structure
- Maintain responsive design

## Task 2: Calculator Application

Create a new calculator page supporting basic mathematical operations.

**Requirements:**

- Support division, multiplication, addition, subtraction, and parentheses
- Use Windows calculator as a design reference
- Support both GUI button clicks and keyboard input (Google calculator style)
- Implement calculation history with ability to restore previous calculations
- Display current calculation and result clearly

**Mathematical Operations:**

- Basic arithmetic: +, -, ×, ÷
- Parentheses for order of operations
- Clear/reset functionality
- Error handling for invalid operations

## Task 3: Reactive Navigation Bar with Provide/Inject

Create a reactive navigation bar system that dynamically updates based on the current page using Vue's provide/inject pattern.

**Requirements:**

- Create an injectable navigation service/composable that provides:
  - Page title management
  - Page icon management
  - Status information display
- Implement a reactive navigation bar component that:
  - Shows current page title and icon
  - Displays contextual status information
  - Updates automatically when navigating between pages
- Update existing components to use the injected service:
  - **Clock pages**: Show timer count as status
  - **Calculator page**: Show current calculation result as status
  - **Other pages**: Show relevant contextual information

**Technical Implementation:**

- Use Vue 3's `provide`/`inject` composition API
- Create a composable (e.g., `useNavigation`) for the injectable service
- Implement reactive refs for title, icon, and status
- Ensure the navigation bar updates immediately on page load and navigation

## Task 4: Vue Reactivity Research

Update this README with your findings on Vue reactivity patterns found in real-world applications.

**Research Focus:**

- Document examples of different types of refs, computeds, and reactives
- Find patterns in open-source Vue projects
- Identify common use cases and best practices
- Note any interesting or unexpected implementations

**Deliverable:** Add a new section below with your research findings, including:

- Code examples (with source attribution)
- Use case descriptions
- Personal observations or insights

## Getting Started

Continue working on your existing day-3 branch (or create one from day-2 if you haven't started day-3):

```bash
git checkout feature/yourname-day-3  # or create from day-2: git checkout -b feature/yourname-day-3 feature/yourname-day-2
git pull origin feature/yourname-day-3
```

Complete Tasks 1, 2, and 3, committing and pushing your changes as you go.

## Final Step

Once you've completed all tasks, raise a new PR from your `-day-3` branch against your day-2 branch (e.g., `feature/yourname-day-3` → `feature/yourname-day-2`). Include your Task 4 research findings in the PR description or as commits to this README.

## Development Setup

```bash
npm install
npm run dev
```
