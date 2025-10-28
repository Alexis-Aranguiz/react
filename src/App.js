import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
// Importamos Footer SOLO para Inicio, pero no lo ponemos global acá

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import GestionDeUsuario from "./pages/GestionDeUsuario";
import ProductosDescuento from "./pages/ProductosDescuento";
import Canje from "./pages/Canje";
import Blog from "./pages/Blog";
import AdminUser from "./pages/AdminUser";

function NotFound() {
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, esta ruta no existe.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <main style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuario" element={<GestionDeUsuario />} />
          <Route path="/canjea" element={<ProductosDescuento />} />
          <Route path="/referidos" element={<Canje />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<AdminUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
