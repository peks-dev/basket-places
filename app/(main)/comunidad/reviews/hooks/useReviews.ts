'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ReviewDatabase, ReviewFormState } from '../types';
import type { User } from '@supabase/supabase-js';
import ReviewForm from '../components/ReviewForm';
import { useModalStore } from '@/app/components/ui/Modal';
import { useReviewFormStore } from '../stores/useReviewStore';
import {
  createCommunityReview,
  removeCommunityReview,
  getCommunityReviews,
} from '../actions/';
import { useAuth } from '@/app/(auth)/hooks/useAuth';
import { showErrorToast, showSuccessToast } from '@/shared/notifications';
import { usePathname } from 'next/navigation';
import { useCustomNavigation } from '@/lib/hooks/useNavigation';
import { handleServiceError } from '@/lib/errors/handler';
import { trackAnalyticsEvent } from '@/lib/analytics/umami';

interface UseReviewsProps {
  communityId: string;
  initialAverageRating: number;
  initialTotalReviews: number;
}

interface UseReviewsReturn {
  // Estados
  reviews: ReviewDatabase[];
  isLoading: boolean;
  error: string | null;
  totalReviews: number;
  averageRating: number;
  userLogged: User | null;

  // Handlers
  handleCommunityRating: () => void;
  handleDeleteReview: (reviewId: string) => void;
  fetchReviews: () => Promise<void>;
}

export function useReviews({
  communityId,
  initialAverageRating,
  initialTotalReviews,
}: UseReviewsProps): UseReviewsReturn {
  const { openModal } = useModalStore();
  const { user: userLogged } = useAuth();
  const [reviews, setReviews] = useState<ReviewDatabase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const { navigate } = useCustomNavigation();

  // Estados locales para el conteo y promedio de valoraciones
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews);
  const [averageRating, setAverageRating] = useState(initialAverageRating);

  // Obtener valoraciones
  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getCommunityReviews(communityId);
      if (result.success) {
        setReviews(result.data);
      }
    } catch (error) {
      const proccedError = handleServiceError(error);
      setError(proccedError.error.message);
      showErrorToast(proccedError.error.message);
    } finally {
      setIsLoading(false);
    }
  }, [communityId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Modal de confirmación para eliminar valoración
  const handleDeleteReview = (reviewId: string) => {
    const reviewToDelete = reviews.find((review) => review.id === reviewId);
    if (!reviewToDelete) {
      showErrorToast('Error', 'No existe este comentario.');
      return;
    }

    openModal({
      title: 'eliminar comentario',
      content: '¿quieres eliminar tu comentario? esto no es revertible',
      confirmButton: {
        text: 'sí, eliminar',
        variant: 'primary',
        onClick: async () => {
          const result = await removeCommunityReview(reviewId);

          // Comprobar error
          if (!result.success) {
            showErrorToast(
              'No se pudo eliminar el comentario',
              result.error.message
            );
            return;
          }

          // Actualiza la UI eliminando la review del estado local
          setReviews((currentReviews) =>
            currentReviews.filter((review) => review.id !== reviewId)
          );

          // Actualiza el estado local de total y promedio
          const newTotal = totalReviews - 1;
          const newAverage =
            newTotal > 0
              ? (averageRating * totalReviews - reviewToDelete.rating) /
                newTotal
              : 0;

          setTotalReviews(newTotal);
          setAverageRating(parseFloat(newAverage.toFixed(2)));

          // Darle Feedback al usuario
          showSuccessToast(
            'Comentario eliminado',
            'Tu comentario ha sido eliminado.'
          );
        },
      },
    });
  };

  // Modal de confirmación para crear valoración
  const handleCommunityRating = () => {
    if (!userLogged) {
      showErrorToast(
        'Acción requerida',
        'Debes iniciar sesión para poder valorar la comunidad.'
      );
      // Redirige a sign-in con la URL actual como returnUrl
      const returnUrl = encodeURIComponent(pathname);
      navigate(`/sign-in?returnUrl=${returnUrl}`);
      return;
    }

    openModal({
      title: 'valorar la comunidad',
      confirmButton: {
        text: 'enviar valoración',
        variant: 'primary',
        onClick: async () => {
          const { comment, rating }: ReviewFormState =
            useReviewFormStore.getState();

          const result = await createCommunityReview({
            comment,
            rating,
            community_id: communityId,
          });

          if (!result.success) {
            showErrorToast('No se pudo enviar tu reseña', result.error.message);
            return;
          }

          trackAnalyticsEvent('review_submitted', {
            community_id: communityId,
            rating,
          });

          // Actualizamos el total y promedio localmente para una UX instantánea
          const newTotal = totalReviews + 1;
          const newAverage = (averageRating * totalReviews + rating) / newTotal;

          setTotalReviews(newTotal);
          setAverageRating(parseFloat(newAverage.toFixed(2)));

          // Recargamos las reseñas desde el backend para mostrar la nueva
          await fetchReviews();

          // Notificar al usuario
          showSuccessToast('Valoración enviada', '¡Gracias por tu aportación!');
        },
      },
      ContentComponent: ReviewForm,
    });
  };

  return {
    // Estados
    reviews,
    isLoading,
    error,
    totalReviews,
    averageRating,
    userLogged,

    // Handlers
    handleCommunityRating,
    handleDeleteReview,
    fetchReviews,
  };
}
