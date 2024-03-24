import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import UserProvider from "./context/user/userProvider";
import { useStepFormStore } from "@/context/stepFormStore";

const Index = () => {
  const { resetStepForm } = useStepFormStore();
  useEffect(() => {
    // Acciones de limpieza al cargar la aplicación

    return () => {
      // Acciones de limpieza al desmontar la aplicación (cuando se cierre la pestaña del navegador, por ejemplo)
      resetStepForm();
    };
  }, []);

  return (
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
