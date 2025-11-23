import React, { useEffect, useState } from "react";
import { getProductos, crearProducto, eliminarProducto } from "../utils/api";
import { getToken, isAdmin } from "../utils/auth";

function AdminUser() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoria: "",
    puntosBase: 0,
    descuentoPct: 0,
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      }
    };
    cargar();
  }, []);

  if (!isAdmin()) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Panel de administración</h2>
        <p style={{ color: "red" }}>
          Necesitas iniciar sesión como administrador para ver esta página.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "stock" || name === "puntosBase" || name === "descuentoPct"
        ? Number(value)
        : value,
    }));
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    try {
      const token = getToken();
      const nuevo = await crearProducto(form, token);
      setProductos((prev) => [...prev, nuevo]);
      setMensaje("Producto creado correctamente");
      setForm({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        categoria: "",
        puntosBase: 0,
        descuentoPct: 0,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminar = async (id) => {
    setError("");
    setMensaje("");
    try {
      const token = getToken();
      await eliminarProducto(id, token);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      setMensaje("Producto eliminado");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Panel de administración</h2>

      <h3>Crear producto</h3>
      <form onSubmit={handleCrear}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          required
        />
        <input
          name="puntosBase"
          type="number"
          placeholder="Puntos base"
          value={form.puntosBase}
          onChange={handleChange}
          required
        />
        <input
          name="descuentoPct"
          type="number"
          placeholder="Descuento %"
          value={form.descuentoPct}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

      <h3>Productos existentes</h3>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} – ${p.precio} – Stock: {p.stock}
            <button onClick={() => handleEliminar(p.id)} style={{ marginLeft: "1rem" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUser;
