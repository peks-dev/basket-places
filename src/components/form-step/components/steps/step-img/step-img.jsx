import React, { useRef } from "react";
import "./step-img.css";
// utilities
import { isImageHorizontal } from "./utilities/horizontal-check.utilitie";

import Button from "@/components/button/button";
import CloseIcon from "@/components/icons/close-icon";

// Context
import { useStepFormStore } from "@/context/stepFormStore";

const StepImgs = () => {
  const fileInputRef = useRef(null);
  const { formData, updateImagesZ } = useStepFormStore();

  console.log(formData);

  const handleImgsOnChange = async (event) => {
    const files = event.target.files;
    const selected = Array.from(files).slice(0, 4); // Limitar a 4 imágenes

    const horizontalImagesConfirmed = await Promise.all(
      selected.map(async (file) => {
        const isHorizontal = await isImageHorizontal(file);
        return isHorizontal ? file : null;
      })
    );

    const existingImages = formData.images || []; // Guardar las anteriores
    const newImages = horizontalImagesConfirmed.filter((file) => file !== null);
    const updatedImages = [...existingImages, ...newImages].slice(0, 4);

    updateImagesZ(updatedImages);
  };
  const handleInput = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    updateImagesZ(updatedImages);
  };

  return (
    <div className="step-imgs">
      <p>
        Selecciona o toma 4 fotos como máximo
        <br />
        <span className="yellow">todas deben ser horizontales</span>
      </p>
      <ul className="step-imgs__list-wrap">
        {formData.images &&
          formData.images.map((image, index) => (
            <li key={index} className="step-imgs__list-item">
              <div className="step-imgs__image-wrap">
                <div className="step-imgs__image-container">
                  {typeof image === "string" ? (
                    <img key={index} src={image} alt={`Image ${index}`} />
                  ) : (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index}`}
                    />
                  )}
                </div>
                <p>{image.name}</p>
              </div>

              <Button
                onClick={(e) => {
                  handleRemoveImage(e, index);
                }}
                variant="step-img"
                type="button"
              >
                <CloseIcon />
              </Button>
            </li>
          ))}
      </ul>
      {formData.images.length < 4 && (
        <Button variant={"primary"} onClick={handleInput}>
          seleccionar
        </Button>
      )}

      <input
        ref={fileInputRef}
        className="step-imgs__input"
        type="file"
        id="uploader-files"
        multiple
        accept="image/png, image/jpeg"
        onChange={handleImgsOnChange}
      />
    </div>
  );
};

export default StepImgs;
