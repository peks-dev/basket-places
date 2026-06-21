import { getCommunityById } from '@/app/(main)/comunidad/dbQueries';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { CommunityFullResponse } from '@/comunidad/types';
import { generateCommunityMetadata } from '@/comunidad/utils/generateCommunityMetadata';
import HeaderCommunity from '@/comunidad/components/HeaderCommunity';
import ContentCommunity from '@/comunidad/components/ContentCommunity';
import { UmamiEventTracker } from '@/app/components/analytics/UmamiEventTracker';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const community: CommunityFullResponse | null = await getCommunityById(id);
  return generateCommunityMetadata(community);
}

export default async function CommunityPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch de la comunidad por ID
  const community: CommunityFullResponse | null = await getCommunityById(id);

  // Si no existe, mostrar página 404
  if (!community) {
    notFound();
  }

  return (
    <>
      <UmamiEventTracker
        eventName="community_viewed"
        data={{
          community_id: community.id,
          community_type: community.type,
          city: community.city,
          surface: 'page',
        }}
      />
      {/* Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsActivityLocation',
            name: community.name,
            description: community.description,
            url: `https://www.basket-places.website/comunidad/${community.id}`,
            image: community.images,
            address: {
              '@type': 'PostalAddress',
              addressLocality: community.city,
              addressRegion: community.state,
              addressCountry: community.country,
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: community.lat,
              longitude: community.lng,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: community.average_rating,
              reviewCount: community.total_reviews,
            },
            sport: 'Basketball',
            amenityFeature: [
              community.services.transport && {
                '@type': 'LocationFeatureSpecification',
                name: 'Transporte',
              },
              community.services.store && {
                '@type': 'LocationFeatureSpecification',
                name: 'Tienda',
              },
              community.services.wifi && {
                '@type': 'LocationFeatureSpecification',
                name: 'WiFi',
              },
              community.services.bathroom && {
                '@type': 'LocationFeatureSpecification',
                name: 'Baños',
              },
            ].filter(Boolean),
          }).replace(/</g, '\\u003c'),
        }}
      />
      <div className="gap-lg flex h-full w-full flex-col p-4 pb-10 lg:flex-row">
        <HeaderCommunity
          name={community.name}
          images={community.images}
          description={community.description}
        />
        <ContentCommunity community={community} />
      </div>
    </>
  );
}
