# Graphify: grafo de código precomputado

Este repo versiona un **grafo de conocimiento del código** en `graphify-out/`
([graphify](https://graphifylabs.ai/)). Los agentes de IA lo leen para navegar y
razonar sobre el codebase gastando muchos menos tokens que explorando archivo por
archivo. Por eso el grafo debe permanecer **siempre sincronizado con el código
commiteado**.

## Qué se versiona

Se commitea: `graph.json`, `graph.html`, `GRAPH_REPORT.md`, `manifest.json`,
`.graphify_labels.json`. Se ignora la caché local (`graphify-out/cache/`, ver
`.gitignore`).

## Política de sincronización: hook `pre-commit` (no `post-commit`)

El hook **por defecto** de graphify (`graphify hook install`) es `post-commit`:
regenera el grafo *después* del commit y lo deja **sin commitear**, por lo que el
grafo del repo se desincroniza del código. Aquí usamos en su lugar un hook
**`pre-commit`** que:

1. Regenera el grafo de forma incremental a partir de los archivos *staged*
   (solo re-extrae lo que cambió → rápido, sin LLM).
2. Hace `git add graphify-out/` para que el grafo actualizado entre en **el mismo
   commit** que el código.

Si solo hay artefactos de `graphify-out/` en el stage, el hook no hace nada (evita
bucles). Si graphify no está instalado o el rebuild falla, el commit continúa sin
bloquearse (solo se imprime un aviso).

## Setup en un clon nuevo

Requisito: tener graphify instalado (p. ej. `uv tool install graphifyy`).

Los hooks de git no se clonan. Copia el hook versionado a tu `.git/hooks/`:

```bash
cp scripts/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

> No ejecutes `graphify hook install`: instalaría el hook `post-commit` por
> defecto, que es justo el comportamiento que evitamos aquí.

## Regenerar el grafo manualmente

```bash
graphify update .     # re-extrae código y actualiza graph.json (sin LLM)
```

Para cambios de docs/imágenes (que el hook ignora) usa también `graphify update`.
