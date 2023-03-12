import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { BsLinkedin, BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#246eb9" }}
      className="text-center text-lg-start text-muted p-2"
    >
      <MDBContainer className="text-center">
        <MDBRow>
          <MDBCol className="mx-auto" style={{ color: "white" }}>
            <p className="mb-1">
              <a>Gabriel Penise</a>
              <MDBIcon icon="envelope" className="me-3 espacio text-white" />
              <a
                href="https://www.linkedin.com/in/gabriel-penise"
                className="me-2"
              >
                <BsLinkedin className="text-white" />
              </a>
              <a href="https://github.com/GabrielPenise">
                <BsGithub className="text-white" />
              </a>
            </p>
            <p className="mb-1">
              <a>Carmela Cacabelos</a>
              <MDBIcon icon="envelope" className="me-3 text-white" />
              <a
                href="https://www.linkedin.com/in/carmela-cacabelos-46b80123b"
                className="me-1"
              >
                <BsLinkedin className="text-white" />
              </a>
              <a href="https://github.com/carmelis">
                <BsGithub className="text-white" />
              </a>
            </p>
            <p className="mb-1">
              <a>Gerardo Burgos</a>
              <MDBIcon icon="envelope" className="me-3 text-white" />
              <a
                href="https://www.linkedin.com/in/gerardoburgos"
                className="me-2"
              >
                <BsLinkedin className="text-white" />
              </a>
              <a href="https://github.com/gerar10">
                <BsGithub className="text-white" />
              </a>
            </p>
            <p className="mb-1">
              <a>Gisela Arroyo</a>
              <MDBIcon icon="envelope" className="me-3 text-white" />
              <a href="https://www.linkedin.com/in/giselaa" className="me-2">
                <BsLinkedin className="text-white" />
              </a>
              <a href="https://github.com/giselaArroyo">
                <BsGithub className="text-white" />
              </a>
            </p>
            <p className="mb-2">
              <a>Alberto Carrillo</a>
              <MDBIcon icon="envelope" className="me-3 text-white" />
              <a
                href="https://www.linkedin.com/in/alberto-carrillo-de-comas-1a31b0b6/"
                className="me-2"
              >
                <BsLinkedin className="text-white" />
              </a>
              <a href="https://github.com/albertokarri">
                <BsGithub className="text-white" />
              </a>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center" style={{ color: "white" }}>
        © 2022 Todos los derechos Reservados:{" "}
        <a className="text-dark" href="https://netglobal.tech/">
          Net Global
        </a>
      </div>
    </MDBFooter>
  );
}
