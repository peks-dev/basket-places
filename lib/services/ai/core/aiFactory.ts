import type { BaseAIService } from './types';
import { GeminiService } from '../providers/gemini/geminiService';
import { getAIConfig } from '../config/aiConfig';
import { AIUnavailableError } from '../errors/custom';

/**
 * Crea una instancia del servicio de IA según la configuración
 */
function createAIService(): BaseAIService {
  const config = getAIConfig();

  switch (config.provider) {
    case 'gemini':
      if (!config.apiKey) {
        throw new Error('API key requerida para Gemini');
      }
      return new GeminiService(config.apiKey);

    case 'ollama':
      throw new AIUnavailableError(
        'Ollama aún no está implementado. ' + 'Cambia AI_PROVIDER a "gemini"'
      );

    default:
      throw new AIUnavailableError(
        `Proveedor no soportado: ${config.provider}`
      );
  }
}

/**
 * Singleton para reutilizar la misma instancia
 */
let aiServiceInstance: BaseAIService | null = null;

export function getAIService(): BaseAIService {
  if (!aiServiceInstance) {
    aiServiceInstance = createAIService();
  }
  return aiServiceInstance;
}

/**
 * Resetea el singleton (útil para testing)
 * NO usar en producción
 */
export function resetAIService(): void {
  aiServiceInstance = null;
}
