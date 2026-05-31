---
name: git-workflow
description: Estrategia completa de Git para Basket Places. Usar para ramas, commits, merges, pull requests y cualquier operación git.
version: 1.0.0
---

# Git Workflow - Basket Places

Skill para todas las operaciones de Git. Carga esta skill cuando necesites hacer cualquier cosa relacionada con git.

## Estrategia de Ramas

### Ramas Principales

```
main          → Producción (protected, NO push directo)
develop       → Integración de features
```

### Ramas de Soporte

| Prefijo | Formato | Uso |
|---------|---------|-----|
| Feature | `feature/[nombre]` | Nuevas funcionalidades |
| Hotfix | `hotfix/[nombre]` | Fixes críticos de producción |
| Release | `release/[version]` | Preparación de versiones |
| Refactor | `refactor/[nombre]` | Refactoring sin cambio de features |

### Reglas de Ramas

```
main          → Protected (require PR + review)
develop       → Protected (require PR + review)
feature/*     → Libre (sin restricciones)
hotfix/*      → Libre pero con urgencia
```

## Commits - Conventional Commits

### Formato

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Uso |
|------|-----|
| `feat` | Nueva feature |
| `fix` | Bug fix |
| `docs` | Documentación |
| `style` | Formateo, estilos (no lógica) |
| `refactor` | Refactoring sin cambio de funcionalidad |
| `test` | Tests |
| `chore` | Mantenimiento, dependencias |
| `perf` | Optimización de performance |
| `ci` | CI/CD |
| `build` | Build process |

### Scopes (Áreas del Proyecto)

#### Scopes Técnicos
- `ui` - Componentes UI globales
- `auth` - Autenticación
- `config` - Configuraciones
- `deps` - Dependencias
- `build` - Build
- `ci` - CI/CD
- `deploy` - Deployment

#### Scopes Funcionales
- `communities` - Comunidades/canchas
- `contribution` - Formulario de contribución
- `reviews` - Sistema de reviews
- `map` - Mapas y geolocalización
- `profile` - Perfil de usuario
- `search` - Búsqueda (no implementado aún)
- `shared` - Componentes compartidos

### Ejemplos de Commits

```bash
# Feature nueva
feat(communities): add community detail page with map

- Implement community detail view
- Add geocoding for address display
- Integrate map component
- Add responsive layout

# Bug fix
fix(reviews): resolve duplicate review submission

- Add user-community constraint validation
- Fix race condition in review creation
- Update error messages

# Documentación
docs(AGENTS): add contribution wizard documentation

- Document 10-step wizard flow
- Add schema validation rules
- Include data flow diagram

# Refactor
refactor(auth): extract OTP validation logic

- Move validation to separate hook
- Improve error handling
- Add unit tests

# Chore
chore(deps): upgrade nextjs to 15.1

- Update package.json
- Run migration scripts
- Verify build passes
```

## Workflow de Desarrollo

### Flujo Completo

```bash
# 1. Asegurarse que develop está actualizado
git checkout develop
git pull origin develop

# 2. Crear rama desde develop
git checkout -b feature/nueva-functionalidad

# 3. Trabajar en la feature (commits frecuentes)
git add .
git commit -m "feat(scope): descripción"

# 4. Mantener actualizada la rama (rebase)
git fetch origin
git rebase origin/develop

# 5. Push y crear PR
git push -u origin feature/nueva-functionalidad

# 6. Después del merge, eliminar rama
git checkout develop
git pull origin develop
git branch -d feature/nueva-functionalidad
```

### Commits Atómicos

**Un commit = un cambio específico**

```bash
# ❌ Mal - múltiples cambios en un commit
git commit -m "feat(communities): add listing and detail pages, fix UI bugs"

# ✅ Bueno - commits separados
git commit -m "feat(communities): add community listing component"
git commit -m "feat(communities): add community detail page"
git commit -m "fix(ui): resolve button alignment on mobile"
```

## Pull Requests

### Crear PR

```bash
# Usando gh cli
gh pr create \
  --title "feat(communities): add advanced filtering" \
  --body "$(cat <<'EOF'
## Summary
- Add filter by court type
- Include radius filtering
- Implement amenities filter

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing verified

## Checklist
- [ ] Follows commit conventions
- [ ] Documentation updated
- [ ] No console errors
EOF
)" \
  --base develop \
  --reviewer owner
```

