import * as z from 'zod';

export const communityReportReasons = [
  'incorrect_data',
  'does_not_exist',
  'duplicate',
  'spam',
  'other',
] as const;

export const communityReportSchema = z.object({
  community_id: z.string().uuid('La comunidad reportada no es válida.'),
  community_name: z
    .string()
    .trim()
    .min(1, 'La comunidad reportada no es válida.')
    .max(160, 'El nombre de la comunidad es demasiado largo.'),
  reason: z.enum(communityReportReasons, {
    message: 'Selecciona un motivo válido para el reporte.',
  }),
  description: z
    .string()
    .trim()
    .min(20, 'La descripción debe tener al menos 20 caracteres.')
    .max(2000, 'La descripción no puede superar 2000 caracteres.'),
});
