import React, { useRef, useContext } from "react";
import "./step-img.css";
// icon
import UploadIcon from "../../../../../assets/form-step/upload-icon";
// Small components
import Txt from "../../../../../components/layout/text-body/text-body";
import Btn from "../../../../../components/layout/button/button";

// Context
import CourtContext from "../../../../../context/court/court-context";

const StepImgs = () => {
  const fileInputRef = useRef(null);
  const { updateImages, courtState } = useContext(CourtContext);

  const handleImgs = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const handleImgsOnChange = (event) => {
    const files = event.target.files;
    const selected = Array.from(files).slice(0, 4); // Limitar a 4 imágenes
    updateImages(selected);
  };

  return (
    <div className="step-imgs">
      <label htmlFor="uploader-files" className="step-imgs__uploader">
        <UploadIcon style={"step-imgs__icon"} color={"#de9e36"} />
        <div className="step-imgs__texts-wrap">
          <Txt
            content={"selecciona imagenes de tu galleria"}
            style={"txt--center"}
          />
          <Txt content={"( Máximo 4 imagenes )"} style={"txt--center"} />
        </div>
        <Btn
          text={"seleccionar"}
          variant={"btn--primary"}
          onClick={handleImgs}
        ></Btn>

        <input
          ref={fileInputRef}
          className="step-imgs__input"
          type="file"
          id="uploader-files"
          multiple
          accept="image/png, image/jpeg"
          onChange={handleImgsOnChange}
        />
      </label>
      <ul className="step-imgs__list-wrap">
        {courtState.images
          ? courtState.images.map((image, index) => (
              <li key={index} className="step-imgs__list-img">
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                />
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default StepImgs;