### Checklist antes de PR

- [ ] Commits siguen convenciones Conventional Commits
- [ ] Tests pasan (`npm run lint && npm run build`)
- [ ] Documentación actualizada si aplica
- [ ] Rama está rebaseada sobre develop最新
- [ ] No hay conflictos

## Merging

### Tipos de Merge

```bash
# Merge regular (creates merge commit)
git checkout develop
git merge feature/mi-feature

# Squash merge (1 commit en develop)
git checkout develop
git merge --squash feature/mi-feature
git commit -m "feat(scope): complete feature description"
```

### Resolución de Conflictos

```bash
# 1. Abortar si hay conflictos problemáticos
git merge --abort

# 2. Resolver conflictos manualmente
git status  # ver archivos en conflicto
# Editar archivos en conflicto

# 3. Marcar como resuelto
git add .
git commit -m "fix: resolve merge conflicts in communities"

# 4. Continuar merge
git commit  # completar si es un squash
```

## Hotfixes

### Flujo de Hotfix

```bash
# 1. Crear hotfix desde main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# 2. Hacer fix y commit
git add .
git commit -m "fix(auth): resolve OTP timeout issue"

# 3. Merge a main Y develop
git checkout main
git merge hotfix/critical-bug-fix
git push origin main

git checkout develop
git merge hotfix/critical-bug-fix
git push origin develop

# 4. Eliminar hotfix
git branch -d hotfix/critical-bug-fix
```

## Git Hooks (Pre-commit)

El proyecto usa pre-commit hooks para mantener calidad de código.

### Hooks Configurados

```bash
# Ubicación
.git/hooks/

# Para activar hooks manualmente (si no funcionan)
npm run prepare
```

### Verificar Hooks

```bash
# Verificar que hooks están activos
ls -la .git/hooks/

# Test hook manualmente
npx lint-staged
```

## Comandos Útiles

### Ver Estado

```bash
git status                    # Estado general
git diff                     # Cambios no staged
git diff --staged           # Cambios staged
git diff HEAD~1            # vs commit anterior
```

### Ver Historial

```bash
git log --oneline -10       # Últimos 10 commits
git log --graph --oneline   # Visualizar ramas
git log --author="name"     # Filtrar por autor
```

### Buscar en Commits

```bash
git log --grep="fix"        # Buscar por mensaje
git log -p --follow file    # Historial de archivo
git blame file              # Quién cambió cada línea
```

### Deshacer

```bash
git checkout -- file         # Descartar cambios en archivo
git reset HEAD file         # Quitar de staging
git revert HEAD            # Crear commit que deshace anterior
git reset --soft HEAD~1    # Deshacer último commit (mantiene cambios)
```

### Stash (Guardar cambios temporalmente)

```bash
git stash                   # Guardar cambios
git stash pop              # Recuperar cambios
git stash list             # Ver stashes
```

## Auto-invoke

Esta skill se auto-invoca cuando:

| Acción | Cuándo |
|--------|--------|
| Hacer commits | **SIEMPRE** antes de commit |
| Crear ramas | `git checkout -b`, `git branch` |
| Merge | `git merge` |
| Pull requests | `gh pr create` |
| Hotfix | Rama con prefijo `hotfix/*` |

## Anti-Patrones

### ❌ NO Hacer

```bash
# Push directo a main/develop
git push origin main

# Commits sin scope
git commit -m "fix: something broke"

# Mezclar cambios sin relación
git commit -m "feat: many things"

# Force push a ramas compartidas
git push --force origin develop

# Commits con WIP
git commit -m "WIP"
git commit -m "temp fix"
```

### ⚠️ Cuidado

```bash
# Rebase en ramas compartidas (solo si sabes lo que haces)
git rebase origin/develop

# Reset en ramas públicas (casi nunca hacer)
git reset --hard HEAD~1
```

## Referencias

- Conventional Commits: https://www.conventionalcommits.org/
- Git Flow: https://nvie.com/posts/a-successful-git-branching-model/