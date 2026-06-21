import * as z from 'zod';

export const feedbackFormSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement'], {
    message: 'Selecciona un tipo de feedback válido.',
  }),
  title: z
    .string()
    .trim()
    .min(5, 'El título debe tener al menos 5 caracteres.')
    .max(120, 'El título no puede superar 120 caracteres.'),
  description: z
    .string()
    .trim()
    .min(20, 'La descripción debe tener al menos 20 caracteres.')
    .max(2000, 'La descripción no puede superar 2000 caracteres.'),
});

export type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>;
