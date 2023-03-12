import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUiOpenNew, newGuard } from "../../store/slices/index.js";
import { Form, Button, Modal, Container, Col, Row } from "react-bootstrap";
import { Axios } from "../../utils/AxiosWithCredentials.js";

import GuardShift from "./GuardShift.jsx";

export default function GuardModalNew() {
  const { user } = useSelector((state) => state.user);

  const initialState = {
    name: "",
    lastname: "",
    email: "",
    cuit: null,
    street: "",
    number: null,
    city: "",
    province: "",
    postalcode: "",
    clientId: user.id,
  };
  const [input, setInput] = useState(initialState);
  const [guardShift, setGuardShif] = useState([]);
  const dispatch = useDispatch();
  const { uiOpenNew } = useSelector((state) => state.modalCreate);

  const headingGuardNew = [
    { heading: "Nombre", key: "name", type: "text" },
    { heading: "Apellido", key: "lastname", type: "text" },
    { heading: "Email", key: "email", type: "email" },
    { heading: "Cuil", key: "cuil", type: "text" },
    { heading: "Calle", key: "street", type: "text" },
    { heading: "Altura", key: "number", type: "number" },
    { heading: "Ciudad", key: "city", type: "text" },
    { heading: "Provincia", key: "province", type: "text" },
    { heading: "Codigo Postal", key: "postalcode", type: "text" },
  ];

  const optionsForShifts = [
    { label: "Lunes", name: "Monday" },
    { label: "Martes", name: "Tuesday" },
    { label: "Miercoles", name: "Wednesday" },
    { label: "Jueves", name: "Thursday" },
    { label: "viernes", name: "Friday" },
    { label: "Sabado", name: "Saturday" },
    { label: "Domingo", name: "Sunday" },
  ];

  const closeModal = () => {
    dispatch(setUiOpenNew(false));
    setInput(initialState);
    setGuardShif([]);
  };

  const handleDisponiblidad = (e) => {
    const shiftId = Number(e.target.value);
    const day = e.target.name;

    const dayAndShift = { day, shiftId };

    const guardShiftEdited = guardShift.filter(
      (element) => element.day !== dayAndShift.day
    );

    setGuardShif([...guardShiftEdited, dayAndShift]);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "number") {
      value = Number(value);
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/guards/create", input);

      const guardWithShifts = guardShift.map((element) => {
        return {
          ...element,
          guardId: data.id,
        };
      });

      await Axios.post("/guardShifts", guardWithShifts);

      const guard = {
        value: { ...data },
        label: `Guardia: ${data.name} ${data.lastname} Activo: Si`,
      };

      dispatch(newGuard(guard));
      setInput(initialState);
      closeModal();
    } catch (err) {
      alert("Error, Verificar los datos ingresados");
      console.error(err, "failed to create guard");
      setInput(initialState);
      closeModal();
    }
  };
  return (
    <Modal
      size="lg"
      show={uiOpenNew}
      onHide={closeModal}
      centered
      aria-labelledby="contained-moda-tittle-vcenter"
    >
      <Modal.Header closeButton>
        <Container>
          <Row>
            <Col>
              <Modal.Title>Nuevo Guardia</Modal.Title>
            </Col>
            <Col>
              <Modal.Title>Disponibilidad de Turnos </Modal.Title>
            </Col>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col>
                {headingGuardNew.map((element, index) => {
                  return (
                    <div className="mb-3" key={index}>
                      <label className="form-label">{element.heading}</label>
                      <Form.Control
                        value={input[element.key]}
                        type={element.type}
                        name={element.key}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  );
                })}
              </Col>
              <Col>
                <br />
                {optionsForShifts.map((element) => {
                  return (
                    <GuardShift
                      label={element.label}
                      name={element.name}
                      handle={handleDisponiblidad}
                    />
                  );
                })}
              </Col>
            </Row>
          </Container>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
