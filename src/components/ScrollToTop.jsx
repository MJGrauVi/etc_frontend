import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Forzamos el scroll al principio de la ventana
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // 'instant' asegura que suba ya, sin animaciones que puedan fallar
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;