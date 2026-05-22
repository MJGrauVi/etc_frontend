import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDatos from "./useDatos.js";
 // Gestiono la lógica y la llamada a la API.
const usePiezaForm = () => {
  const { postForm, cargando } = useDatos();
  const navegar = useNavigate();

  const estadoInicial = {
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
  };

  const [form, setForm] = useState(estadoInicial);
  const [fotos, setFotos] = useState([]); // Guardo los archivos File[]
  const [previews, setPreviews] = useState([]); // Guardo las URLs para previsualizar
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFotos = (e) => {
    const archivos = Array.from(e.target.files);
    setFotos(archivos);
    // Genero previews para mostrar las miniaturas.
    const urls = archivos.map(f => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const eliminarFoto = (index) => {
    setFotos(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // Redirijo al detalle de la pieza creada.
      setTimeout(() => navegar(`/pieza/${data.data.id}`), 1500);

    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
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
