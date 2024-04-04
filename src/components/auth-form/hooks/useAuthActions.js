import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
// contexts
import { useStepFormStore } from "@/context/stepFormStore";
import { useUserStore } from "@/context/userStore";
import { useToastStore } from "@/context/toastStore";
import { create } from "zustand";

// Custom hook que maneja las acciones
export default function useAuthActions() {
  const { startRegister } = useStepFormStore();
  const { login } = useUserStore();
  const { createToast } = useToastStore();
  const historyState = history.state.usr;
  const navigate = useNavigate();

  // Definimos las acciones dentro del hook
  const actions = [
    {
      name: "signUp",
      submitBtnText: "registrarse",
      headerTitle: "crear cuenta",
      submitFunction: useCallback((e) => {
        e.preventDefault();
        alert("cuenta creada");
      }, []),
    },
    {
      name: "signIn",
      submitBtnText: "ingresar cuenta",
      headerTitle: "iniciar sesion",
      submitFunction: useCallback(async (e) => {
        e.preventDefault();
        // Recolectar la data
        const formData = new FormData(e.currentTarget);
        // convertir la data en un objeto clave - valor
        const formProps = Object.fromEntries(formData);
        try {
          await login(formProps.email, formProps.password);
          if (historyState.path === "/new-bp") {
            startRegister();
          }
          navigate(historyState.path);
        } catch (error) {
          console.log(error.message);
          if (error.message === "Invalid login credentials") {
            createToast("email o contraseña invalidos", "error");
          } else if (error.message === "Failed to fetch") {
            createToast("no tienes conexión a internet", "noConnection");
          }
        }
      }, []),
    },
    {
      name: "recoveryPass",
      submitBtnText: "recuperar",
      headerTitle: "recuperar cuenta",
      submitFunction: useCallback((e) => {
        e.preventDefault();
        alert("recuperacion de cuenta");
      }, []),
    },
  ];

  // Retornamos las acciones para que puedan ser utilizadas por un componente
  return actions;
}
