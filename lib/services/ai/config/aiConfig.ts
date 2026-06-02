import type { AIProvider, AIConfig } from '../core/types';

/**
 * Configuración del proveedor de IA desde variables de entorno
 */
export function getAIConfig(): AIConfig {
  const provider = (process.env.AI_PROVIDER || 'gemini') as AIProvider;

  switch (provider) {
    case 'gemini': {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          'GEMINI_API_KEY no está configurada. ' +
            'Agrégala a tu archivo .env.local'
        );
      }
      return { provider, apiKey };
    }

    case 'ollama': {
      const endpoint = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434';
      return { provider, endpoint };
    }

    default:
      throw new Error(
        `Proveedor de IA desconocido: ${provider}. ` +
          'Opciones válidas: "gemini", "ollama"'
      );
  }
}
