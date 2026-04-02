import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import AdminPanelTailwind from "./pages/AdminPanelTailwind.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import useContextoSesion from "./hooks/useContextoSesion.js";
import "./App.css";

const RutaAdmin = ({ children }) => {
  const { usuario } = useContextoSesion();
  if (!usuario) return <Navigate to="/" />;
  if (usuario.rol !== "Administrador") return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/usuarios"
          element={
            <RutaAdmin>
              <AdminPanelTailwind />
            </RutaAdmin>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}