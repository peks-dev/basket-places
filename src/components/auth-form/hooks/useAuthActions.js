import { useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// contexts
import UserContext from "@/context/user/userContext";

// Custom hook que maneja las acciones
export default function useAuthActions() {
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const { state } = useLocation();

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
          await userLogin(formProps.email, formProps.password);
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          navigate(state.path);
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
