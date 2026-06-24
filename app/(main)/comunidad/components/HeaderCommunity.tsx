import ImageSlider from '@/app/components/ui/Sliders/ImageSlider';
import ShareButton from './ShareButton';
import { ReportCommunityButton } from './ReportCommunityButton';

interface Props {
  id: string;
  name: string;
  images: string[];
  description: string;
  canReport?: boolean;
}

export default function HeaderCommunity(data: Props) {
  return (
    <section className="flex shrink-0 flex-col gap-4 lg:max-w-[700px]">
      <header className="flex justify-between">
        <h2 className="font-heading neon-effect text-lg uppercase">
          {data.name}
        </h2>
      </header>
      <div className="border-foreground neon-effect text-foreground relative border-2 border-solid">
        <div className="absolute top-3 left-3 z-30">
          <ShareButton name={data.name} description={data.description} />
        </div>
        {data.canReport ? (
          <div className="absolute top-3 right-3 z-30">
            <ReportCommunityButton
              communityId={data.id}
              communityName={data.name}
            />
          </div>
        ) : null}
        <ImageSlider images={data.images} enablePagination enableAutoplay />
      </div>
    </section>
  );
}
