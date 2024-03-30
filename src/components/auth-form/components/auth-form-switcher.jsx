import Button from "@/components/button/button";

export const passRecoveryDiv = (setState) => {
  return (
    <div className="auth-form__footer">
      <p>¿Olvidaste tu contraseña?</p>
      <Button
        className=" btn btn--link"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setState("recoveryPass");
        }}
      >
        Recuperar
      </Button>
    </div>
  );
};
export const registerAccountDiv = (setState) => {
  return (
    <div className="auth-form__footer">
      <p>¿No tienes cuenta?</p>
      <Button
        className="btn btn--link"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setState("signUp");
        }}
      >
        Registrarme
      </Button>
    </div>
  );
};
export const ingressAccountDiv = (setState) => {
  return (
    <div className="auth-form__footer">
      <p>¿Tienes cuenta?</p>
      <Button
        className="btn btn--link"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setState("signIn");
        }}
      >
        Ingresar
      </Button>
    </div>
  );
};
