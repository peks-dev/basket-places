// SearchPage.js
import React from "react";
import "./search.css";
// context
import { useToastStore } from "@/context/toastStore";
// services
import { deleteDataOnTable } from "../../services/supabase/table-operations.service";
// components
import Button from "@/components/button/button";

const SearchPage = () => {
  const { resetToast } = useToastStore();

  async function handleDeleteComment() {
    await deleteDataOnTable("reviews", "court_id", 52);
  }
  return (
    <section className="search-page">
      <h1>search page</h1>
      <Button type={"button"} onClick={resetToast}>
        limpiar notificaciones
      </Button>
      <Button type={"button"} onClick={handleDeleteComment}>
        eliminar comentario
      </Button>
    </section>
  );
};

export default SearchPage;
