import { ProtectedWrapper } from '@/app/(auth)/components/ProtectedWrapper';
import { FeedbackForm } from './components/FeedbackForm';

export const dynamic = 'force-dynamic';

export default async function FeedbackPage() {
  return (
    <ProtectedWrapper>
      <section className="h-full overflow-y-auto px-4 py-8">
        <FeedbackForm />
      </section>
    </ProtectedWrapper>
  );
}
