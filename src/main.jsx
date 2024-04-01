import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./global.css";
import "./body-bg.css";

//components
import App from "./App";

//context
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
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
