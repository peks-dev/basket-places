---
name: docs-creation
description: Crear y actualizar documentación en Basket Places. Usar cuando se cree, modifique o elimine documentación del proyecto.
version: 2.0.0
---

# Docs Creation - Basket Places

Guía para crear y mantener documentación. Los criterios de colaboración open-source están definidos en `CONTRIBUTING.md`.

## Estructura de Documentación

| Archivo | Propósito | Quién lo lee |
|---------|-----------|-------------|
| `AGENTS.md` (raíz) | Convenciones, stack, estructura, skills | Agentes AI y desarrolladores |
| `AGENTS.md` (dominio) | Contexto específico por dominio | Agentes AI trabajando en ese dominio |
| `SKILL.md` | Patrones y reglas para tareas específicas | Agentes AI ejecutando esa tarea |
| `CONTRIBUTING.md` | Guía de colaboración (AI-first) | Humanos y agentes AI |
| `README.md` | Descripción, instalación, comandos | Nuevos visitantes |
| `.github/PULL_REQUEST_TEMPLATE.md` | Template estructurado para PRs | AI (lo llena) → Humanos (lo revisan) |
| `.github/ISSUE_TEMPLATE/*.md` | Templates para bugs y features | Humanos y AI |

## Convenciones de Escritura

### Markdown
- Sintaxis estándar de Markdown
- Títulos en español (idioma principal del proyecto)
- Código en bloques con lenguaje especificado: ` ```tsx `
- Tablas para información estructurada (props, campos, opciones)
- Listas de checkbox para criterios verificables

### Idioma
- Documentación de dominio (AGENTS.md, SKILL.md): Español
- Templates de GitHub (PR, issues): Español
- CONTRIBUTING.md: Español con términos técnicos en inglés
- Comentarios JSDoc: Inglés (convención de la industria)

## Crear AGENTS.md de Dominio

Estructura obligatoria:

```markdown
# Dominio: [Nombre]

## Contexto
<!-- 1-2 oraciones: qué es y para qué sirve -->

## Stack Tecnológico
<!-- Librerías y herramientas específicas del dominio -->

## Estructura
<!-- Árbol de carpetas con descripción de cada archivo -->

## Patrones Importantes
<!-- Los 3-5 patrones que un agente DEBE conocer -->
<!-- Incluir ejemplos de código -->

## Reglas Específicas
<!-- Lo que SÍ y lo que NO hacer en este dominio -->

## Auto-invoke Skills
<!-- Tabla: acción → skill a cargar -->

## Referencias
<!-- Archivos clave y links externos -->
```

## Crear SKILL.md

Estructura obligatoria:

```markdown
---
name: skill-name
description: Descripción clara de cuándo usar esta skill
version: 1.0.0
---

# Skill Name - Basket Places

## Instructions
<!-- Pasos o reglas a seguir -->

## Example
<!-- Ejemplo concreto de entrada/salida -->

## Constraints
<!-- Lo que NO hacer -->

## References
<!-- Archivos y recursos relacionados -->
```

Frontmatter obligatorio: `name`, `description`, `version`.

## Documentar Componentes

```tsx
/**
 * Brief description of the component.
 * @param props - Description of main props
 * @returns Description of what it renders
 *
 * @example
 * <Componente prop1="valor" prop2={true} />
 */
export function Componente(props: Props) {
  // ...
}
```

## Criterios de Aceptación para PRs de Docs

- [ ] Ortografía revisada
- [ ] Consistencia con documentación existente
- [ ] Ejemplos de código funcionan (verificar con `npm run build`)
- [ ] No duplicar información entre archivos (referenciar, no copiar)
- [ ] AGENTS.md sigue la estructura obligatoria
- [ ] SKILL.md tiene frontmatter completo

## Qué NO hacer

- ❌ Duplicar información que ya existe en otro AGENTS.md (referenciar con link)
- ❌ Crear AGENTS.md para carpetas triviales (2-3 archivos simples no necesitan doc)
- ❌ Incluir información que puede quedar desactualizada rápido (números de línea, counts)
- ❌ Escribir documentación sin leer primero el código real (verificar que coincide)
- ❌ Dejar TODOs sin fecha o contexto de cuándo resolverlos

## Referencias

- `CONTRIBUTING.md` - Criterios de colaboración open-source
- `AGENTS.md` (raíz) - Contexto general del proyecto
- `.agents/skills/` - Skills del proyecto (ejemplos de estructura SKILL.md)
- [Conventional Commits](https://www.conventionalcommits.org/) - Formato de commits
