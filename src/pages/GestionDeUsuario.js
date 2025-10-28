import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function GestionDeUsuario() {
  // --------- STATE DE REGISTRO ---------
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regBirthdate, setRegBirthdate] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regReferido, setRegReferido] = useState("");

  // --------- STATE DE LOGIN ---------
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // --------- USUARIO ACTUAL ---------
  const [currentUser, setCurrentUser] = useState(null);

  // helper tipo Storage que tenías
  const Storage = {
    get: (key, def) => {
      try {
        return JSON.parse(localStorage.getItem(key)) || def;
      } catch {
        return def;
      }
    },
    set: (key, val) => {
      localStorage.setItem(key, JSON.stringify(val));
    },
    push: (key, val) => {
      const arr = Storage.get(key, []);
      arr.push(val);
      Storage.set(key, arr);
    },
    remove: (key) => {
      localStorage.removeItem(key);
    },
  };

  // Cargar usuario actual al montar
  useEffect(() => {
    const u = Storage.get("currentUser", null);
    setCurrentUser(u);
  }, []);

  // ------------ VALIDACIONES -------------
  function calcularEdad(fechaStr) {
    if (!fechaStr) return 0;
    const birth = new Date(fechaStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  function esCorreoDuoc(email) {
    // misma lógica que tenías
    return /@duoc(\.cl|uc\.cl)$/i.test(email);
  }

  // ------------ HANDLERS -------------
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // validaciones básicas
    if (!regName.trim()) {
      alert("Este campo no debe estar vacío (Nombre completo)");
      return;
    }
    if (!regEmail.trim()) {
      alert("Este campo no debe estar vacío (Correo)");
      return;
    }
    if (!regBirthdate.trim()) {
      alert("Este campo no debe estar vacío (Fecha de nacimiento)");
      return;
    }
    if (!regPassword) {
      alert("Este campo no debe estar vacío (Contraseña)");
      return;
    }

    // validar edad >= 18
    const edad = calcularEdad(regBirthdate);
    if (edad < 18) {
      alert("Para registrarte en nuestra página debes tener 18 años o más");
      return;
    }

    // descuento Duoc
    let discount = 0;
    if (esCorreoDuoc(regEmail)) {
      discount = 20;
    }

    // usuarios ya existentes
    const users = Storage.get("users", []);
    if (users.some((u) => u.email === regEmail)) {
      alert("Ya existe un usuario registrado con este correo.");
      return;
    }

    // crear nuevo usuario
    const newUser = {
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      birthdate: regBirthdate,
      discount,
      referido: regReferido.trim(),
      points: 0,
      referrals: 0,
      purchases: [],
    };

    // guardar en localStorage
    Storage.push("users", newUser);
    Storage.set("currentUser", newUser);
    setCurrentUser(newUser);

    alert("Registro exitoso! Bienvenido " + newUser.name);

    // limpiar form
    setRegName("");
    setRegEmail("");
    setRegBirthdate("");
    setRegPassword("");
    setRegReferido("");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const users = Storage.get("users", []);
    const found = users.find(
      (u) => u.email === loginEmail.trim() && u.password === loginPassword
    );

    if (!found) {
      alert("Correo o contraseña incorrectos. Intenta de nuevo.");
      return;
    }

    Storage.set("currentUser", found);
    setCurrentUser(found);
    alert("Bienvenido " + found.name);

    // limpiar login
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleLogout = () => {
    Storage.remove("currentUser");
    setCurrentUser(null);
    alert("Has cerrado sesión.");
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold">Gestión de Usuario</h1>
          <p className="text-muted">Regístrate, inicia sesión y administra tu perfil gamer.</p>
        </Col>
      </Row>

      {/* Registro de Usuario */}
      <Row className="mb-5">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h2 className="h4 mb-3">Registro de Usuario</h2>

              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo:</Form.Label>
                  <Form.Control
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha de nacimiento:</Form.Label>
                  <Form.Control
                    type="date"
                    value={regBirthdate}
                    onChange={(e) => setRegBirthdate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Código de referido (opcional):</Form.Label>
                  <Form.Control
                    type="text"
                    value={regReferido}
                    onChange={(e) => setRegReferido(e.target.value)}
                  />
                </Form.Group>

                <div className="p-2 bg-light rounded border mb-3">
                  <strong>Puntos LevelUp:</strong>{" "}
                  <span>{currentUser?.points ?? 0}</span>
                  <br />
                  <small className="text-muted">
                    ¡Gana puntos invitando amigos y sube de nivel para canjear productos y descuentos!
                  </small>
                </div>

                <Button type="submit" variant="primary" className="w-100 mb-2">
                  Registrarse
                </Button>

                <p className="small text-muted mb-0">
                  * Usuarios con correo Duoc reciben 20% de descuento de por vida.
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Login */}
        <Col md={6} className="mt-4 mt-md-0">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h2 className="h4 mb-3">Iniciar Sesión</h2>

              <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="success" className="w-100">
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gestión de Perfil + Info Usuario */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h2 className="h4 mb-3">Gestión de Perfil</h2>

              <Form /* este podría luego actualizar info en localStorage */>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo:</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={currentUser?.name || ""}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={currentUser?.email || ""}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Preferencias de compra:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Consolas, Accesorios"
                    defaultValue={currentUser?.preferencias || ""}
                  />
                </Form.Group>

                <Button variant="warning" className="w-100">
                  Actualizar Perfil
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mt-4 mt-md-0">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h2 className="h4 mb-3">Estado de la cuenta</h2>

              {currentUser ? (
                <>
                  <p>
                    <strong>Bienvenido:</strong> {currentUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p>
                    <strong>Descuento:</strong> {currentUser.discount || 0}%
                  </p>
                  <p>
                    <strong>Puntos:</strong> {currentUser.points || 0}
                  </p>
                  <p>
                    <strong>Referidos:</strong> {currentUser.referrals || 0}
                  </p>

                  <Button
                    variant="outline-danger"
                    className="w-100 mt-3"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <p className="text-muted">No has iniciado sesión.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
