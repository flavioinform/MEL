import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero2 from "./components/hero2";
import HomeSections from "./components/HomeSections";
import Footer from "./components/Footer";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Mision from "./pages/Mision";
import Vision from "./pages/Vision";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen min-w-screen bg-slate-100 flex flex-col relative">
        <WhatsAppButton />
        <Navbar />

        <div className="flex-1">
          <Routes>
            {/* Página principal */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <br />
                  <Hero2 />
                  <HomeSections />
                </>
              }
            />

            {/* Páginas estáticas */}
            <Route path="/mision" element={<Mision />} />
            <Route path="/vision" element={<Vision />} />

            {/* Autenticación y Dashboard */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
