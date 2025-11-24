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

  return resp.json();
}

// 🔥 NUEVA FUNCIÓN PARA REGISTRO
export async function register(nombre, email, password) {
  const resp = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Error al registrar usuario");
  }

  return resp.json(); // Devuelve token, roles, nombre, email...
}

// ====== PRODUCTOS ======
export async function getProductos() {
  const resp = await fetch(`${API_BASE_URL}/productos`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!resp.ok) {
    throw new Error("Error al obtener productos");
  }

  return resp.json();
}

export async function crearProducto(producto, token) {
  const resp = await fetch(`${API_BASE_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (resp.status === 403) {
    throw new Error("No tienes permisos para crear productos");
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Error al crear producto");
  }

  return resp.json();
}

export async function actualizarProducto(id, producto, token) {
  const resp = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (resp.status === 403) {
    throw new Error("No tienes permisos para actualizar productos");
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Error al actualizar producto");
  }

  return resp.json();
}

export async function eliminarProducto(id, token) {
  const resp = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
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
