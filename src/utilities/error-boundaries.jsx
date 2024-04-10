import React from "react";
import ErrorDisplay from "@/components/errors/error-display/error-display";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que la próxima renderización muestre la UI de respaldo.
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores.
    console.log(this.props.error);
  }

  render() {
    if (this.state.hasError || this.props.error) {
      // Puedes renderizar cualquier UI de respaldo personalizada.
      return <ErrorDisplay error={this.props.error} />;
    }
    return this.props.children;
  }
}
