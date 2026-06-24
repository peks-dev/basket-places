'use client';

import Image from 'next/image';
import { useEffect, useMemo } from 'react';

import { CloseIcon } from '@/app/components/ui/svgs/';
import Button from '@/app/components/ui/Button';

interface ImagePreviewProps {
  file: File | string;
  index: number;
  deleteImgFn: () => void;
}

const ImagePreview = ({ file, index, deleteImgFn }: ImagePreviewProps) => {
  const imgName = file instanceof File ? file.name : `Imagen ${index + 1}`;

  // Si es un File creamos la URL de objeto (blob) una sola vez por archivo;
  // si es un string (URL de Supabase) lo usamos directamente.
  const imgSrc = useMemo(
    () => (file instanceof File ? URL.createObjectURL(file) : file),
    [file]
  );

  // Limpieza: revocar el blob al desmontar o al cambiar de archivo
  // para evitar memory leaks. No usa estado, solo cleanup.
  useEffect(() => {
    if (file instanceof File) {
      return () => URL.revokeObjectURL(imgSrc);
    }
  }, [file, imgSrc]);

  return (
    <li className="border-border relative border-2 p-2.5">
      <div className="flex items-stretch gap-2">
        <div className="bg-light-tertiary flex grow items-center">
          <figure className="border-light-tertiary relative h-24 w-24 overflow-hidden border">
            <Image
              src={imgSrc}
              alt={imgName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </figure>
          <span className="text-dark-primary ml-3 truncate text-sm">
            {imgName}
          </span>
        </div>

        <Button
          variant="delete"
          onClick={deleteImgFn}
          aria-label={`Eliminar ${imgName}`}
        >
          <CloseIcon />
        </Button>
      </div>
    </li>
  );
};

export default ImagePreview;
