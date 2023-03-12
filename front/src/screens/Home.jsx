import React from "react";
import style from "../assets/styles/screens/Home.module.scss";
import imagen from "../assets/styles/image/gris_cuadrado.png";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <Container style={{ minHeight: "100vh" }}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
            <div className={style["divGeneral"]}>
              <img className={style["imagenLog"]} src={imagen} />
            </div>
            <div className={style["tituloHome"]}>
              <h3>Bienvenid@, {user.name}!</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
