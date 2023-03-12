import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropDownSelect from "../DropDown/DropDownSelect";
import { FetchsDb } from "../../utils/FetchsDb";

function Turnos({ handleSelect }) {
  const [shifts, setShifts] = useState([]);
  const [shiftInput, setShiftInput] = useState({
    value: null,
    label: "Elija un turno",
  });

  const getShifts = async () => {
    const shiftsArr = await FetchsDb.fetchGet(`/shifts`);

    const optionsShiftsArr = shiftsArr.map((element) => {
      return {
        label: `Turno ${element.type} `,
        value: element,
      };
    });

    setShifts(optionsShiftsArr);
  };

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <DropDownSelect
      options={shifts}
      handleSelect={handleSelect}
      defVal={shiftInput}
    />
  );
}

export default Turnos;
