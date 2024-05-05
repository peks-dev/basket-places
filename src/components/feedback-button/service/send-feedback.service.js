//models
import { ValidationError } from "@/models/errors.model";
// service
import { insertDataOnTable } from "@/services/supabase/table-operations.service";
// utilities
import validateStepFormData from "@/utilities/validate-step-form-data.utility";

export async function sendFeedback() {
  try {
    const form = document.getElementById("feedback-form");
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);
    const someInputEmpty =
      validateStepFormData(formProps).length < 1 ? false : true;
    if (someInputEmpty) {
      throw new ValidationError("faltan campos por rellenar");
    } else {
      if ("feedbackType" in formProps) {
        const data = {
          type: formProps.feedbackType,
          message: formProps.feedbackMessage,
        };
        await insertDataOnTable("feedbacks", data);
      } else {
        throw new ValidationError("selecciona un tipo de feedback");
      }
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("faltan campos por rellenar")) {
      throw error;
    } else {
      throw new Error("no se pudo enviar tu feedback");
    }
  }
}
