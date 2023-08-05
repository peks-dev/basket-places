import React, { useContext } from "react";
import { supabase } from "../../services/supabase/create-client-supa";

//context
import UserContext from "../../context/user/userContext";

//components
import Btn from "../../components/layout/button/button";

// services
import { deleteCourt } from "../../services/court/insert-court-data.service";

const SearchPage = () => {
  const handleFetchCourts = async (e) => {
    try {
      const { data, error } = await supabase.from("courts").select();
      if (error) {
        throw new Error("no se pudo extraer listado");
      }
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h1>search</h1>
      <Btn
        text={"obtener listado"}
        variant={"btn--primary"}
        onClick={handleFetchCourts}
      />
    </div>
  );
};

export default SearchPage;
