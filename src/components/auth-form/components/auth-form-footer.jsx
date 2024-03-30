import React from "react";

//components
import Button from "@/components/button/button";

const AuthFormFooter = ({ switcherFn, currentAction }) => {
  return (
    <div className="auth-form__footer">
      <div className="auth-form__switcher">
        <p>¿Olvidaste tu contraseña?</p>
        <Button
          variant={"link"}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            switcherFn("recoveryPass");
          }}
        >
          click aqui
        </Button>
      </div>

      <div className="auth-form__switcher">
        <p>¿No tienes cuenta?</p>
        <Button
          variant={"link"}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            switcherFn("signUp");
          }}
        >
          registrarse
        </Button>
      </div>

      {currentAction !== "signIn" && (
        <div className="auth-form__switcher">
          <p>¿Tienes cuenta?</p>
          <Button
            variant={"link"}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              switcherFn("signIn");
            }}
          >
            ingresar
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthFormFooter;
