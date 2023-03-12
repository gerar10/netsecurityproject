import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const NavOptions = () => {
  const [selected, setSelected] = useState(true);

  const handleClickBranch = () => {
    if (!selected) setSelected(!selected);
  };

  const handleClickGuard = () => {
    if (selected) setSelected(!selected);
  };

  return (
    <>
      <h3 className="text-center mb-3">Seleccione el objeto del reporte:</h3>
      <Nav justify variant="tabs" defaultActiveKey="/reports/branches">
        <Nav.Item
          className={selected ? "bg-primary bg-opacity-10" : ""}
          onClick={handleClickBranch}
        >
          <Nav.Link as={Link} to="/reports/branches">
            Sucursales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          className={selected ? "" : "bg-primary bg-opacity-10"}
          onClick={handleClickGuard}
        >
          <Nav.Link as={Link} to="/reports/guards">
            Vigiladores
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavOptions;
