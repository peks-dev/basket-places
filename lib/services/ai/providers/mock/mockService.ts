import type { BaseAIService } from '../../core/types';

/**
 * Proveedor de IA simulado para entornos de prueba (Playwright / CI).
 *
 * NO hace llamadas de red. Se activa con `AI_PROVIDER=mock` y produce
 * respuestas deterministas que cumplen el contrato `BaseAIService`: devuelve
 * un string JSON que los analizadores (`analyzeImages` / `analyzeText`) parsean
 * y validan igual que con Gemini real.
 *
 * Por qué existe: el smoke test verifica que la APP reacciona correctamente
 * según el veredicto de la IA (aprueba -> crea el recurso; rechaza -> bloquea
 * y muestra el error), no la inteligencia del modelo. Para probar ambos caminos
 * de forma determinista hay que controlar la respuesta. Validar a Gemini real
 * es un test aparte (manual/nocturno), fuera del alcance de cada PR.
 *
 * Cómo decide la forma de la respuesta: cada prompt contiene los nombres de
 * campo que su parser espera, así que se ramifica por ese marcador. El campo
 * `confidence` usa escalas distintas según el dominio (0-1 en comunidad/cancha/
 * comentario; 0-100 en perfil), por eso no sirve una única respuesta superset.
 *
 * Cómo forzar un rechazo:
 *  - Flujos de texto (descripción de comunidad, comentario de review): incluir
 *    el token `__AI_REJECT__` en el texto del propio test (se inyecta en el
 *    prompt vía placeholders), sin reiniciar el servidor.
 *  - Flujos de imagen (cancha, perfil): arrancar el servidor con
 *    `MOCK_AI_VERDICT=reject`.
 */

export const MOCK_AI_REJECT_TOKEN = '__AI_REJECT__';

export class MockAIService implements BaseAIService {
  public readonly provider = 'mock';

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async generateContent(prompt: string): Promise<string> {
    const reject =
      prompt.includes(MOCK_AI_REJECT_TOKEN) ||
      process.env.MOCK_AI_VERDICT === 'reject';

    return JSON.stringify(this.buildResponse(prompt, reject));
  }

  private buildResponse(prompt: string, reject: boolean): unknown {
    // Análisis de imagen de cancha (CourtImageAnalysisRaw, confidence 0-1)
    if (prompt.includes('isBasketballCourt')) {
      return {
        isBasketballCourt: !reject,
        hasPeoplePlaying: !reject,
        floorType: 'cement',
        isCovered: true,
        confidence: 0.95,
      };
    }

    // Análisis de imagen de perfil (ProfileImageAnalysisRaw, confidence 0-100)
    if (prompt.includes('isAppropriate')) {
      return {
        isAppropriate: !reject,
        confidence: 95,
      };
    }

    // Análisis de texto de comunidad (CommunityTextAnalysisRaw, confidence 0-1)
    if (prompt.includes('spamScore')) {
      return {
        isLegitimate: !reject,
        spamScore: reject ? 0.9 : 0,
        reasons: reject ? ['Rechazado por el mock de IA'] : [],
        confidence: 0.95,
      };
    }

    // Análisis de comentario de review (CommentAnalysisRaw)
    if (prompt.includes('isLegitimate')) {
      return {
        isLegitimate: !reject,
      };
    }

    // Fallback defensivo: si aparece un prompt nuevo sin marcador conocido,
    // devolver un objeto vacío hace que la validación de esquema falle de forma
    // explícita en vez de aprobar algo silenciosamente.
    return {};
  }
}
