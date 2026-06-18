'use client';
import { useRef, useEffect } from 'react';
import { scroll, animate, DOMKeyframesDefinition } from 'motion';
import CardCommunity from '@/comunidad/components/CardCommunity';
import { useCommunitiesProfileStore } from '../../perfil/stores/useCommunitiesProfileStore';
import { Community } from '@/comunidad/types';

interface CommunitiesScrollListProps {
  initialItems: Community[];
}

export default function CommunitiesScrollList({
  initialItems,
}: CommunitiesScrollListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const isInitializedRef = useRef(false);
  const scrollAnimationsRef = useRef<(() => void)[]>([]);

  const communities = useCommunitiesProfileStore((state) => state.communities);
  const setCommunities = useCommunitiesProfileStore(
    (state) => state.setCommunities
  );

  // Inicializar el store en el primer render
  useEffect(() => {
    if (!isInitializedRef.current && initialItems.length > 0) {
      setCommunities(initialItems);
      isInitializedRef.current = true;
    }
  }, [initialItems, setCommunities]);

  // Sincronizar solo cuando el servidor envía nuevos initialItems (un nuevo
  // render del Server Component). No se incluye `communities` en las deps a
  // propósito: hacerlo provocaba que una mutación local del store (p. ej.
  // eliminar una comunidad de forma optimista) re-disparara este efecto y
  // restaurara el snapshot stale del servidor, deshaciendo la eliminación.
  // Se lee el estado actual con getState() solo para evitar sets redundantes.
  useEffect(() => {
    if (isInitializedRef.current && initialItems.length > 0) {
      const current = useCommunitiesProfileStore.getState().communities;
      const hasChanged =
        current.length !== initialItems.length ||
        !initialItems.every((item, index) => item.id === current[index]?.id);

      if (hasChanged) {
        setCommunities(initialItems);
      }
    }
  }, [initialItems, setCommunities]);

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, communities.length);
  }, [communities.length]);

  // Animaciones con Motion One
  useEffect(() => {
    if (communities.length === 0 || !containerRef.current) return;

    // Limpiar animaciones previas
    scrollAnimationsRef.current.forEach((cleanup) => cleanup());
    scrollAnimationsRef.current = [];

    const container = containerRef.current;

    cardsRef.current.forEach((card) => {
      if (!card) return;

      // Animar scale y opacity con Motion One
      const scaleCleanup = scroll(
        animate(card, { scale: [0.5, 1, 1, 0.5] } as DOMKeyframesDefinition),
        {
          target: card,
          container: container,
          offset: ['start end', 'start center', 'end center', 'end start'],
        }
      );

      const opacityCleanup = scroll(
        animate(card, { opacity: [0.5, 1, 1, 0.5] } as DOMKeyframesDefinition),
        {
          target: card,
          container: container,
          offset: ['start end', 'start center', 'end center', 'end start'],
        }
      );

      scrollAnimationsRef.current.push(scaleCleanup, opacityCleanup);
    });

    return () => {
      scrollAnimationsRef.current.forEach((cleanup) => cleanup());
      scrollAnimationsRef.current = [];
    };
  }, [communities]);

  return (
    <div
      ref={containerRef}
      className="border-border relative h-full w-full grow overflow-y-auto border-b-2"
    >
      <ul className="flex flex-col items-center gap-12 py-[10vh]">
        {communities.map((community, index) => (
          <li
            key={community.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="flex w-full max-w-7xl origin-center justify-center will-change-transform"
          >
            <div className="w-full">
              <CardCommunity data={community} isPopup={false} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
