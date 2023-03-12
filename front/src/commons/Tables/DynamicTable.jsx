import React, { useRef } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

import { setUiOpen } from "../../store/slices/index.js";
export default function DynamicTable({ object, handleDelete }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const column = useRef([]);
  const row = useRef([]);
  if (!object[0]) {
    return <div>Select an option</div>;
  }
  const { pathname } = useLocation();

  const headingColumnsAdm = [
    { heading: "id", value: "id" },
    { heading: "Nombre", value: "name" },
    { heading: "Cuit", value: "cuit" },
    { heading: "Email", value: "email" },
    { heading: "Direccion", value: "direccion" },
  ];

  const headingColumnsGuards = [
    { heading: "id", value: "id" },
    { heading: "Nombre", value: "name" },
    { heading: "Apellido", value: "lastname" },
    { heading: "Email", value: "email" },
    { heading: "Provincia", value: "province" },
    { heading: "Ciudad", value: "city" },
    { heading: "Calle", value: "street" },
    { heading: "Altura", value: "number" },
  ];

  const headingColumnsBranchs = [
    { heading: "id", value: "id" },
    { heading: "Sucursal", value: "name" },
    { heading: "Provincia", value: "province" },
    { heading: "Ciudad", value: "city" },
    { heading: "Calle", value: "street" },
    { heading: "Altura", value: "number" },
  ];

  if (pathname === "/superadmin") {
    column.current = headingColumnsAdm;
    row.current = object.map((element) => {
      return {
        id: element.id,
        cuit: element.cuit,
        name: element.name,
        direccion: element.address,
        email: element.email,
      };
    });
  }

  if (pathname === `/branch/${user.id}`) {
    column.current = headingColumnsBranchs;
    row.current = object.map((element) => {
      return {
        id: element.id,
        name: element.name,
        province: element.province,
        city: element.city,
        street: element.street,
        number: element.number,
      };
    });
  }

  if (pathname === `/guards/${user.id}`) {
    column.current = headingColumnsGuards;
    //esto me crea un nuevo arr con el obj con los datos que quiero mostrar
    row.current = object.map((element) => {
      return {
        id: element.id,
        name: element.name,
        lastname: element.lastname,
        email: element.email,
        city: element.city,
        province: element.province,
        street: element.street,
        number: element.number,
      };
    });
  }

  const handleModify = () => {
    dispatch(setUiOpen(true));
  };

  return (
    <>
      <Table responsive striped bordered hover style={{ display: "block" }}>
        <thead>
          <tr>
            {column.current.map((item, index) => {
              return <TableHeadItem key={index} item={item.heading} />;
            })}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableRowItem item={row.current} column={column.current} />
            <td>
              <Button onClick={handleModify}>Editar</Button>
            </td>
            <td>
              <Button onClick={handleDelete}>Baja</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

const TableHeadItem = ({ item }) => <th>{item}</th>;
const TableRowItem = ({ item, column }) => (
  <>
    {column.map((columnItem, index) => {
      return <td key={index}>{item[0][`${columnItem.value}`]}</td>;
    })}
  </>
);
