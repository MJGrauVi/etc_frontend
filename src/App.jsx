import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import AdminPanelTailwind from "./pages/AdminPanelTailwind.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NuevaPiezaPage from "./pages/NuevaPiezaPage.jsx";
import MisPiezasPage from "./pages/MisPiezasPage.jsx";
import PiezaDetallePage from "./pages/PiezaDetallePage.jsx";
import useContextoSesion from "./hooks/useContextoSesion.js";
import "./App.css";

const RutaAdmin = ({ children }) => {
  const { usuario } = useContextoSesion();
  if (!usuario) return <Navigate to="/login" />;
  if (usuario.rol !== "Administrador") return <Navigate to="/" />;
  return children;
};

const RutaPrivada = ({ children }) => {
  const { usuario } = useContextoSesion();
  if (!usuario) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Solo admin */}
        <Route
          path="/admin/usuarios"
          element={
            <RutaAdmin>
              <AdminPanelTailwind />
            </RutaAdmin>
          }
        />

        {/* Usuario autenticado */}
        <Route
          path="/pieza/nueva"
          element={
            <RutaPrivada>
              <NuevaPiezaPage />
            </RutaPrivada>
          }
        />
        <Route
          path="/mis-piezas"
          element={
            <RutaPrivada>
              <MisPiezasPage />
            </RutaPrivada>
          }
        />
        <Route
          path="/pieza/:id"
          element={
            <RutaPrivada>
              <PiezaDetallePage />
            </RutaPrivada>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}