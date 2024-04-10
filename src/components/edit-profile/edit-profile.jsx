import React, { useState, useRef } from "react";
import "./edit-profile.css";

// components
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import ImageAddIcon from "@/components/icons/image-add-icon";
import FormField from "../form/form-field/form-field";

const EditProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const inputRef = useRef();

  function saveChanges() {
    alert("se envio todo");
  }
  function exitEditProfile() {
    setShowModal(false);
    setPreviewImage(null);
    setName("");
  }

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };
  function handleNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleChangeAvatar() {
    // hacer click en el input
    inputRef.current.click();
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        editar perfil
      </Button>
      {showModal && (
        <Modal onConfirm={saveChanges} onCancel={exitEditProfile}>
          <form className="edit-profile">
            <input
              ref={inputRef}
              type="file"
              onChange={handleImageChange}
              className="edit-profile__input-file"
            />
            <div className="edit-profile__avatar">
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <ImageAddIcon />
              )}
            </div>

            <Button
              type={"button"}
              onClick={handleChangeAvatar}
              variant={"secundary"}
            >
              cambiar avatar
            </Button>
            <FormField
              inputName={"apodo"}
              inputType={"text"}
              inputValue={name}
              handleInputChange={handleNameChange}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
