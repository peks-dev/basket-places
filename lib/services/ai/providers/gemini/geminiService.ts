import type { GeminiRequest, GeminiResponse, GeminiPart } from './types.ts';
import type { BaseAIService } from '../../core/types';
import { AIServiceError } from '../../errors/custom';
import { fileToBase64 } from '@/lib/utils/images/imagesTransform';

// Configurar y ejecutar llamadas a la REST API de Gemini
export class GeminiService implements BaseAIService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  private model = 'gemini-3-flash-preview'; // Puedes cambiar a gemini-2.0-flash-exp
  public readonly provider = 'gemini';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Gemini API key es requerida');
    }
    this.apiKey = apiKey;
  }

  /**
   * Verifica si el servicio está disponible haciendo una petición simple
   */
  /**
   * Verifica si el servicio está disponible haciendo una petición simple
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: 'Hello' }],
              },
            ],
          }),
        }
      );

      // Si la respuesta es exitosa (200-299), el servicio está disponible
      if (response.ok) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  // main function
  async generateContent(prompt: string, images: File[]): Promise<string> {
    try {
      // Construir el body de la petición
      const requestBody = await this.buildRequestBody(prompt, images);

      // Hacer la petición a Gemini
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(requestBody),
        }
      );

      // Verificar errores HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new AIServiceError(
          `Error de Gemini API: ${response.status} - ${
            errorData?.error?.message || response.statusText
          }`,
          this.provider
        );
      }

      // Parsear respuesta
      const data: GeminiResponse = await response.json();

      // Extraer el texto de la respuesta
      return this.extractTextFromResponse(data);
    } catch (error) {
      if (error instanceof AIServiceError) {
        throw error;
      }

      throw new AIServiceError(
        `Error al comunicarse con Gemini: ${
          error instanceof Error ? error.message : 'Error desconocido'
        }`,
        this.provider
      );
    }
  }

  private async buildRequestBody(
    prompt: string,
    images: File[]
  ): Promise<GeminiRequest> {
    const parts: GeminiPart[] = [];

    // Agregar imágenes primero (como en el ejemplo de la docs)
    for (const image of images) {
      const base64Data = await fileToBase64(image);

      // Remover el prefijo data URL si existe (para Gemini)
      const base64Pure = base64Data.includes(',')
        ? base64Data.split(',')[1]
        : base64Data;

      parts.push({
        inline_data: {
          mime_type: image.type,
          data: base64Pure,
        },
      });
    }

    // Agregar el prompt al final
    parts.push({
      text: prompt,
    });

    return {
      contents: [
        {
          parts,
        },
      ],
    };
  }

  private extractTextFromResponse(response: GeminiResponse): string {
    // Verificar si hay bloqueo por filtros de seguridad
    if (response.promptFeedback?.blockReason) {
      throw new AIServiceError(
        `Contenido bloqueado por Gemini: ${response.promptFeedback.blockReason}`,
        this.provider
      );
    }

    // Verificar que haya candidatos
    if (!response.candidates || response.candidates.length === 0) {
      throw new AIServiceError(
        'Gemini no generó ninguna respuesta',
        this.provider
      );
    }

    const firstCandidate = response.candidates[0];

    // Verificar razón de finalización
    if (
      firstCandidate.finishReason &&
      firstCandidate.finishReason !== 'STOP' &&
      firstCandidate.finishReason !== 'MAX_TOKENS'
    ) {
      throw new AIServiceError(
        `Gemini finalizó inesperadamente: ${firstCandidate.finishReason}`,
        this.provider
      );
    }

    // Extraer el texto de las partes
    const textParts = firstCandidate.content.parts
      .map((part) => part.text)
      .filter(Boolean);

    if (textParts.length === 0) {
      throw new AIServiceError(
        'La respuesta de Gemini no contiene texto',
        this.provider
      );
    }

    return textParts.join('\n');
  }

  // Genera los headers necesarios para las peticiones
  private getHeaders(): Record<string, string> {
    return {
      'x-goog-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };
  }
}
