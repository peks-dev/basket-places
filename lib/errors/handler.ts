// lib/errors/handler.ts
import { fail, type Failure } from '@/lib/types/result';
import { ErrorCodes } from './codes';
import { DatabaseError } from './database';
import { ValidationError } from './zodHandler';
import { StorageError } from './storage';
import { AIError, ImageValidationError } from '../services/ai/errors/index';

/**
 * Convierte errores conocidos del sistema a un formato Result<T>
 * Usa esto en el catch de todos tus Server Actions
 *
 * @example
 * try {
 *   const community = await communityService.create(data);
 *   return ok(community);
 * } catch (error) {
 *   return handleServiceError(error);
 * }
 */
export function handleServiceError(error: unknown): Failure {
  // Errores de base de datos
  if (error instanceof DatabaseError) {
    return fail(error.code, error.message, error.details, error.field);
  }

  // Errores de validación
  if (error instanceof ValidationError) {
    return fail(error.code, error.message, error.details, error.field);
  }

  // Errores de storage (imágenes)
  if (error instanceof StorageError) {
    return fail(error.code, error.message, error.details);
  }

  // Errores de IA - ImageValidationError primero (más específico)
  if (error instanceof ImageValidationError) {
    return fail(error.code, error.message, {
      provider: error.provider,
      validationType: error.validationType,
      ...(error.details && typeof error.details === 'object'
        ? error.details
        : { details: error.details }),
    });
  }

  // Errores de IA - AIError genérico
  if (error instanceof AIError) {
    return fail(error.code, error.message, {
      provider: error.provider,
      ...(error.details && typeof error.details === 'object'
        ? error.details
        : { details: error.details }),
    });
  }

  // Error genérico de JavaScript
  if (error instanceof Error) {
    // Log interno para debugging, no exponer al cliente
    console.error('[handleServiceError]', error.message, error.stack);
    return fail(
      ErrorCodes.INTERNAL_ERROR,
      'Ocurrió un error inesperado. Intenta de nuevo.'
    );
  }

  // Error completamente desconocido
  console.error('[handleServiceError] Unknown error:', error);
  return fail(ErrorCodes.UNKNOWN_ERROR, 'Ocurrió un error desconocido');
}
