import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUiOpen } from "../../store/slices/index.js";
import { Form, Button, Modal } from "react-bootstrap";
import { Axios } from "../../utils/AxiosWithCredentials.js";

export default function BranchModal({ branch }) {
  const initialState = { ...branch.value };
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();
  const { uiOpen } = useSelector((state) => state.modal);

  const headingBranchModal = [
    { heading: "Nombre", key: "name", type: "text" },
    { heading: "Provincia", key: "province", type: "text" },
    { heading: "Ciudad", key: "city", type: "text" },
    { heading: "Calle", key: "street", type: "text" },
    { heading: "Altura", key: "number", type: "number" },
    { heading: "Codigo Postal", key: "postalcode", type: "text" },
  ];

  if (!Object.keys(branch).length) {
    return null;
  }

  const closeModal = () => {
    dispatch(setUiOpen(false));

    //Todo: Cerrar el modal, esta fn la voy a usar al final del handleSubmit
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "number") {
      value = Number(value);
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Axios.put(`branches/${branch.value.id}`, input);
      closeModal();
    } catch (err) {
      console.error(err, "failed to update branches");
      closeModal();
    }
  };
  return (
    <Modal
      size="sm"
      show={uiOpen}
      onHide={closeModal}
      centered
      aria-labelledby="contained-moda-tittle-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {headingBranchModal.map((element, index) => {
            return (
              <div className="mb-3" key={index}>
                <label className="form-label">{element.heading}</label>
                <InputModal
                  item={branch.value}
                  inputKey={element.key}
                  type={element.type}
                  handleInputChange={handleInputChange}
                />
              </div>
            );
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const InputModal = ({ item, inputKey, type, handleInputChange }) => (
  <>
    <Form.Control
      type={type}
      name={inputKey}
      onChange={handleInputChange}
      defaultValue={item[`${inputKey}`]}
    />
  </>
);
