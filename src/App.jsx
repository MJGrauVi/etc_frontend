import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import "./App.css";

export default function App() {
  return (
    <>

      {/* Navbar siempre visible */}
      <Navbar />

      {/* Contenido dinámico según la ruta */}
      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>

      {/* Footer siempre visible */}
      <Footer />
    </>
  );
}
