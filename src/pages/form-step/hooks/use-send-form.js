import { useState, useEffect } from "react";
import { verifiedData } from "../utilities/verified-data.utilitie";

export function useSendForm(objectData) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const resultado = verifiedData(objectData);
    setMessage(resultado);
  }, [objectData]);

  return { message };
}
