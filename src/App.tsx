import "./App.css";

import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import DoctorsPage from "./pages/DoctorsPage";
import Footer from "./components/Footer";
import FourmsPage from "./pages/FourmsPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Route } from "react-router";
import { Routes } from "react-router";
import { useLocation } from "react-router";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/fourms" element={<FourmsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
