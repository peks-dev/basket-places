// SearchPage.js
import React from "react";
import "./search.css";

// hooks
import { useCourtsData } from "../../hooks/use-courts-data.hook";

// components
import CourtCard from "../../components/court-card-preview/court-card";
import Loader from "../../components/loader/loader";
import Error from "../../components/error/error";

const SearchPage = () => {
  const { canchasData, loading, error } = useCourtsData();

  if (error) {
    console.log(error);
    return <Error />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="search-page">
      <ul className="search-page__courts-container">
        {canchasData.map((courtData, index) => (
          <li key={index}>
            <CourtCard
              key={index}
              courtData={courtData}
              showDeleteButton={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
