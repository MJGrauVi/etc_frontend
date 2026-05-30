import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Dejo padding por navbar fija */}
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
