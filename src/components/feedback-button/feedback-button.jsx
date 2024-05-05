import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// context
import { useUserStore } from "@/context/userStore";
import { useToastStore } from "@/context/toastStore";
// services
import { sendFeedback } from "./service/send-feedback.service";
// components
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import FeedBackIcon from "@/components/icons/feedback-icon";
import Form from "@/components/form/form";
import InputRadioCheckbox from "@/components/form/input-radio-check/input-radio-checkbox";
import FormFieldSet from "@/components/form/form-field-set/form-field-set";
import LoaderBtn from "@/components/loader-btn/loader-btn";

const FeedBackButton = () => {
  const [showModal, setShowModal] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const { profile } = useUserStore();
  const { createToast } = useToastStore();
  const location = useLocation();
  const navigate = useNavigate();

  function handleModal() {
    setShowModal((prevState) => !prevState);
  }

  function handleSendFeedback() {
    setIsProcessing(true);
    sendFeedback(profile.id)
      .then(() => {
        console.log("formulario enviado con exito");
        setShowModal(false);
      })
      .catch((error) => {
        createToast(error.message, "error");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  function redirectToLogin() {
    navigate("/login", { state: { path: location.pathname } });
  }

  return (
    <>
      <Button
        type={"button"}
        onClick={handleModal}
        variant={"feedback"}
        customStyle={showModal ? "active" : "inactive"}
      >
        <FeedBackIcon />
      </Button>
      {showModal ? (
        <Modal
          onCancel={handleModal}
          confirmBtnChild={
            isProcessing ? <LoaderBtn /> : profile.id ? "enviar" : "ingresar"
          }
          onConfirm={profile.id ? handleSendFeedback : redirectToLogin}
        >
          <h2 className="modal__title">feedback</h2>
          {profile.id ? (
            <Form id={"feedback-form"}>
              <FormFieldSet variant={"feedback"} fieldsetTitle={"selecciona"}>
                <InputRadioCheckbox
                  type={"radio"}
                  name={"feedbackType"}
                  value={"petición de funcionalidad"}
                  id={"peticion"}
                />
                <InputRadioCheckbox
                  type={"radio"}
                  name={"feedbackType"}
                  value={"reporte de error"}
                  id={"error"}
                />
              </FormFieldSet>
              <FormFieldSet fieldsetTitle={"mensaje"}>
                <textarea maxLength={1000} name="feedbackMessage" />
              </FormFieldSet>
            </Form>
          ) : (
            <p className="modal__text">
              necesitas tener una cuenta para poder solicitar una nueva
              funcionalidad o reportar algun error
            </p>
          )}
        </Modal>
      ) : null}
    </>
  );
};

export default FeedBackButton;
