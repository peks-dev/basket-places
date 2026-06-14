# Contributing to Basket Places

Thank you for your interest in contributing! This guide explains how to collaborate effectively, whether you're a human developer or an AI agent.

## Project Overview

Basket Places is a web app for discovering local basketball communities. Built with Next.js 15, Supabase, React Leaflet, and TypeScript. The app uses OTP authentication, interactive maps, and a community contribution system.

Before contributing, read the root [`AGENTS.md`](./AGENTS.md) for project conventions, stack details, and domain-specific documentation.

## AI-First Collaboration

This project is designed for **AI-assisted development**. The documentation structure (AGENTS.md + SKILL.md files) provides the context agents need to work autonomously. However, all AI-generated changes **must be reviewed by a human before merging**.

### Why AI-First?

Writing code is no longer the bottleneck — reviewing it is. This project optimizes for:

1. **Atomic changes** — Small, focused PRs that are quick to review
2. **Self-documented PRs** — Every PR explains what, why, and how to verify
3. **Automated quality gates** — Lint, build, and typecheck must pass before review
4. **Traceability** — Every PR links to an issue with clear acceptance criteria

## How to Contribute

### 1. Find or Create an Issue

Before writing any code, there must be an issue describing the work. External contributions should target `development`; `main` is controlled by the maintainer for releases/production.

- **Bugs**: Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug.md)
- **Features**: Use the [Feature Proposal template](.github/ISSUE_TEMPLATE/feature.md)

### 2. Create a Branch

```bash
# From development
git checkout development
git pull origin development
git checkout -b feature/short-description
```

Branch naming conventions:

| Prefix | Use |
|--------|-----|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `refactor/` | Code restructuring without behavior changes |
| `docs/` | Documentation only |
| `chore/` | Maintenance, dependencies |

### 3. Work on the Change

**Read the relevant AGENTS.md first.** Each domain has its own documentation:

- Working on maps? Read [`app/(main)/map/AGENTS.md`](./app/(main)/map/AGENTS.md)
- Working on auth? Read [`app/(auth)/AGENTS.md`](./app/(auth)/AGENTS.md)
- Working on communities? Read [`app/(main)/comunidad/AGENTS.md`](./app/(main)/comunidad/AGENTS.md)

For the full list, see the "Componentes/Dominios principales" table in the root [`AGENTS.md`](./AGENTS.md).

**Follow project conventions:**

- Use `validateOrThrow()` for Zod validation
- Use `handleServiceError()` in Server Actions
- Use `Result<T>` for return types (`ok()` / `fail()`)
- Use `showSuccessToast()` / `showErrorToast()` for user feedback
- Use `useModalStore()` for modals, never render `<Modal />` manually

### 4. Make Atomic Commits

One commit = one logical change. Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(reviews): add delete confirmation modal
fix(auth): resolve infinite redirect on protected routes
refactor(map): extract marker icon logic to utils
docs(contributing): add AI-first collaboration guide
```

### 5. Verify Before Pushing

```bash
npm run lint        # ESLint check
npm run typecheck   # TypeScript check
npm run build       # Production build
```

All checks must pass. If they don't, fix before creating a PR.

### 6. Create a Pull Request

Open your Pull Request against `development`, not `main`.

Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md). Fill all sections — especially:

- **What changed** and **why** (context for reviewers)
- **How to verify** (steps a human can follow)
- **Scope of impact** (what areas are affected)

## PR Review Process

```
PR to development → CI checks (lint + typecheck + build) → Human review → Merge
                ↓ fail                       ↓ request changes
           Fix and re-push              Update and re-request
```

### What Reviewers Look For

1. **Correctness** — Does the code do what the issue describes?
2. **Conventions** — Does it follow the patterns in AGENTS.md and SKILL.md files?
3. **Error handling** — Are errors handled with `handleServiceError()` and typed errors?
4. **No regressions** — Does existing functionality still work?
5. **Scope** — Is the PR focused on one thing? No unrelated changes.

### For AI Agents: How to Make Reviewable PRs

The biggest challenge with AI-generated code is reviewability. Follow these rules:

- **One PR = one concern.** If an issue requires changes in 3 domains, create 3 PRs.
- **Explain the "why" in the PR description**, not just the "what." Code shows what; the PR description shows why.
- **Include verification steps.** A reviewer should be able to verify your change in under 5 minutes.
- **Don't refactor unrelated code.** Even if you see improvements, save them for a separate PR.
- **Reference the AGENTS.md** you followed. This shows the reviewer you worked within the project's conventions.

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on the code and the problem, not the person
- Ask questions when something is unclear — there are no dumb questions
- Help others learn from your knowledge and experience

## Questions?

If you're unsure about anything, open an issue with the "question" label. We're happy to help.
