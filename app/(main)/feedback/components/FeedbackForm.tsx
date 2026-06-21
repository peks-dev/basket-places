'use client';

import { useState, useTransition } from 'react';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/inputs/Text';
import Textarea from '@/app/components/ui/inputs/Textarea';
import { showErrorToast, showSuccessToast } from '@/shared/notifications';
import { trackAnalyticsEvent } from '@/lib/analytics/umami';
import { createFeedbackReport } from '../actions';
import type { FeedbackFormData, FeedbackReportType } from '../types';

const feedbackTypeOptions: Array<{
  value: FeedbackReportType;
  label: string;
  description: string;
}> = [
  {
    value: 'bug',
    label: 'Reportar bug',
    description: 'Algo no funciona como esperabas.',
  },
  {
    value: 'feature',
    label: 'Solicitar feature',
    description: 'Una nueva capacidad que te gustaría ver.',
  },
  {
    value: 'improvement',
    label: 'Sugerir mejora',
    description: 'Una mejora sobre algo que ya existe.',
  },
];

const initialFormData: FeedbackFormData = {
  type: 'bug',
  title: '',
  description: '',
};

export function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [isPending, startTransition] = useTransition();

  const selectedType = feedbackTypeOptions.find(
    (option) => option.value === formData.type
  );

  const updateField = <Field extends keyof FeedbackFormData>(
    field: Field,
    value: FeedbackFormData[Field]
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await createFeedbackReport(formData);

      if (!result.success) {
        showErrorToast('No se pudo enviar feedback', result.error.message);
        return;
      }

      trackAnalyticsEvent('feedback_submitted', {
        feedback_id: result.data.id,
        feedback_type: formData.type,
      });

      showSuccessToast(
        'Feedback enviado',
        'Gracias por ayudarnos a mejorar Basket Places.'
      );
      setFormData(initialFormData);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-6"
    >
      <div className="flex flex-col gap-2 text-center">
        <p className="font-heading text-foreground-accent text-3xl uppercase">
          Enviar feedback
        </p>
        <p className="text-foreground-secondary text-sm leading-relaxed">
          Reporta bugs, solicita features o sugiere mejoras. Tu feedback queda
          asociado a tu cuenta para que podamos darle seguimiento.
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-foreground-accent text-sm font-bold uppercase">
          Tipo
        </span>
        <select
          value={formData.type}
          onChange={(event) =>
            updateField('type', event.target.value as FeedbackReportType)
          }
          disabled={isPending}
          className="border-border text-foreground bg-background-primary focus:border-foreground h-14 w-full border-2 border-dashed px-4 text-sm transition-colors outline-none disabled:opacity-50"
        >
          {feedbackTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedType ? (
          <span className="text-foreground-secondary text-xs">
            {selectedType.description}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-foreground-accent text-sm font-bold uppercase">
          Título
        </span>
        <Input
          value={formData.title}
          onChange={(event) => updateField('title', event.target.value)}
          disabled={isPending}
          minLength={5}
          maxLength={120}
          placeholder="Ej: No puedo subir imágenes"
          required
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-foreground-accent text-sm font-bold uppercase">
          Descripción
        </span>
        <Textarea
          value={formData.description}
          onChange={(event) => updateField('description', event.target.value)}
          disabled={isPending}
          minLength={20}
          maxLength={2000}
          placeholder="Cuéntanos qué pasó, qué esperabas o cómo mejorarías esta experiencia."
          required
        />
      </label>

      <Button type="submit" loading={isPending} disabled={isPending}>
        Enviar feedback
      </Button>
    </form>
  );
}
