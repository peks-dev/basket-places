// SearchPage.js
import React from "react";
import "./search.css";
// context
import { useToastStore } from "@/context/toastStore";

// components
import Button from "@/components/button/button";

const SearchPage = () => {
  const { resetToast } = useToastStore();
  return (
    <section className="search-page">
      <h1>search page</h1>
      <Button type={"button"} onClick={resetToast}>
        limpiar notificaciones
      </Button>
    </section>
  );
};

export default SearchPage;
