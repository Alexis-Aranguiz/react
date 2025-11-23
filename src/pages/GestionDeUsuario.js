import React, { useState } from "react";
import { login } from "../utils/api";
import { saveSession, getCurrentUser, logout } from "../utils/auth";

function GestionDeUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(getCurrentUser());

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      saveSession(data);
      setUser(data);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (user) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Hola, {user.nombre}</h2>
        <p>Email: {user.email}</p>
        <p>Roles: {user.roles.join(", ")}</p>
        <p>Puntos: {user.puntos}</p>
        <p>Descuento: {user.descuentoPct}%</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default GestionDeUsuario;
