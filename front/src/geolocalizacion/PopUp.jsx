import React from "react";
import { Popup } from "react-leaflet";
import { Card } from "react-bootstrap";

const PopUp = ({ props }) => {
  const { info, type } = props;
  return (
    <Popup>
      <Card
        bg="Light"
        key={info.id}
        text="dark"
        style={{ width: "15rem" }}
        className="mb-2"
      >
        <Card.Header>{type}</Card.Header>
        <Card.Body>
          <Card.Title>{info.fullname || info.name}</Card.Title>
          <Card.Text>
            {type === "Cliente" ? (
              <>
                CUIT: {info.cuit}
                <br />
              </>
            ) : (
              ""
            )}
            {type === "Vigilador" ? (
              <>
                CUIL: {info.cuil}
                <br />
                E-mail: {info.email}
                <br />
              </>
            ) : (
              ""
            )}
            {info.fulladdress || info.address}
          </Card.Text>
        </Card.Body>
      </Card>
    </Popup>
  );
};

export default PopUp;
