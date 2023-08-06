import React, { useContext, useEffect } from "react";
import { supabase } from "../../services/supabase/create-client-supa";

//components
import Btn from "../../components/layout/button/button";
import CourtCard from "../../components/court-card-preview/court-card";

// services
import { deleteCourt } from "../../services/court/insert-court-data.service";
import { useGetDataCard } from "../../hooks/use-get-data-card.hook";

const SearchPage = () => {
  const { data, loading, error } = useGetDataCard("35");
  if (loading) {
    return <div> cargando data...</div>;
  }
  if (error) {
    return <div>hubo un error al cargar la data</div>;
  }
  return (
    <div className="search-page">
      <CourtCard courtData={data} />
    </div>
  );
};

export default SearchPage;
