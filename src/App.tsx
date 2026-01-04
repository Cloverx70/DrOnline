import "./App.css";

import { FooterDontRenderPaths, NavbarDontRenderPaths } from "./constants";

import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import DoctorDashboardPage from "./pages/DoctorDashboard";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import DoctorsPage from "./pages/DoctorsPage";
import EmergencyServicePage from "./pages/EmergencyPage";
import Footer from "./components/Footer";
import FourmsPage from "./pages/FourmsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import OurServicesPage from "./pages/OurServicesPage";
import RegisterPage from "./pages/RegisterPage";
import { Route } from "react-router";
import { Routes } from "react-router";
import YourStudiesPage from "./pages/YourStudiesPage";
import { useAuthStatus } from "./hooks/useAuthStatus";
import { useEffect } from "react";
import { useLocation } from "react-router";

function App() {
  const location = useLocation();
  const { data: user } = useAuthStatus();
  const shouldHideNavbar = NavbarDontRenderPaths.some((p) =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {!shouldHideNavbar && <Navbar user={user} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/fourms" element={<FourmsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
        <Route path="/doctors/:did" element={<DoctorProfilePage />} />
        <Route path="/your-studies" element={<YourStudiesPage />} />
        <Route path="/our-services" element={<OurServicesPage />} />
        <Route path="/emergency" element={<EmergencyServicePage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {!FooterDontRenderPaths.some((p) => location.pathname.startsWith(p)) && (
        <Footer />
      )}
    </>
  );
}

export default App;
