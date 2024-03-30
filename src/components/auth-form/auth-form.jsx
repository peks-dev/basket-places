import { useState } from "react";

// Components
import AuthHeader from "./components/auth-header";
import Button from "@/ui/btn/button";
export default function AuthForm() {
  const [action, setAction] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const actions = [
    {
      name: "signUp",
      submitBtnText: "registrarse",
      headerTitle: "crear cuenta",
      function: () => {
        alert("cuenta creada");
      },
    },
    {
      name: "signIn",
      submitBtnText: "ingresar cuenta",
      headerTitle: "iniciar sesion",
      function: () => {
        alert("sesion iniciada");
      },
    },
    {
      name: "recoveryPass",
      submitBtnText: "recuperar",
      headerTitle: "recuperar cuenta",
      function: () => {
        alert("recuperacion de cuenta");
      },
    },
  ];

  const actionSelected = actions.find((e) => e.name === action);

  return (
    <div className="auth-form">
      <form
        action={actionSelected.actionForm}
        className="auth-form-wrapper"
        method="post"
      >
        <AuthHeader headingText={actionSelected.headerTitle} />
        <div>email input</div>
        {action !== "recovery" && ( // No show input password on recovery pass
          <div>contraseña input</div>
        )}
        <Button type={"submit"} variant={"primary"}>
          {actionSelected.submitBtnText}
        </Button>
        <div className="auth-form__footer">
          <p>¿Tienes cuenta?</p>
          <Button
            className="btn btn--link"
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Ingresar
          </Button>
        </div>
      </form>
    </div>
  );
}
