import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Axios } from "../utils/AxiosWithCredentials";
import { setUser } from "../store/slices";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ChangePassword = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    password: "",
    passwordBis: "",
  };

  const [input, setInput] = useState(initialState);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password === input.passwordBis)
      Axios.put(`/clients/change-password/${user.id}`, {
        password: input.password,
      })
        .then(() =>
          Axios.post("/clients/login", {
            email: user.email,
            password: input.password,
          })
            .then((res) => res.data)
            .then((user) => {
              dispatch(setUser(user));
              navigate("/home");
            })
        )
        .catch((err) => {
          setInput(initialState);
          alert(`${err.response.data.message}`);
        });
    else {
      setInput(initialState);
      alert(`La contraseña no coincide`);
    }
  };
  return (
    <div>
      <Container style={{ minHeight: "100vh" }}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswordBis">
                <Form.Label>Verifique contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Vuelva a ingresar su contraseña"
                  name="passwordBis"
                  value={input.passwordBis}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Button type="submit">Aceptar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePassword;
