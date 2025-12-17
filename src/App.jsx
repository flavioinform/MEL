import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero2 from "./components/hero2";
import HomeSections from "./components/HomeSections";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen min-w-screen bg-slate-100">
        <Navbar />

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

          {/* Autenticación y Dashboard */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
