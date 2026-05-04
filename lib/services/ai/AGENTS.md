# Dominio: AI Integration

## Contexto

Integración con modelos de lenguaje (LLM) para análisis de contenido: imágenes de comunidades, avatares, y comentarios/reviews.

## Stack Tecnológico

- **Gemini (Google)**: Modelo LLM principal
- **AI Factory**: Patrón factory para proveedores
- **Prompt Engineering**: Prompts optimizados

## Estructura

```
lib/services/ai/
├── providers/
│   └── gemini/
│       ├── geminiService.ts      # Servicio Gemini
│       └── types.ts              # Tipos específicos
├── core/
│   ├── aiFactory.ts              # Factory de providers
│   └── types.ts                  # Tipos genéricos
├── analyzers/
│   ├── textAnalyzer.ts           # Análisis de texto
│   ├── imageAnalyzer.ts          # Análisis de imágenes
│   └── types.ts
├── errors/
│   ├── custom.ts                 # Errores personalizados
│   ├── codes.ts                  # Códigos de error
│   ├── messages.ts               # Mensajes
│   └── index.ts
├── config/
│   └── aiConfig.ts               # Configuración
└── utils/
    ├── validators.ts             # Validaciones
    └── parsers.ts                # Parsers de respuesta
```

## Patrones Importantes

### AI Factory

Usar factory para obtener provider configurado:

```tsx
import { getAIService } from './core/aiFactory';

const ai = getAIService(); // Retorna provider configurado (Gemini)
```

### Análisis de Imágenes

```tsx
import { analyzeImage } from './analyzers/imageAnalyzer';

const result = await analyzeImage(imageFile, {
  type: 'community', // o 'avatar'
});

// Retorna: { isValid, feedback, categories? }
```

Tipos de análisis:

- **community**: Valida que sea cancha de basketball
- **avatar**: Valida que sea foto de persona real

### Análisis de Texto (Reviews)

```tsx
import { analyzeComment } from './analyzers/textAnalyzer';

const result = await analyzeComment(commentText);

// Retorna: { sentiment, confidence, topics? }
```

### Prompts

Los prompts están en archivos separados por dominio:

```
prompts/
├── imageAnalysis.ts      # Prompts para imágenes
├── textAnalysis.ts       # Prompts para texto
└── communityValidation.ts # Validación de comunidades
```

Estructura de un prompt:

```tsx
export const imageAnalysisPrompt = {
  system: 'Eres un asistente especializado en...',
  user: (image: File) => `Analiza esta imagen...`,
};
```

## Manejo de Errores

Errores específicos en `errors/custom.ts`:

```tsx
throw new AIServiceError(
  'Error al analizar imagen',
  'AI_ANALYSIS_FAILED',
  'gemini'
);

throw new ImageValidationError(
  'La imagen no cumple los criterios',
  'IMAGE_VALIDATION_FAILED',
  'gemini',
  'content_policy'
);
```

## Rate Limiting & Retry

El servicio maneja automáticamente:

- Rate limiting con backoff exponencial
- Reintentos en fallos temporales
- Fallback a mensajes por defecto

## Reglas Específicas

1. **Siempre usar** factory (`getAIService`), no providers directamente
2. **Validar** inputs antes de enviar a AI
3. **Manejar errores** con clases específicas
4. **No hardcodear** prompts, usar archivos separados
5. **Timeout**: Máximo 30s para análisis
6. **Fallback**: Si AI falla, permitir acción con warning

## Auto-invoke Skills

| Acción             | Skill                   |
| ------------------ | ----------------------- |
| Análisis de imagen | Usar servicio existente |
| Análisis de texto  | Usar servicio existente |
| Manejar errores AI | `error-use`             |
| Validar inputs     | `error-use` (Zod)       |

## Referencias

- `core/aiFactory.ts` - Factory pattern
- `analyzers/` - Análisis específicos
- `errors/custom.ts` - Errores de AI
- `providers/gemini/` - Implementación Gemini
- [Gemini Docs](https://ai.google.dev/)
