---
name: docs-creation
description: Crear y actualizar documentación en Basket Places. Reglas básicas mientras se establecen criterios de colaboración open-source.
version: 1.0.0
---

# Docs Creation - Basket Places

Guía temporal para documentación. **TODO: Expandir cuando se definan criterios de colaboración open-source.**

## Convenciones Básicas

### Markdown
- Usar sintaxis estándar de Markdown
- Títulos en español (idioma principal del proyecto)
- Código en bloques con lenguaje especificado: ```tsx

### Estructura de Archivos

**README.md**: 
- Descripción del proyecto
- Instalación rápida
- Comandos principales
- Enlace a documentación completa

**AGENTS.md** (ya existe en raíz):
- No modificar sin consultar
- Seguir estructura establecida

**SKILL.md** (en `/skills/`):
- Frontmatter obligatorio (name, description, version)
- Instrucciones claras y concisas
- Ejemplos de código
- Sección "Qué NO hacer"

## Documentar Componentes

```tsx
/**
 * Breve descripción del componente.
 * @param props - Descripción de props principales
 * @returns Descripción del retorno
 * 
 * @example
 * <Componente prop1="valor" prop2={true} />
 */
export function Componente(props: Props) {
  // ...
}
```

## Reglas Mínimas de Colaboración

- [ ] Revisar ortografía antes de commit
- [ ] Mantener consistencia con documentación existente
- [ ] Actualizar TOC si se agregan secciones
- [ ] Verificar que los ejemplos de código funcionen
- [ ] No duplicar información entre archivos

## TODO - Pendiente Definir

- [ ] Estructura de documentación open-source (CONTRIBUTING.md)
- [ ] Guía de estilo para documentación técnica
- [ ] Criterios de aceptación para PRs de docs
- [ ] Plantillas para issues y PRs
- [ ] Documentación de arquitectura técnica
- [ ] Guías de contribución por dominio

## Referencias

- `README.md` - Documentación principal
- `AGENTS.md` - Contexto para agentes AI
- `skills/*.md` - Skills del proyecto (ejemplos de estructura)
