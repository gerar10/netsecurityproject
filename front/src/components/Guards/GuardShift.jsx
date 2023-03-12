import React from "react";

export default function GuardShift({ label, day, handle, name }) {
  return (
    <>
      <label className="form-label">{label}</label>
      <select className="form-select" onChange={handle} name={name}>
        <option disabled selected></option>
        <option value="1">Turno Matutino</option>
        <option value="2">Turno Diurno</option>
        <option value="3">Turno Vespertino</option>
      </select>
    </>
  );
}
