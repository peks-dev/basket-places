import React, { useState, useRef } from "react";
import "./edit-profile.css";
// Servicios
import {
  updateDataOnTable,
  fetchDataOnTable,
} from "@/services/supabase/table-operations.service";
import {
  uploadFile,
  deleteObjectFromStorage,
} from "@/services/supabase/storage-operations.service";
// Contexto
import { useUserStore } from "@/context/userStore";
// Utilidades
import compressAvatar from "@/utilities/compress-avatar";
// Componentes
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import ImageAddIcon from "@/components/icons/image-add-icon";
import FormField from "../form/form-field/form-field";
import LoaderBtn from "@/components/loader-btn/loader-btn";

const EditProfile = () => {
  const { profile, refreshProfile } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", avatar: null });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFormData({ ...formData, avatar: selectedFile });
    }
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleChangeAvatar = () => {
    inputRef.current.click();
  };
  const exitEditProfile = () => {
    setShowModal(false);
    // Limpiar datos del formulario al salir
    setFormData({ name: "", avatar: null });
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { name, avatar } = formData;

      if (avatar) {
        const compressedImage = await compressAvatar(avatar);
        const avatarUrl = `https://rkmuvbbnbbajhimhcxmq.supabase.co/storage/v1/object/public/avatars/${profile.id}/${compressedImage.name}`;

        await uploadFile(
          "avatars",
          `${profile.id}/${compressedImage.name}`,
          compressedImage
        );
        await updateDataOnTable(
          "profiles",
          { avatar_url: avatarUrl },
          "id",
          profile.id
        );

        // delete old image
        const url = profile.avatar_url;
        const parts = url.split("/");
        const oldImgName = parts[parts.length - 1];
        await deleteObjectFromStorage("avatars", `${profile.id}/${oldImgName}`);
      }

      if (name) {
        await updateDataOnTable("profiles", { apodo: name }, "id", profile.id);
      }

      // refresh profile ui
      if (avatar || name) {
        const newData = await fetchDataOnTable("profiles", "id", profile.id);
        refreshProfile(newData[0]);
      }

      // Cerrar modal después de actualizar
      exitEditProfile();
    } catch (error) {
      console.log(error);
      // Manejar errores, mostrar mensajes al usuario, etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>editar perfil</Button>
      {showModal && (
        <Modal
          onConfirm={updateProfile}
          onCancel={exitEditProfile}
          confirmBtnChild={loading ? <LoaderBtn /> : "guardar"}
        >
          <form className="edit-profile">
            <input
              ref={inputRef}
              type="file"
              onChange={handleImageChange}
              className="edit-profile__input-file"
            />
            <div className="edit-profile__avatar">
              {formData.avatar ? (
                <img src={URL.createObjectURL(formData.avatar)} alt="Preview" />
              ) : (
                <ImageAddIcon />
              )}
            </div>
            <Button
              type="button"
              onClick={handleChangeAvatar}
              variant="secundary"
            >
              cambiar avatar
            </Button>
            <FormField
              inputName="apodo"
              inputType="text"
              inputValue={formData.name}
              handleInputChange={handleNameChange}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
