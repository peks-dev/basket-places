'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { usePanelLoaderStore } from '@/app/(main)/map/stores/usePanelStore';
import { useUIStateStore } from '@/lib/stores/useUIStateStore';
import { usePanelUniversalGesture } from '@/app/(main)/map/components/hooks/usePanelUniversalGesture';
import type { CommunityFullResponse } from '@/comunidad/types';
import HeaderCommunity from '@/comunidad/components/HeaderCommunity';
import ContentCommunity from '@/comunidad/components/ContentCommunity';

interface PanelContentProps {
  community: CommunityFullResponse;
  canReportCommunity: boolean;
}

export default function PanelContent({
  community,
  canReportCommunity,
}: PanelContentProps) {
  const router = useRouter();
  const { setLoading } = usePanelLoaderStore();
  const { openCommunityPanel, closeCommunityPanel } = useUIStateStore();

  // Ocultar loading cuando el modal se monta
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  // Registrar que el panel de comunidad está abierto
  useEffect(() => {
    openCommunityPanel();

    // Cleanup: cerrar el panel cuando el componente se desmonte
    return () => {
      closeCommunityPanel();
    };
  }, [openCommunityPanel, closeCommunityPanel]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  const { panelRef } = usePanelUniversalGesture({
    onClose: handleClose,
    dragThreshold: 150,
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="grow" onClick={handleClose}></div>

      <div
        ref={panelRef}
        className="transparent-container shadow-2-xl relative mt-auto h-[94dvh] w-screen grow-0 cursor-grab py-2"
      >
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            aria-label="Cerrar"
            className="cursor-grab"
          >
            <div className="bg-accent-primary h-2 w-40 rounded-full"></div>
          </button>
        </div>

        <div className="h-full overflow-y-auto">
          <div className="gap-lg flex h-full w-full flex-col px-4 pt-4 pb-10 lg:flex-row">
            <HeaderCommunity
              id={community.id}
              name={community.name}
              images={community.images}
              description={community.description}
              canReport={canReportCommunity}
            />
            <ContentCommunity community={community} />
          </div>
        </div>
      </div>
    </div>
  );
}
