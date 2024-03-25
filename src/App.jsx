import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// Context
import CourtProvier from "./context/court/court-provider";
import { useThemeStore } from "@/context/themeStore";

// Pages
import MapPage from "./pages/map/map-page";
import SearchPage from "./pages/search/search";
import UserProfilePage from "./pages/user-profile/user-profile";
import Credentials from "./pages/credentials/credentials";
import CourtDetails from "./pages/court-details/court-details";
import EditCourt from "./pages/edit-court/edit-court";
import RegisterCourtPage from "./pages/register-court/register-court";
import Prueba from "./pages/prueba/prueba";

// Components
import Navbar from "./components/layout/navbar/navbar";
import UserContext from "./context/user/userContext";
import ViewportBlocker from "./components/viewport-blocker/viewport-blocker";
import ThemeButton from "@/components/theme-button/theme-button";

//Render
function App() {
  const { user } = useContext(UserContext);
  const [isViewportTooSmall, setIsViewportTooSmall] = useState(false);
  const { changeTheme } = useThemeStore();

  useEffect(() => {
    const handleResize = () => {
      setIsViewportTooSmall(window.innerWidth < 250);
    };
    handleResize(); // Verificar el tamaño del viewport al cargar la aplicación
    changeTheme();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      localStorage.removeItem("courtsLocations");
    };
  }, []);

  return (
    <Router>
      {isViewportTooSmall && <ViewportBlocker />}
      <div className="App">
        <main className={`app-content`}>
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
                    <RegisterCourtPage />
                  </CourtProvier>
                ) : (
                  <Credentials />
                )
              }
            />
            <Route path="/search/:courtId" element={<CourtDetails />} />
            <Route
              path="/edit-court/:courtId"
              element={
                user.id ? (
                  <CourtProvier>
                    <EditCourt />
                  </CourtProvier>
                ) : (
                  <Credentials />
                )
              }
            />
            <Route path="/prueba" element={<Prueba />} />
          </Routes>
          <ThemeButton />
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
