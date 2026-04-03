import usePiezaForm from "../hooks/usePiezaForm.js";
import PiezaFormUI from "../components/PiezaFormUI.jsx";

const NuevaPiezaPage = () => {
  const {
    form,
    previews,
    cargando,
    mensaje,
    handleChange,
    handleFotos,
    eliminarFoto,
    handleSubmit,
  } = usePiezaForm();

  return (
    <main className="min-h-screen font-sans bg-white">

      {/* Cabecera */}
      <section className="py-12 border-b border-gray-200 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Nueva pieza
          </h1>
          <p className="mt-2 text-gray-600">
            Añade los datos de tu creación y sube las fotos.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-2xl px-6 mx-auto">
          <PiezaFormUI
            form={form}
            previews={previews}
            cargando={cargando}
            mensaje={mensaje}
            onChange={handleChange}
            onFotos={handleFotos}
            onEliminarFoto={eliminarFoto}
            onSubmit={handleSubmit}
          />
        </div>
      </section>

    </main>
  );
};

export default NuevaPiezaPage;