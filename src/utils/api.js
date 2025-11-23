// src/utils/api.js
const API_BASE_URL = "http://localhost:8080/api/v1";

// ====== AUTH ======
export async function login(email, password) {
  const resp = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Error al iniciar sesión");
  }

  return resp.json(); // { token, nombre, email, roles, puntos, descuentoPct }
}

// ====== PRODUCTOS ======
export async function getProductos() {
  const resp = await fetch(`${API_BASE_URL}/productos`, {
    method: "GET",
    headers: { "Accept": "application/json" },
  });

  if (!resp.ok) {
    throw new Error("Error al obtener productos");
  }

  return resp.json(); // lista de productos
}

export async function crearProducto(producto, token) {
  const resp = await fetch(`${API_BASE_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (resp.status === 403) {
    throw new Error("No tienes permisos para crear productos (se requiere ADMIN)");
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Error al crear producto");
  }

  return resp.json();
}

export async function eliminarProducto(id, token) {
  const resp = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (resp.status === 403) {
    throw new Error("No tienes permisos para eliminar productos");
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Error al eliminar producto");
  }
}
