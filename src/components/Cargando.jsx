import React from 'react'

const Cargando = () => {
    return (
           <div className="flex flex-col items-center justify-center gap-3 p-4 sm:p-6 md:p-8 md:gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 rounded-full md:w-12 md:h-12 border-t-blue-500 animate-spin"></div>

      <p className="text-sm md:text-base">
        Cargando ...
      </p>
    </div>
    )
}

export default Cargando;