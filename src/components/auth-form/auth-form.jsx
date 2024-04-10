import { useState } from "react";
import "./auth-form.css";

// lib
import useAuthActions from "./hooks/useAuthActions";

// Components
import AuthHeader from "./components/auth-form-header";
import AuthFormFooter from "./components/auth-form-footer";
import Button from "@/components/button/button";
import FormField from "@/components/form/form-field/form-field";

export default function AuthForm() {
  const [action, setAction] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const actions = useAuthActions();

  const actionSelected = actions.find((e) => e.name === action);

  function handleInputChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  return (
    <section className="auth-form">
      <form
        onSubmit={actionSelected.submitFunction}
        className="auth-form-wrapper"
        method="post"
      >
        <AuthHeader headingText={actionSelected.headerTitle} />
        <FormField
          inputType={"email"}
          inputName={"email"}
          handleInputChange={handleInputChange}
          inputValue={email}
        />
        {action !== "recoveryPass" && ( // No show input password on recovery pass
          <FormField
            inputType={"password"}
            inputName={"password"}
            handleInputChange={handleInputChange}
            inputValue={password}
          />
        )}
        <Button type={"submit"} variant={"primary"}>
          {actionSelected.submitBtnText}
        </Button>
        <AuthFormFooter switcherFn={setAction} currentAction={action} />
      </form>
    </section>
  );
}
