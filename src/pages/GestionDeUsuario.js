// src/pages/GestionDeUsuario.js
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { login, register } from "../utils/api";
import {
  saveSession,
  getCurrentUser,
  logout,
  isAdmin as hasAdminRole,
} from "../utils/auth";

function GestionDeUsuario() {
  const [user, setUser] = useState(getCurrentUser());

  // ---- ESTADO LOGIN ----
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ---- ESTADO REGISTRO ----
  const [regNombre, setRegNombre] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  // ---- HANDLERS ----
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const data = await login(loginEmail, loginPassword);
      saveSession(data);
      setUser(data);
      window.dispatchEvent(new Event("authChanged"));
    } catch (err) {
      setLoginError(err.message || "Error al iniciar sesión");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    if (regPassword.length < 6) {
      setRegError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (regPassword !== regPassword2) {
      setRegError("Las contraseñas no coinciden.");
      return;
    }

    setRegLoading(true);
    try {
      // Registro en backend
      const data = await register(regNombre, regEmail, regPassword);

      // ✅ Queda logeado al tiro
      saveSession(data);
      setUser(data);
      window.dispatchEvent(new Event("authChanged"));

      setRegSuccess("Cuenta creada correctamente. ¡Bienvenido/a!");
      // opcionalmente podrías limpiar los campos de registro:
      setRegNombre("");
      setRegEmail("");
      setRegPassword("");
      setRegPassword2("");
    } catch (err) {
      setRegError(err.message || "Error al registrar usuario");
    } finally {
      setRegLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
  };

  // ==================== VISTA USUARIO LOGEADO ====================
  if (user) {
    const admin = hasAdminRole();

    return (
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="mb-3">
                    Hola, <strong>{user.nombre}</strong>
                  </Card.Title>

                  <Card.Text className="mb-2">
                    <strong>Email:</strong> {user.email}
                  </Card.Text>

                  <Card.Text className="mb-2">
                    <strong>Roles:</strong>{" "}
                    {user.roles && user.roles.length > 0
                      ? user.roles.join(", ")
                      : "Usuario estándar"}
                  </Card.Text>

                  <Card.Text className="mb-2">
                    <strong>Puntos Level-Up:</strong>{" "}
                    <Badge bg="primary">{user.puntos ?? 0}</Badge>
                  </Card.Text>

                  <Card.Text className="mb-3">
                    <strong>Descuento activo:</strong>{" "}
                    <Badge bg="success">{user.descuentoPct ?? 0}%</Badge>
                  </Card.Text>

                  {admin && (
                    <Alert variant="info" className="mb-3">
                      Tienes rol <strong>administrador</strong>. Desde el menú
                      superior puedes acceder al panel <strong>Admin</strong>{" "}
                      para gestionar productos.
                    </Alert>
                  )}

                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      variant="outline-primary"
                      as={Link}
                      to="/productos"
                    >
                      Ir al catálogo de productos
                    </Button>

                    <Button
                      variant="outline-secondary"
                      as={Link}
                      to="/canjea"
                    >
                      Ver canje de puntos
                    </Button>

                    {admin && (
                      <Button variant="primary" as={Link} to="/admin">
                        Ir al panel Admin
                      </Button>
                    )}

                    <Button variant="danger" onClick={handleLogout}>
                      Cerrar sesión
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // ==================== VISTA LOGIN + REGISTRO ====================
  return (
    <section className="py-5">
      <Container>
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">Gestiona tu cuenta</h2>
            <p className="text-muted mb-0">
              Inicia sesión si ya tienes cuenta o regístrate para comenzar a
              acumular puntos Level-Up y acceder a descuentos.
            </p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-center">
          {/* --------- LOGIN --------- */}
          <Col xs={12} md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="mb-3">Iniciar sesión</Card.Title>
                <Card.Text className="text-muted">
                  Usa el correo y la contraseña que registraste.
                </Card.Text>

                {loginError && (
                  <Alert variant="danger" className="mt-2">
                    {loginError}
                  </Alert>
                )}

                <Form onSubmit={handleLogin} className="mt-3">
                  <Form.Group controlId="loginEmail" className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ej: gamer@test.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="loginPassword" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 fw-bold"
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Ingresando..." : "Ingresar"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* --------- REGISTRO --------- */}
          <Col xs={12} md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="mb-3">Crear cuenta</Card.Title>
                <Card.Text className="text-muted">
                  Regístrate para comenzar a ganar puntos Level-Up y acceder a
                  beneficios exclusivos.
                </Card.Text>

                {regError && (
                  <Alert variant="danger" className="mt-2">
                    {regError}
                  </Alert>
                )}
                {regSuccess && (
                  <Alert variant="success" className="mt-2">
                    {regSuccess}
                  </Alert>
                )}

                <Form onSubmit={handleRegister} className="mt-3">
                  <Form.Group controlId="regNombre" className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ej: Sebastián Gamer"
                      value={regNombre}
                      onChange={(e) => setRegNombre(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="regEmail" className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ej: gamer@test.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="regPassword" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="regPassword2" className="mb-3">
                    <Form.Label>Repetir contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Vuelve a escribir la contraseña"
                      value={regPassword2}
                      onChange={(e) => setRegPassword2(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 fw-bold"
                    disabled={regLoading}
                  >
                    {regLoading ? "Creando cuenta..." : "Registrarme"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default GestionDeUsuario;
