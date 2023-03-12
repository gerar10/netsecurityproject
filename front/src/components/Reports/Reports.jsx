import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Axios } from "../../utils/AxiosWithCredentials";
import swal from "sweetalert2";

import { Container, Row, Col, Button } from "react-bootstrap";
import NavOptions from "./NavOptions";
import Table from "./Table";

const Reports = () => {
  const { type } = useParams();
  const { user } = useSelector((state) => state.user);
  const [reports, setReports] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClick = (e) => {
    e.preventDefault();
    if (startDate <= endDate) {
      Axios.get(
        `/reports/${user.id}/${type}/${format(
          startDate,
          "yyyy-MM-dd"
        )}/${format(endDate, "yyyy-MM-dd")}`
      )
        .then((res) => res.data)
        .then((reports) => setReports(reports));
    } else {
      new swal({
        title: "Atención",
        text: "La fecha fin no puede ser anterior a la de inicio",
        icon: "error",
      });
    }
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row className="my-4">
        <NavOptions />
      </Row>
      <Row className="my-4">
        <h4>Selecciona el periodo</h4>
        <Col>
          <p>Fecha inicio:</p>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            calendarStartDay={1}
            selected={startDate}
            onChange={(date) => {
              setReports([]);
              setStartDate(date);
            }}
          />
          <Button className="mt-4 px-4" onClick={handleClick}>
            Buscar
          </Button>
        </Col>
        <Col>
          <p>Fecha fin:</p>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            calendarStartDay={1}
            selected={endDate}
            onChange={(date) => {
              setReports([]);
              setEndDate(date);
            }}
          />
        </Col>
      </Row>
      {reports.length ? (
        <Row className="mt-5">
          <h5>Resultados</h5>
          <Table reports={reports} start={startDate} end={endDate} />
        </Row>
      ) : (
        "No hay datos para el periodo seleccionado"
      )}
    </Container>
  );
};

export default Reports;
