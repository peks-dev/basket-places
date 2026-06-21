'use client';
import { useState, useEffect } from 'react';
import { useNavigationStore } from '../stores/useNavigationStore';
import { useContributionStore } from '../stores/useContributionStore';
import { useCommunitiesProfileStore } from '@/app/(main)/perfil/stores/useCommunitiesProfileStore';
import { registerCommunity, updateCommunity } from '../action/index';
import { compressImage } from '@/lib/utils/images/compressImage';
import { showSuccessToast, showErrorToast } from '@/shared/notifications';
import type { CommunityFormData } from '@/comunidad/types';
import { trackAnalyticsEvent } from '@/lib/analytics/umami';

interface UseContributionFormProps {
  initialData?: CommunityFormData;
}

export function useContributionForm({
  initialData,
}: UseContributionFormProps = {}) {
  const { currentStep, nextStep, prevStep, resetToStart } =
    useNavigationStore();
  const { reset, setFormData, getFormData } = useContributionStore();
  const addCommunity = useCommunitiesProfileStore(
    (state) => state.addCommunity
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ============================================
  // INICIALIZACIÓN (si es edición)
  // ============================================
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, setFormData]);

  // ============================================
  // CLEANUP AL DESMONTAR
  // ============================================
  useEffect(() => {
    return () => {
      reset();
      resetToStart();
    };
  }, [reset, resetToStart]);

  // ============================================
  // HANDLER DE SUBMIT
  // ============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Obtener datos del formulario
      const formData = { ...getFormData() };

      // 2. Comprimir imágenes (obligatorio por límite de 2MB de Next.js)
      const fileImages = formData.images.filter(
        (img): img is File => img instanceof File
      );

      if (fileImages.length > 0) {
        const compressedImages = await Promise.all(
          fileImages.map((img) => compressImage(img))
        );

        // Reemplazar Files por comprimidos, mantener strings (URLs)
        const urlImages = formData.images.filter(
          (img): img is string => typeof img === 'string'
        );
        formData.images = [...urlImages, ...compressedImages];
      }

      // 3. Llamar al server action correspondiente
      const result = formData.id
        ? await updateCommunity(formData)
        : await registerCommunity(formData);

      // 4. Manejar resultado
      if (!result.success) {
        // Mostrar error específico
        showErrorToast(result.error.message);
        return;
      }

      // 5. Actualizar store local con la comunidad creada/actualizada
      addCommunity(result.data);

      // 6. Mostrar notificación de éxito
      showSuccessToast(
        `Comunidad ${initialData ? 'actualizada' : 'registrada'} con éxito`,
        `${initialData ? 'actualización' : 'registro'} de ${result.data.name} guardado correctamente`
      );
      setIsSuccess(true);
      trackAnalyticsEvent('contribution_submitted', {
        mode: initialData ? 'edit' : 'create',
        community_id: result.data.id,
        community_type: result.data.type,
      });

      // 7. Navegar a la página de detalles de la comunidad.
      // Se usa navegación dura (full load) a propósito: una navegación soft
      // (router.push) sería capturada por la ruta interceptora
      // `@panel/(.)comunidad/ver/[id]`, mostrando la comunidad como panel
      // overlay con el formulario detrás en lugar de la página completa.
      window.location.assign(`/comunidad/ver/${result.data.id}`);
    } catch {
      // Errores inesperados (no deberían llegar aquí si Actions manejan todo)
      showErrorToast('algo inesperado sucedio');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Estado
    isLoading,
    isSuccess,
    currentStep,

    // Handlers
    handleSubmit,
    nextStep,
    prevStep,
  };
}
