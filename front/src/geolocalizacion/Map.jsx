import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Point from "./Point";
import { Axios } from "../utils/AxiosWithCredentials";

import "../assets/geolocalizacion/geolocalizacion.css";

function Map({ user }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [client, setClient] = useState([]);
  const [guards, setGuards] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    if (user) {
      Axios.get(`/clients/${user.id}`)
        .then((res) => res.data)
        .then((client) => setClient(client))
        .catch((err) => console.error(err));
      Axios.get(`/guards/byClient/${user.id}`)
        .then((res) => res.data)
        .then((guards) => setGuards(guards))
        .catch((err) => console.error(err));
      Axios.get(`/branches/byClient/${user.id}`)
        .then((res) => res.data)
        .then((branches) => setBranches(branches))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div>
      {latitude && longitude ? (
        <MapContainer
          id="map"
          center={[latitude, longitude]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Point
            props={{ latitude, longitude, info: client, type: "Cliente" }}
          />

          {guards
            ? guards.map((guard, i) => (
                <Point
                  key={i}
                  props={{
                    latitude: guard.latitude,
                    longitude: guard.longitude,
                    info: guard,
                    type: "Vigilador",
                  }}
                />
              ))
            : ""}
          {branches
            ? branches.map((branch, i) => (
                <Point
                  key={i}
                  props={{
                    latitude: branch.latitude,
                    longitude: branch.longitude,
                    info: branch,
                    type: "Sucursal",
                  }}
                />
              ))
            : ""}
        </MapContainer>
      ) : (
        ""
      )}
    </div>
  );
}

export default Map;
