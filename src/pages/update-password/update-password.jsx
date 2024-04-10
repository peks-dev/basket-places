import React, { useState } from "react";
import "./update-password.css";
//services
import { updatePassword } from "@/services/supabase/auth.service";
// context
import { useToastStore } from "@/context/toastStore";
// components
import FormField from "@/components/form/form-field/form-field";
import Button from "@/components/button/button";

const UpdatePasswordPage = () => {
  const { createToast } = useToastStore();
  const [password, setPassword] = useState(null);

  function handleChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!password) {
      createToast("escribe una contraseña", "error");
    } else {
      updatePassword(password);
      alert("enviado!");
    }
  }

  return (
    <section className="update-password">
      <form className="update-password__form" onSubmit={handleSubmit}>
        <FormField
          inputName={"new password"}
          inputType={"text"}
          handleInputChange={handleChange}
          inputValue={password}
        />
        <Button type="submit">restablecer</Button>
      </form>
    </section>
  );
};

export default UpdatePasswordPage;
