import React from "react";
import Btn from "../../components/layout/button/button";
import { deleteCourt } from "../../services/court/insert-court-data.service";

const SearchPage = () => {
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteCourt(29);
  };

  return (
    <div>
      <h1>search</h1>
      <Btn text={"eliminar"} variant={"btn--primary"} onClick={handleDelete} />
    </div>
  );
};

export default SearchPage;
