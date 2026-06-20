/**
 * Imágenes de prueba en memoria para los tests de subida.
 * Se pasan a `setInputFiles` como buffer, sin tocar el disco.
 */
export interface TestImage {
  name: string;
  mimeType: string;
  buffer: Buffer;
}

// PNG válido de 1x1 px (rojo). Suficiente para ejercitar subida + análisis (mock).
const TINY_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export function smallPng(name = 'test-image.png'): TestImage {
  return {
    name,
    mimeType: 'image/png',
    buffer: Buffer.from(TINY_PNG_BASE64, 'base64'),
  };
}
