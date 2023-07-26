import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// Context
import CourtProvier from "./context/court/court-provider";

// Pages
import MapPage from "./pages/map/map-page";
import SearchPage from "./pages/search/search";

import UserProfilePage from "./pages/user-profile/user-profile";
import Credentials from "./pages/credentials/credentials";

// Components
import Navbar from "./components/layout/navbar/navbar";
import UserContext from "./context/user/userContext";
import ViewportBlocker from "./components/viewport-blocker/viewport-blocker";
import FormStep from "./pages/form-step/form-step";

//Render
function App() {
  const { user } = useContext(UserContext);
  const [isViewportTooSmall, setIsViewportTooSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsViewportTooSmall(window.innerWidth < 250);
    };
    handleResize(); // Verificar el tamaño del viewport al cargar la aplicación

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      {isViewportTooSmall && <ViewportBlocker />}
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route
            path="/profile"
            element={user.id ? <UserProfilePage /> : <Credentials />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/new-bp"
            element={
              user.id ? (
                <CourtProvier>
                  <FormStep />
                </CourtProvier>
              ) : (
                <Credentials />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
