import { useEffect, useState } from "react";

import { Axios } from "../../utils/AxiosWithCredentials.js";

import { useSelector, useDispatch } from "react-redux";

import { Container } from "react-bootstrap";
import GuardModalEdit from "./GuardModalEdit.jsx";
import GuardModalNew from "./GuardModalNew.jsx";
import BtnNewForAbm from "../../commons/Buttons/BtnNewForAbm.jsx";
import DropDownSelect from "../../commons/DropDown/DropDownSelect.jsx";
import DynamicTable from "../../commons/Tables/DynamicTable.jsx";
import { setGuards, deleteGuard } from "../../store/slices/index.js";
import { FetchsDb } from "../../utils/FetchsDb.js";
import { useLocation } from "react-router-dom";
import Calendario from "../../commons/Calendar/Calendario.jsx";

export default function Guards() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const guards = useSelector((state) => state.guards);
  const [input, setInput] = useState({});

  const { user } = useSelector((state) => state.user);

  const getGuards = async () => {
    const guardsArr = await FetchsDb.fetchGet(`/guards/byclient/${user.id}`);

    const optionsGuardsArr = guardsArr.map((element) => {
      let setTrue = null;
      element.active ? (setTrue = "Si") : (setTrue = "No");
      return {
        label: `Guardia: ${element.name} ${element.lastname} Activo: ${setTrue}`,
        value: element,
      };
    });

    dispatch(setGuards(optionsGuardsArr));
  };

  const handleSelect = (e) => {
    setInput(e);
  };

  useEffect(() => {
    if (!guards.length) {
      getGuards();
    }
  }, [guards]);

  const handleDelete = () => {
    Axios.put(`/guards/delete/${input.value.id}`);
    dispatch(deleteGuard(input));
    setInput({});
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <div style={{ marginBottom: "6%" }}>
        <DropDownSelect
          defVal={input}
          options={guards}
          handleSelect={handleSelect}
        />
      </div>
      {pathname === "/calendar/guardCalendar" ? (
        <Calendario branch={input.value} />
      ) : (
        <>
          <DynamicTable
            object={Array(input.value)}
            handleDelete={handleDelete}
          />
          <BtnNewForAbm />
          <GuardModalEdit guard={input} setState={setInput} />
          <GuardModalNew />
        </>
      )}
    </Container>
  );
}
