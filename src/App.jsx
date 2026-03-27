
import ProveedorSesion from "./context/ProveedorSesion.jsx";

import LoginRegistro from "./components/LoginRegistro.jsx";

import './App.css'

function App() {


  return (
  
      <ProveedorSesion>
        <LoginRegistro />
      </ProveedorSesion>
    
  )
}

export default App;
