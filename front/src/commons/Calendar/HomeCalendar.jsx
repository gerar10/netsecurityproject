import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsBuilding } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function HomeCalendar() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
          <div>
            <Link to="/calendar/branchCalendar">
              <BsBuilding size={"6em"} style={{ cursor: "pointer" }} />
            </Link>
            Mostrar calendario por sucursal.
          </div>
        </Col>
        <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
          <div>
            <Link to="/calendar/guardCalendar">
              <BiUserCircle size={"6em"} style={{ cursor: "pointer" }} />
            </Link>
            Mostrar calendario por vigilador.
          </div>
        </Col>
      </Row>
    </Container>
  );
}
