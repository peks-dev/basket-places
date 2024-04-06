import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Context
import { useThemeStore } from "@/context/themeStore";
import { useToastStore } from "@/context/toastStore";

// Pages
const Prueba = React.lazy(() => import("./pages/prueba/prueba"));
import MapPage from "./pages/map/map-page";
import LoginPage from "./pages/login/login";
import SearchPage from "./pages/search/search";
import EditCourt from "./pages/edit-court/edit-court";
import CourtDetails from "./pages/court-details/court-details";
import UserProfilePage from "./pages/user-profile/user-profile";
import RegisterCourtPage from "./pages/register-court/register-court";

// Components
import Toast from "@/components/toast/toast";
import Navbar from "@/components/layout/navbar/navbar";
import ViewportBlocker from "./components/viewport-blocker/viewport-blocker";

//Render
function App() {
  const [isViewportTooSmall, setIsViewportTooSmall] = useState(false);
  const { alerts } = useToastStore();
  const { applyTheme } = useThemeStore();

  useEffect(() => {
    const handleResize = () => {
      setIsViewportTooSmall(window.innerWidth < 250);
    };
    handleResize(); // Check viewport size on load
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
        <main className={"app-content"}>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/new-bp" element={<RegisterCourtPage />} />
            <Route path="/courts/:courtId" element={<CourtDetails />} />
            <Route path="/edit-court/:courtId" element={<EditCourt />} />
            <Route path="/prueba" element={<Prueba />} />
          </Routes>
        </main>
        <Navbar />
        {
          // Notification system
          <div className="toast-list">
            {alerts.map((t) => (
              <Toast key={t.id} type={t.type} text={t.text} />
            ))}
          </div>
        }
      </div>
    </Router>
  );
}

export default App;
