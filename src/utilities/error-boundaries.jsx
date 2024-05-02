import React from "react";
import ErrorDisplay from "@/components/errors/error-display/error-display";
import { ValidationError } from "@/models/errors.model";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que la próxima renderización muestre la UI de respaldo.
    let errorInfo;
    if (error.message.includes("Failed to fetch")) {
      console.log("ejecutado");
      errorInfo = new ValidationError("no tienes conexion");
    } else {
      errorInfo = new Error("algo salio mal");
    }
    return { hasError: true, errorInfo };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores.
  }

  render() {
    if (this.state.hasError || this.props.error) {
      // Puedes renderizar cualquier UI de respaldo personalizada.
      const errorToDisplay = this.state.errorInfo;
      return <ErrorDisplay error={errorToDisplay} />;
    }
    return this.props.children;
  }
}
