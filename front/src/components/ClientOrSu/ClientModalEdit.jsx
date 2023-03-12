import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { editClient, setUiOpen } from "../../store/slices/index.js";
import { Form, Button, Modal } from "react-bootstrap";
import { Axios } from "../../utils/AxiosWithCredentials.js";

export default function ClientModal({ client, setState }) {
  const initialState = { ...client.value };
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();
  const { uiOpen } = useSelector((state) => state.modal);

  const headingClientModal = [
    { heading: "Email", key: "email", type: "email" },
    { heading: "Cuit", key: "cuit", type: "number" },
    { heading: "Nombre", key: "name", type: "text" },
    { heading: "Dirección", key: "address", type: "text" },
  ];

  if (!Object.keys(client).length) {
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
      Axios.put(`clients/edit/${client.value.id}`, input);
      closeModal();
      dispatch(
        editClient({
          client,
          clientEdit: {
            label: input.name,
            value: { ...initialState, ...input },
          },
        })
      );
      setState({});
    } catch (err) {
      console.error(err, "failed to update client");
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
        <Form onSubmit={handleSubmit}>
          {headingClientModal.map((element, index) => {
            return (
              <div className="mb-3" key={index}>
                <label className="form-label">{element.heading}</label>
                <InputModal
                  item={client.value}
                  inputKey={element.key}
                  type={element.type}
                  handleInputChange={handleInputChange}
                />
              </div>
            );
          })}
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

const InputModal = ({ item, inputKey, type, handleInputChange }) => (
  <>
    <Form.Control
      type={type}
      name={inputKey}
      onChange={handleInputChange}
      defaultValue={item[`${inputKey}`]}
      required
    />
  </>
);
