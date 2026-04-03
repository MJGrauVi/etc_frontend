import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useContextoSesion from "./useContextoSesion.js";
 //Lógica y llamada a la API.
const usePiezaForm = () => {
  const { postForm } = useContextoSesion();
  const navegar = useNavigate();

  const estadoInicial = {
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
  };

  const [form, setForm] = useState(estadoInicial);
  const [fotos, setFotos] = useState([]); // archivos File[]
  const [previews, setPreviews] = useState([]); // URLs para previsualizar
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFotos = (e) => {
    const archivos = Array.from(e.target.files);
    setFotos(archivos);
    // Generamos previews para mostrar las miniaturas
    const urls = archivos.map(f => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const eliminarFoto = (index) => {
    setFotos(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      if (form.categoria) formData.append("categoria", form.categoria);
      if (form.precio) formData.append("precio", form.precio);
      fotos.forEach(foto => formData.append("fotos[]", foto));

      const data = await postForm("pieza", formData);
      setMensaje({ tipo: "success", texto: "Pieza creada correctamente." });
      setForm(estadoInicial);
      setFotos([]);
      setPreviews([]);

      // Redirigimos al detalle de la pieza creada
      setTimeout(() => navegar(`/pieza/${data.data.id}`), 1500);

    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    } finally {
      setCargando(false);
    }
  };

  return {
    form,
    fotos,
    previews,
    cargando,
    mensaje,
    handleChange,
    handleFotos,
    eliminarFoto,
    handleSubmit,
  };
};

export default usePiezaForm;