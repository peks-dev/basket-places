import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./global.css";
import "./body-bg.css";

//components
import App from "./App";

//context
import UserProvider from "./context/user/userProvider";
import { useStepFormStore } from "@/context/stepFormStore";

const Index = () => {
  const { resetStepForm } = useStepFormStore();
  useEffect(() => {
    // Acciones de limpieza
    window.addEventListener("beforeunload", resetStepForm);
    return () => {
      // Remover acciones de limpieza (cerrar pestaña o recargarla)
      window.removeEventListener("beforeunload", resetStepForm);
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
