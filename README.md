# Day 2.5: Git Merge Practice, Feature Development & Reactivity

## Task 1: Git Conflict Resolution

Find your assigned PR (one of PRs #15-26) where someone else's branch merges into your `-merge-practice` branch.

**Your options for resolving conflicts:**
- **Merge commit**: Standard merge with merge commit
- **Rebase**: Replay commits to create linear history  
- **Squash merge**: Combine all commits into single commit

Resolve the conflicts and complete the merge using your chosen strategy.

## Task 2: Navigation Menu

Rebase your day-2 branch from master and then add a navigation menu to your application. 

**Requirements:**
- Must function as navigation (routing between views/sections)
- Implementation approach is flexible (tabs, sidebar, header nav, etc.)
- Must be responsive

Commit and push your changes.

## Task 3: World Clock Feature

Add configurable world clocks that display current times in different timezones.

**Requirements:**
- **Default clocks:** User's local time (browser timezone), EST, and your current physical location timezone
- Users can add and remove additional clocks
- Clock preferences persist between page visits (use localStorage)

**Required setup:**
```bash
npm install @vueuse/core dayjs
```

You're encouraged to use these libraries but not required to.

Commit and push your changes.

## Task 4: Vue Reactivity Deep Dive

Vue's reactivity system uses JavaScript Proxies to track dependencies and trigger updates. Explore how this works by implementing a custom reactive ref.

**Resources:**
- [Vue Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html) - Official docs explaining proxy-based reactivity
- [Reactivity API: Advanced](https://vuejs.org/api/reactivity-advanced.html) - customRef, shallowRef, triggerRef APIs
- [How Vue 3 Reactivity Works Under the Hood](https://medium.com/@ignatovich.dm/how-vue-3s-reactivity-works-under-the-hood-with-proxies-explained-simply-4593048bafdf) - Deep dive into implementation

**Your Task:**
Implement a custom ref using Vue's `customRef` API. Consider these use cases as inspiration:
- **Debounced input**: Delay reactivity updates for search/filter inputs
- **Validation ref**: Only trigger updates when value passes validation
- **History ref**: Track previous values with undo capability
- **Throttled ref**: Limit update frequency for performance-intensive operations

Try to integrate your new ref with one of the features you've worked on. If you can't please go ahead and

## Final Step

Once you've completed Tasks 2, 3, and 4, raise a new PR from your `-day-2` branch against your original Day 1 branch (e.g., `feature/yourname-day-2` → `feature/yourname`). Take a moment to reflect and comment any observations or things you wish you did differently.

## Development Setup

```bash
npm install
npm run dev
```
