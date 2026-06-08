import { useCallback, useState } from "react";
import { crudService } from "../services/crudService.js";
import { obtenerMensajeError } from "../utils/mensajesError.js";

const useDatos = (cargandoInicial = false) => {
  const [cargando, setCargando] = useState(cargandoInicial);
  const [error, setError] = useState(null);

  //useCallBack evita recrear funciones en cada render.
  const ejecutarPeticion = useCallback(async (peticion) => {
    setCargando(true);
    setError(null);

    try {
      return await peticion();
    } catch (err) {
      setError(obtenerMensajeError(err));
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  const get = useCallback(
    (endpoint) => ejecutarPeticion(() => crudService.get(endpoint)),
    [ejecutarPeticion],
  );

  const post = useCallback(
    (endpoint, data) => ejecutarPeticion(() => crudService.post(endpoint, data)),
    [ejecutarPeticion],
  );

  const put = useCallback(
    (endpoint, data) => ejecutarPeticion(() => crudService.put(endpoint, data)),
    [ejecutarPeticion],
  );

  const remove = useCallback(
    (endpoint) => ejecutarPeticion(() => crudService.remove(endpoint)),
    [ejecutarPeticion],
  );

  const postForm = useCallback(
    (endpoint, formData) =>
      ejecutarPeticion(() => crudService.postForm(endpoint, formData)),
    [ejecutarPeticion],
  );

  return {
    get,
    post,
    put,
    remove,
    postForm,
    cargando,
    error,
  };
};

export default useDatos;
