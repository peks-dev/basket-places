import * as z from 'zod';

export const feedbackFormSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement'], {
    message: 'Selecciona un tipo de feedback válido.',
  }),
  description: z
    .string()
    .trim()
    .min(20, 'La descripción debe tener al menos 20 caracteres.')
    .max(2000, 'La descripción no puede superar 2000 caracteres.'),
});

export type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>;
