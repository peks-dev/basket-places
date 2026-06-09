import { useRef } from 'react';
import { showErrorToast } from '@/shared/notifications';
import { useContributionStore } from '@/contribuir/stores/useContributionStore';
import ImagePreview from './components/ImagePreview';

import Button from '@/app/components/ui/Button';
import { StepHelp } from '../../StepHelp';
import { STEP_HELP } from '../../stepHelpContent';

const MAX_IMAGES = 4;

export default function ImagesStep() {
  const { images, addImages, removeImage } = useContributionStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkImageOrientation = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width > img.height);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];

    for (const file of files) {
      const isHorizontal = await checkImageOrientation(file);
      if (isHorizontal) {
        validFiles.push(file);
      } else {
        showErrorToast('Error de validación', 'La imagen debe ser horizontal.');
      }
    }

    if (validFiles.length > 0) {
      addImages(validFiles);
    }

    // Limpiar el input para permitir re-seleccionar los mismos archivos si es necesario
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    removeImage(index);
  };

  const canAddMore = images.length < MAX_IMAGES;

  return (
    <div className="flex h-full flex-col">
      <StepHelp {...STEP_HELP.images} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <ul className="mt-15 grow">
        {images.length > 0 && (
          <div className="gap-md flex flex-col items-stretch">
            {images.map((img, index) => (
              <ImagePreview
                key={`${img instanceof File ? img.name : img}-${index}`}
                file={img}
                index={index}
                deleteImgFn={() => handleRemove(index)}
              />
            ))}
          </div>
        )}
      </ul>

      {canAddMore && (
        <Button onClick={handleButtonClick}>Elegir imágenes</Button>
      )}
    </div>
  );
}
