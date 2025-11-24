// src/components/NavBar.js
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

export default function NavBar() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    // Cuando cambie la sesión (login / logout), actualizamos el usuario
    const handleAuthChanged = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("authChanged", handleAuthChanged);

    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
    };
  }, []);

  const handleLogoutClick = () => {
    logout();
    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
  };

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Level Up Gamer
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            {/* Aquí va tu página de login/perfil */}
            <Nav.Link as={Link} to="/usuario">Usuario</Nav.Link>
            <Nav.Link as={Link} to="/canjea">Canjea Productos</Nav.Link>
            <Nav.Link as={Link} to="/referidos">Referidos</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>

            {/* Solo mostrar Admin si el usuario tiene ROLE_ADMIN */}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}

            {/* Opción para cerrar sesión si hay usuario logueado */}
            {user && (
              <Nav.Link onClick={handleLogoutClick}>
                Cerrar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
