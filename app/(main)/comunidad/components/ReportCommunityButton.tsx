'use client';

import { useState, useTransition } from 'react';
import Button from '@/app/components/ui/Button';
import { useModalStore } from '@/app/components/ui/Modal';
import Textarea from '@/app/components/ui/inputs/Textarea';
import { InputSelector } from '@/app/components/ui/inputs/Selector';
import { WarningIcon } from '@/app/components/ui/svgs';
import { trackAnalyticsEvent } from '@/lib/analytics/umami';
import { showErrorToast, showSuccessToast } from '@/shared/notifications';
import { reportCommunity } from '../action/report-community';
import type { CommunityReportData, CommunityReportReason } from '../types';

interface Props {
  communityId: string;
  communityName: string;
}

const reportReasonOptions: Array<{
  value: CommunityReportReason;
  label: string;
  description: string;
}> = [
  {
    value: 'incorrect_data',
    label: 'Información incorrecta',
    description:
      'La ubicación, horarios, servicios o descripción no coinciden.',
  },
  {
    value: 'does_not_exist',
    label: 'No existe',
    description:
      'La comunidad o cancha no existe, cerró o no se puede encontrar.',
  },
  {
    value: 'duplicate',
    label: 'Duplicado',
    description: 'Esta comunidad ya aparece en otra ficha del mapa.',
  },
  {
    value: 'spam',
    label: 'Spam o basura',
    description: 'La ficha parece falsa, promocional o sin valor para el mapa.',
  },
  {
    value: 'other',
    label: 'Otro problema',
    description: 'Hay otro problema que requiere revisión manual.',
  },
];

const initialReason: CommunityReportReason = 'incorrect_data';

function CommunityReportForm({ communityId, communityName }: Props) {
  const [reason, setReason] = useState<CommunityReportReason>(initialReason);
  const [description, setDescription] = useState('');
  const [isPending, startTransition] = useTransition();
  const { closeModal } = useModalStore();

  const selectedReason = reportReasonOptions.find(
    (option) => option.value === reason
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CommunityReportData = {
      community_id: communityId,
      community_name: communityName,
      reason,
      description,
    };

    startTransition(async () => {
      const result = await reportCommunity(payload);

      if (!result.success) {
        showErrorToast('No se pudo enviar el reporte', result.error.message);
        return;
      }

      trackAnalyticsEvent('feedback_submitted', {
        feedback_id: result.data.id,
        feedback_type: 'report',
        source: 'community_page',
      });

      showSuccessToast(
        'Reporte enviado',
        'Gracias por ayudarnos a mantener limpio el mapa.'
      );
      closeModal();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <p className="text-foreground-secondary text-center text-xs leading-relaxed">
        Ayúdanos a recortar datos basura o corregir información de esta
        comunidad. Revisaremos el reporte manualmente.
      </p>

      <label className="flex flex-col gap-3">
        <span className="text-foreground-accent text-sm font-bold uppercase">
          Motivo
        </span>
        <InputSelector
          options={reportReasonOptions.map(({ value, label }) => ({
            value,
            label,
          }))}
          value={reason}
          onChange={(value) => setReason(value as CommunityReportReason)}
          disabled={isPending}
        />
        {selectedReason ? (
          <span className="text-foreground-secondary px-1 text-xs leading-relaxed">
            {selectedReason.description}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-3">
        <span className="text-foreground-accent text-sm font-bold uppercase">
          Detalles
        </span>
        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={isPending}
          minLength={20}
          maxLength={2000}
          placeholder="Cuéntanos qué está mal o qué deberíamos revisar."
          required
        />
      </label>

      <Button type="submit" loading={isPending} disabled={isPending}>
        Enviar reporte
      </Button>
    </form>
  );
}

export function ReportCommunityButton({ communityId, communityName }: Props) {
  const { openModal } = useModalStore();

  const handleOpenReportModal = () => {
    openModal({
      title: 'Reportar problema',
      content: (
        <CommunityReportForm
          communityId={communityId}
          communityName={communityName}
        />
      ),
      size: 'lg',
    });
  };

  return (
    <Button
      variant="icon"
      size="md"
      onClick={handleOpenReportModal}
      aria-label={`Reportar problema en ${communityName}`}
      title="Reportar problema"
      className="bg-dark-primary/80 p-2"
    >
      <WarningIcon />
    </Button>
  );
}
