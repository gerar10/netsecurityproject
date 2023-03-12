import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FetchsDb } from "../../utils/FetchsDb";
import DropDownSelect from "./DropDownSelect";

export default function DropDownModalGuards(props) {
  const { activeEvent } = useSelector((state) => state.calendar);

  let txtInLabel = {};
  activeEvent
    ? (txtInLabel = activeEvent.title)
    : (txtInLabel = "Elija un Guardia");
  const [guards, setGuards] = useState([]);
  const [guardInput, setGuardInput] = useState({
    value: null,
    label: `${txtInLabel}`,
  });

  const getGuards = async () => {
    const guardsArr = await FetchsDb.fetchGet(
      `/guards/byDistance/${props.branch.id}/${props.date}/${props.shiftId}`
    );

    const optionsGuardsArr = guardsArr.map((element) => {
      return {
        label: `Turno ${element.fullname} `,
        value: element,
      };
    });

    setGuards(optionsGuardsArr);
  };

  useEffect(() => {
    if (props.date && props.shiftId) {
      //Revisar como disparar el useEffect
      getGuards();
    }
  }, [props.date, props.shiftId]);

  return (
    <DropDownSelect
      options={guards}
      handleSelect={props.handleSelect}
      defVal={guardInput}
    />
  );
}
