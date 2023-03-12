import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import imagen from "../assets/styles/image/gris_cuadrado.png";
import style from "../assets/styles/screens/Login.module.scss";
import { Axios } from "../utils/AxiosWithCredentials";
import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { setUser } from "../store/slices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: "",
  };

  const [input, setInput] = useState(initialState);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/clients/login", input)
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
        user.first_access ? navigate("/change-password") : navigate("/home");
      })
      .catch(() => {
        setInput(initialState);
        alert("Email o contraseña incorrecta");
      });
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="rounded-5 p-2">
          <div className={style["divGeneral"]}>
            <img className={style["imagenLog"]} src={imagen} />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su Email"
                name="email"
                value={input.email}
                onChange={handleInput}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={input.password}
                placeholder="Ingrese su Contraseña"
                onChange={handleInput}
                required
              />
            </Form.Group>

            <Button type="submit">Ingresar</Button>
          </Form>
          <Form.Text className="text-muted">
            ¿Olvido su contraseña? Haga Click aquí
          </Form.Text>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
