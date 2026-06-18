import Textarea from '@/app/components/ui/inputs/Textarea';
import { InputSelector } from '@/app/components/ui/inputs/Selector';
import { useReviewFormStore } from '../stores/useReviewStore';
import { useEffect } from 'react';

export default function ReviewForm() {
  const { comment, setComment, rating, setRating, reset } =
    useReviewFormStore();
  const ratingOptions = [
    { value: 1, label: '1 estrella' },
    { value: 2, label: '2 estrellas' },
    { value: 3, label: '3 estrellas' },
    { value: 4, label: '4 estrellas' },
    { value: 5, label: '5 estrellas' },
  ];

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <form className="form-container flex h-full w-full flex-col gap-8">
      <InputSelector
        options={ratingOptions}
        value={rating ? String(rating) : undefined}
        onChange={(value) => setRating(Number(value))}
      />
      <Textarea
        placeholder="Comparte anécdotas, estadísticas o cualquier detalle que haga única tu historia."
        maxLength={250}
        required
        className="grow"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </form>
  );
}
