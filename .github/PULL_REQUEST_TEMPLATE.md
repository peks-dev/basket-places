## Summary

<!-- One sentence describing what this PR does -->

## Related Issue

Closes #

## What Changed

<!-- List the specific changes made. Be concrete, not vague. -->

-

## Why

<!-- Explain the reasoning. Why this approach? Why not an alternative? -->

## Scope of Impact

<!-- Which domains/areas are affected? Reference the AGENTS.md if applicable. -->

- [ ] Auth (`app/(auth)/`)
- [ ] Map (`app/(main)/map/`)
- [ ] Communities (`app/(main)/comunidad/`)
- [ ] Contribution wizard (`app/(main)/comunidad/contribuir/`)
- [ ] Reviews (`app/(main)/comunidad/reviews/`)
- [ ] Profile (`app/(main)/perfil/`)
- [ ] Panel system (`app/(main)/@panel/`)
- [ ] Global Menu (`app/(shared)/GlobalMenu/`)
- [ ] Theme (`app/components/theme/`)
- [ ] Modal (`app/components/ui/Modal/`)
- [ ] Notifications (`app/(shared)/notifications/`)
- [ ] Error handling (`lib/errors/`)
- [ ] AI integration (`lib/services/ai/`)
- [ ] Supabase/DB (`lib/supabase/`)
- [ ] Other: ___________

## How to Verify

<!-- Steps a reviewer can follow to confirm the change works correctly. Be specific. -->

1.
2.
3.

## Checklist

- [ ] Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Followed the conventions in the relevant AGENTS.md
- [ ] No unrelated changes included (refactors, formatting, etc.)
- [ ] Error handling uses `handleServiceError()` in Server Actions
- [ ] User-facing errors use `showErrorToast()` / `showSuccessToast()`

## Screenshots (if UI changes)

<!-- Before/after screenshots for visual changes -->
