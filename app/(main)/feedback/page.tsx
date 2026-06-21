import { ProtectedWrapper } from '@/app/(auth)/components/ProtectedWrapper';
import { FeedbackForm } from './components/FeedbackForm';

export const dynamic = 'force-dynamic';

export default async function FeedbackPage() {
  return (
    <ProtectedWrapper>
      <section className="grid min-h-dvh place-content-center overflow-y-auto px-4 py-6 sm:py-8">
        <FeedbackForm />
      </section>
    </ProtectedWrapper>
  );
}
