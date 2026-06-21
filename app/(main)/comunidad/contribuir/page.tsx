// Pagina para registrar comunidades de basketball

import { ProtectedWrapper } from '@/app/(auth)/components/ProtectedWrapper';
import { UmamiEventTracker } from '@/app/components/analytics/UmamiEventTracker';
import ContributionForm from './components/ContributionForm';

export const dynamic = 'force-dynamic';

export default async function ContributionPage() {
  return (
    <ProtectedWrapper>
      <UmamiEventTracker
        eventName="contribution_started"
        data={{ mode: 'create' }}
      />
      <section className="mx-auto h-full p-4">
        <ContributionForm />
      </section>
    </ProtectedWrapper>
  );
}
