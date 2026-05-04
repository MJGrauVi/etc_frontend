import LoginRegistro from "../components/LoginRegistro.jsx";
import LogoEtcTail from "../components/logo/LogoEtcTail.jsx";

const LoginPage = () => {
  return (

    <main className="relative flex items-center justify-center min-h-screen px-4 py-10 bg-gray-50">
      {/* Logo de fondo */}
      <div className="absolute right-[50%] top-[50%] opacity-6">
        <LogoEtcTail className="etc" />
      </div>
      {/* Formulario encima */}
      <LoginRegistro />
    </main>
  );
};

export default LoginPage;