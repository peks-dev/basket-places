import React, { useRef } from "react";
import "./step-img.css";
// utilities
import { isImageHorizontal } from "./utilities/horizontal-check.utilitie";

// Components
import Button from "@/components/button/button";
import CloseIcon from "@/components/icons/close-icon";

// Context
import { useStepFormStore } from "@/context/stepFormStore";

const StepImgs = () => {
  const fileInputRef = useRef(null);
  const { formData, updateImages } = useStepFormStore();

  const handleImgsOnChange = async (event) => {
    const files = event.target.files;
    const selected = Array.from(files).slice(0, 4); // Limitar a 4 imágenes

    const horizontalImagesConfirmed = await Promise.all(
      selected.map(async (file) => {
        // Verificar si el archivo es una imagen
        if (file.type.startsWith("image/")) {
          const isHorizontal = await isImageHorizontal(file);
          return isHorizontal ? file : null;
        } else {
          console.log(
            "El archivo seleccionado no es una imagen válida:",
            file.name
          );
          return null;
        }
      })
    );

    const existingImages = formData.images || []; // Guardar las anteriores
    const newImages = horizontalImagesConfirmed.filter((file) => file !== null);
    const updatedImages = [...existingImages, ...newImages].slice(0, 4);

    updateImages(updatedImages);
  };
  const handleInput = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    updateImages(updatedImages);
  };

  return (
    <div className="step-imgs">
      <p>
        Sube 2 fotos como minimo y 4 como máximo
        <br />
        <span className="yellow">todas deben ser horizontales</span>
      </p>
      <ul className="step-imgs__list-wrap">
        {Array.isArray(formData.images) &&
          formData.images.length > 0 &&
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
                {typeof image === "string" ? (
                  <p>{image.split("/").pop()}</p>
                ) : (
                  <p> {image.name}</p>
                )}
              </div>

              <Button
                onClick={(e) => {
                  handleRemoveImage(e, index);
                }}
                variant="secundary"
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
