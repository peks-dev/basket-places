import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
// contexts
import { useStepFormStore } from "@/context/stepFormStore";
import { useUserStore } from "@/context/userStore";
import { useToastStore } from "@/context/toastStore";
import { resetPassword, register } from "@/services/supabase/auth.service";

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
      submitFunction: useCallback(async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formProps = Object.fromEntries(formData);
        try {
          await register(formProps.email, formProps.password);
          alert("confirma tu correo");
        } catch (error) {
          if (error.message === "Failed to fetch") {
            createToast("no tienes conexión a internet", "noConnection");
          } else {
            createToast("no se pudo registrar tu cuenta", "error");
          }
        }
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
          if (error.message === "Invalid login credentials") {
            createToast("email o contraseña invalidos", "error");
          } else if (error.message === "Failed to fetch") {
            createToast("no tienes conexión a internet", "noConnection");
          } else {
            createToast("no se pudo iniciar sesion", "error");
          }
        }
      }, []),
    },
    {
      name: "recoveryPass",
      submitBtnText: "recuperar",
      headerTitle: "recuperar cuenta",
      submitFunction: useCallback(async (e) => {
        e.preventDefault();
        // Recolectar la data
        const formData = new FormData(e.currentTarget);
        // convertir la data en un objeto clave - valor
        const formProps = Object.fromEntries(formData);
        console.log(formProps);
        try {
          await resetPassword(formProps.email);
          alert("revisa tu correo");
        } catch (error) {
          if (error.message === "Failed to fetch") {
            createToast("no tienes conexión a internet", "noConnection");
          } else {
            createToast("no pudimos restablecer tu contraseña", "error");
          }
        }
      }, []),
    },
  ];

  // Retornamos las acciones para que puedan ser utilizadas por un componente
  return actions;
}
