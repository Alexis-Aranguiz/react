import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
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
            <Nav.Link as={Link} to="/usuario">Usuario</Nav.Link>
            <Nav.Link as={Link} to="/canjea">Canjea Productos</Nav.Link>
            <Nav.Link as={Link} to="/referidos">Referidos</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>

            {/* Si quieres acceso directo al panel admin */}
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

