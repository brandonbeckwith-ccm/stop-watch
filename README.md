# Day 2: Git Merge Practice & Feature Development

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

## Final Step

Once you've completed Tasks 2 and 3, raise a new PR from your `-day-2` branch against your original Day 1 branch (e.g., `feature/yourname-day-2` → `feature/yourname`). Take a moment to reflect and comment any observations or things you wish you did differently.

## Development Setup

```bash
npm install
npm run dev
```
