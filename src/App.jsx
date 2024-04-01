import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Context
import { useThemeStore } from "@/context/themeStore";

// Pages
import MapPage from "./pages/map/map-page";
import SearchPage from "./pages/search/search";
import UserProfilePage from "./pages/user-profile/user-profile";
import CourtDetails from "./pages/court-details/court-details";
import EditCourt from "./pages/edit-court/edit-court";
import RegisterCourtPage from "./pages/register-court/register-court";
import Prueba from "./pages/prueba/prueba";

// Components
import Navbar from "./components/layout/navbar/navbar";
import ViewportBlocker from "./components/viewport-blocker/viewport-blocker";
import AuthForm from "@/components/auth-form/auth-form";

//Render
function App() {
  const [isViewportTooSmall, setIsViewportTooSmall] = useState(false);
  const { applyTheme } = useThemeStore();

  useEffect(() => {
    const handleResize = () => {
      setIsViewportTooSmall(window.innerWidth < 250);
    };
    handleResize(); // Verificar el tamaño del viewport al cargar la aplicación
    applyTheme();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // clean localStorage
      localStorage.removeItem("courtsLocations");
      localStorage.removeItem("registered-user-courts");
    };
  }, []);

  return (
    <Router>
      {isViewportTooSmall && <ViewportBlocker />}
      <div className="App">
        <main className={`app-content`}>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/new-bp" element={<RegisterCourtPage />} />
            <Route path="/courts/:courtId" element={<CourtDetails />} />
            <Route path="/edit-court/:courtId" element={<EditCourt />} />
            <Route path="/prueba" element={<Prueba />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
