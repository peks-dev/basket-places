'use client';

import { useState, useTransition } from 'react';
import Button from '@/app/components/ui/Button';
import Textarea from '@/app/components/ui/inputs/Textarea';
import { InputSelector } from '@/app/components/ui/inputs/Selector';
import { showErrorToast, showSuccessToast } from '@/shared/notifications';
import { trackAnalyticsEvent } from '@/lib/analytics/umami';
import { useCustomNavigation } from '@/lib/hooks/useNavigation';
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
  description: '',
};

export function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [isPending, startTransition] = useTransition();
  const { navigate } = useCustomNavigation();

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
      navigate('/');
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="transparent-container relative flex h-min w-full max-w-200 flex-col gap-8 p-5"
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-foreground-accent heading text-lg">
          Enviar feedback
        </h1>
        <p className="text-foreground-secondary mx-auto text-xs leading-relaxed">
          Reporta bugs, solicita features o sugiere mejoras.
        </p>
      </div>

      <label className="flex flex-col gap-3">
        <span className="text-foreground-accent text-sm font-bold uppercase">
          Tipo
        </span>
        <InputSelector
          options={feedbackTypeOptions.map(({ value, label }) => ({
            value,
            label,
          }))}
          value={formData.type}
          onChange={(value) => updateField('type', value as FeedbackReportType)}
          disabled={isPending}
        />
        {selectedType ? (
          <span className="text-foreground-secondary px-1 text-xs leading-relaxed">
            {selectedType.description}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-3">
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

      <Button
        type="submit"
        loading={isPending}
        disabled={isPending}
        className="mt-1"
      >
        Enviar feedback
      </Button>
    </form>
  );
}
