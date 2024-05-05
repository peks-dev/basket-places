import "./App.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { useThemeStore } from "@/context/themeStore";
import { useToastStore } from "@/context/toastStore";
// pages
const Prueba = React.lazy(() => import("./pages/prueba/prueba"));
const MapPage = lazy(() => import("./pages/map/map-page"));
const LoginPage = lazy(() => import("./pages/login/login"));
const NotFound = lazy(() => import("./pages/not-found/not-found"));
const SearchPage = lazy(() => import("./pages/search/search"));
const EditCourt = lazy(() => import("./pages/edit-court/edit-court"));
const CourtDetails = lazy(() => import("./pages/court-details/court-details"));
const UserProfilePage = lazy(() => import("./pages/user-profile/user-profile"));
const RegisterCourtPage = lazy(() =>
  import("./pages/register-court/register-court")
);
const UpdatePasswordPage = lazy(() =>
  import("./pages/update-password/update-password")
);

// Components
import Toast from "@/components/toast/toast";
import Navbar from "@/components/layout/navbar/navbar";
import ViewportBlocker from "./components/viewport-blocker/viewport-blocker";
import Loader from "./components/loader/loader";

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
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/new-bp" element={<RegisterCourtPage />} />
              <Route path="/courts/:courtId" element={<CourtDetails />} />
              <Route path="/edit-court/" element={<EditCourt />} />
              <Route path="/update-password" element={<UpdatePasswordPage />} />
              <Route path="/prueba" element={<Prueba />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <div className="toast-list">
            {alerts.map((t) => (
              <Toast key={t.id} type={t.type} text={t.text} />
            ))}
          </div>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
