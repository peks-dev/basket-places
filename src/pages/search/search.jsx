// SearchPage.js
import React, { useEffect } from "react";
import "./search.css";

// hooks
import { useCourtsData } from "../../hooks/use-courts-data.hook";

// components
import CourtCard from "../../components/court-card-preview/court-card";
import Loader from "../../components/loader/loader";
import Error from "../../components/error/error";
import Title from "@/components/layout/title/title";

const SearchPage = () => {
  const { canchasData, loading, error } = useCourtsData();
  // En el componente SearchPage
  const handleScroll = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
  };

  // Agrega y retira el listener del evento de scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // En el componente SearchPage
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  if (error) {
    console.log(error);
    return <Error />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="search-page">
      <header className="search-page__header">
        <Title tag={"h1"} text={"recientes"} size={"title--xlg"} />
      </header>
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
    </section>
  );
};

export default SearchPage;
