import React, { useState, useEffect } from "react";
import "./credentials.css";

// Components
import Login from "./components/login/login";
import SignUp from "./components/sign-up/sign-up";
import CredentialsWelcome from "./components/welcome/crd-welcome";
import Button from "@/components/button/button";
import NotificationPopup from "../../components/notification-popup/notification-popup";

// utilities
import { ResetNotification } from "../../utilities/reset-notification.utilitie";

function Credentials() {
  // Estados
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [credentialStep, setCredentialStep] = useState("welcome");

  // Escuchador de notificacion
  useEffect(() => {
    ResetNotification(setShowNotification);
  }, [showNotification]);

  const RenderStepContent = () => {
    switch (credentialStep) {
      case "login":
        return (
          <Login
            messageState={setNotificationMessage}
            notificationState={setShowNotification}
          />
        );
      case "register":
        return (
          <SignUp
            messageState={setNotificationMessage}
            notificationState={setShowNotification}
          />
        );
      default:
        return <CredentialsWelcome setState={setCredentialStep} />;
    }
  };

  // Componente a renderizar
  return (
    <section className="credentials">
      {credentialStep !== "welcome" && (
        <Button
          variant={"primary"}
          onClick={() => {
            setCredentialStep("welcome");
          }}
        >
          atras
        </Button>
      )}

      <RenderStepContent />
      {showNotification && <NotificationPopup message={notificationMessage} />}
    </section>
  );
}

export default Credentials;
