import React, { useState } from "react";
import "./update-password.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  function handleChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!password) {
        createToast("escribe una contraseña", "error");
      } else {
        await updatePassword(password);
        createToast("se ha cambiado tu contraseña", "success");
        // redirect user
        setTimeout(() => {
          navigate("/login");
        }, [1500]);
      }
    } catch (error) {
      createToast("no se pudo cambiar tu contraseña", "error");
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
