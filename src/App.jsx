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
import PerfilPage from "./pages/PerfilPage.jsx";
import PublicacionesPage from "./pages/PublicacionesPage.jsx";
import EditarPublicacionPage from "./pages/EditarPublicacionPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./App.css";

const RutaAdmin = ({ children }) => {
  const { usuario, cargando } = useContextoSesion();
  if (cargando) return null; 

  if (!usuario) return <Navigate to="/login" />;
  if (usuario.rol.trim() !== "Administrador") return <Navigate to="/" />;
  return children;
};

const RutaPrivada = ({ children }) => {
  const { usuario, cargando } = useContextoSesion();
  if (cargando) return null;
  if (!usuario) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Dejo padding por navbar fija */}
        <Routes>
          {/* Defino rutas públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Defino rutas solo para administración */}
          <Route
            path="/admin/usuarios"
            element={
              <RutaAdmin>
                <AdminPanelTailwind />
              </RutaAdmin>
            }
          />

          {/* Rutas para usuarios autenticados */}
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
            path="/publicaciones"
            element={
              <RutaPrivada>
                <PublicacionesPage />
              </RutaPrivada>
            }
          />
          <Route
            path="/publicaciones/:id/editar"
            element={
              <RutaPrivada>
                <EditarPublicacionPage />
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
          <Route
            path="/mi-perfil"
            element={
              <RutaPrivada>
                <PerfilPage />
              </RutaPrivada>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
