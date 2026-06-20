// lib/ai/core/types.ts

/**
 * Contrato que cualquier proveedor de IA debe cumplir
 */
export interface BaseAIService {
  generateContent(prompt: string, images: File[]): Promise<string>;
  isAvailable(): Promise<boolean>;
  readonly provider: string;
}

/**
 * Proveedores soportados
 */
export type AIProvider = 'gemini' | 'ollama' | 'mock';

/**
 * Configuración de proveedores
 */
export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  endpoint?: string;
}

/**
 * Resultado genérico de validación
 */
export type ValidationResult<T> =
  | { success: true; data: T; errors?: never }
  | { success: false; errors: string[]; data?: never };

/**
 * Funciones de parsing y validación genéricas
 */
export type ParseFunction<T> = (rawResponse: string, providerName: string) => T;

export type ValidateFunction<T, R> = (data: T) => ValidationResult<R>;
