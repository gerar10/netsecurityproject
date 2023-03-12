import React from "react";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faBuilding,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import PopUp from "./PopUp";

const Point = ({ props }) => {
  const { latitude, longitude, info, type } = props;
  let iconMarkup = "";
  switch (type) {
    case "Sucursal":
      iconMarkup = ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faBuilding} size="2x" />
      );
      break;
    case "Vigilador":
      iconMarkup = ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faUserShield} size="2x" />
      );
      break;
    default:
      iconMarkup = ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faLocationDot} size="4x" color="#246eb9" />
      );
  }

  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  return (
    <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
      <PopUp props={{ info, type }} />
    </Marker>
  );
};

export default Point;
