import { useState, useEffect } from "react";
import useDatos from "./useDatos.js";

const usePerfilForm = () => {
  const { get, cargando } = useDatos(true);
  const { put, postForm } = useDatos();

  const [form, setForm] = useState({
    tipo_documento: "",
    documento: "",
    movil: "",
    descripcion: "",
    web: "",
    redes_sociales: {
      facebook: "",
      instagram: "",
      linkedin: ""
    }
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const mostrarMensaje = (tipo, texto, tiempo = 3000) => {
    setMensaje({ tipo, texto });
    setTimeout(() => {
      setMensaje({ tipo: "", texto: "" });
    }, tiempo);
  };

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await get("perfil");
        const data = respuesta.data;
        setForm({
          tipo_documento: data.tipo_documento ?? "",
          documento:      data.documento ?? "",
          movil:          data.movil ?? "",
          descripcion:    data.descripcion ?? "",
          web:            data.web ?? "",
          redes_sociales: {
            facebook:  data.redes_sociales?.facebook ?? "",
            instagram: data.redes_sociales?.instagram ?? "",
            linkedin:  data.redes_sociales?.linkedin ?? ""
          }
        });
        if (data.logo) {
          setLogoPreview(
            `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${data.logo}`
          );
        }
      } catch (err) {
        mostrarMensaje("error", err.message);
      }
    };
    cargar();
  }, [get]); // Mantengo get en las dependencias.

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (["facebook", "instagram", "linkedin"].includes(name)) {
      setForm(prev => ({
        ...prev,
        redes_sociales: { ...prev.redes_sociales, [name]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    setLogoFile(archivo);
    setLogoPreview(URL.createObjectURL(archivo));
  };

  const guardarPerfil = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje({ tipo: "", texto: "" });
    try {
      await put("perfil", form);
      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);
        await postForm("perfil/logo", formData);
      }
      mostrarMensaje("success", "Perfil actualizado correctamente.");
      setLogoFile(null);
    } catch (err) {
      mostrarMensaje("error", err.message);
    } finally {
      setGuardando(false);
    }
  };

  return {
    form,
    logoPreview,
    cargando,
    guardando,
    mensaje,
    setMensaje,  // Lo expongo para Mensaje.
    handleChange,
    handleLogo,
    guardarPerfil,
  };
};

export default usePerfilForm;
