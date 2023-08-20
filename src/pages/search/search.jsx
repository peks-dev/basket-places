// SearchPage.js
import React from "react";
import "./search.css";

// hooks
import { useCourtsData } from "../../hooks/use-courts-data.hook";

// components
import CourtCard from "../../components/court-card-preview/court-card";

const SearchPage = () => {
  const { canchasData, loading, error } = useCourtsData();

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <div>cargando data...</div>;
  }

  return (
    <div className="search-page">
      <ul className="search-page__courts-container">
        {canchasData.map((courtData, index) => (
          <li key={index}>
            <CourtCard
              key={index}
              courtData={courtData}
              showDeleteButton={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
