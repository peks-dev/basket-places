import ContributionForm from '@/contribuir/components/ContributionForm';
import { ProtectedWrapper } from '@/app/(auth)/components/ProtectedWrapper';
import { getCommunityById } from '@/app/(main)/comunidad/dbQueries';
import { transformResponseToFormData } from '@/app/(main)/comunidad/transformers';
import { UmamiEventTracker } from '@/app/components/analytics/UmamiEventTracker';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Esta es una página de servidor (Server Component) para buscar los datos
export default async function EditContributionPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Obtener datos raw desde Supabase
  const communityResponse = await getCommunityById(id);

  // 2. Si no se encuentran datos, mostrar 404
  if (!communityResponse) {
    notFound();
  }

  // 3. Transformar a formato de formulario
  const formData = transformResponseToFormData(communityResponse);

  // 4. Renderizamos el mismo componente de formulario, pasándole los datos iniciales
  return (
    <ProtectedWrapper>
      <UmamiEventTracker
        eventName="contribution_started"
        data={{ mode: 'edit', community_id: id }}
      />
      <section className="mx-auto h-full p-4">
        <ContributionForm initialData={formData} />;
      </section>
    </ProtectedWrapper>
  );
}
