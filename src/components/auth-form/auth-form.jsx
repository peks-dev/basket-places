import { useState } from "react";
import "./auth-form.css";

// lib
import useAuthActions from "./hooks/useAuthActions";
// Components
import AuthHeader from "./components/auth-form-header";
import AuthFormFooter from "./components/auth-form-footer";
import Button from "@/components/button/button";
import FormField from "@/components/form/form-field/form-field";
import FormFieldPassword from "../form/form-field-password/form-field-password";
import LoaderBtn from "../loader-btn/loader-btn";

export default function AuthForm() {
  const [action, setAction] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // nuevo estado
  const actions = useAuthActions();

  const actionSelected = actions.find((e) => e.name === action);

  function handleInputChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    actionSelected.submitFunction(e).finally(() => {
      setIsProcessing(false);
    });
  }

  return (
    <section className="auth-form">
      <form onSubmit={handleSubmit} className="auth-form-wrapper" method="post">
        <AuthHeader headingText={actionSelected.headerTitle} />
        <FormField
          inputType={"email"}
          inputName={"email"}
          handleInputChange={handleInputChange}
          inputValue={email}
        />
        {action !== "recoveryPass" && ( // No show input password on recovery pass
          <FormFieldPassword
            inputValue={password}
            handleInputChange={handleInputChange}
          />
        )}
        <Button type={"submit"} variant={"primary"} disabled={isProcessing}>
          {isProcessing ? <LoaderBtn /> : actionSelected.submitBtnText}
        </Button>
        <AuthFormFooter switcherFn={setAction} currentAction={action} />
      </form>
    </section>
  );
}
