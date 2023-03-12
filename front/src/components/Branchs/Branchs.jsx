import { useEffect, useRef, useState } from "react";

import { Axios } from "../../utils/AxiosWithCredentials.js";

import { useSelector, useDispatch } from "react-redux";

import BranchModalEdit from "./BranchModalEdit.jsx";

import BranchModalNew from "./BranchModalNew.jsx";
import { Container } from "react-bootstrap";
import BtnNewForAbm from "../../commons/Buttons/BtnNewForAbm.jsx";
import DropDownSelect from "../../commons/DropDown/DropDownSelect.jsx";
import DynamicTable from "../../commons/Tables/DynamicTable.jsx";
import { FetchsDb } from "../../utils/FetchsDb.js";
import { setBranchs, deleteBranch } from "../../store/slices/index.js";
import { useLocation } from "react-router-dom";
import Calendario from "../../commons/Calendar/Calendario.jsx";

export default function Branchs() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [input, setInput] = useState({});

  const { user } = useSelector((state) => state.user);
  const branchs = useSelector((state) => state.branchs);

  const getBranchs = async () => {
    const branchsArr = await FetchsDb.fetchGet(`/branches/byclient/${user.id}`);

    const optionsBranchsArr = branchsArr.map((element) => {
      return {
        label: `${element.name}`,
        value: element,
      };
    });
    dispatch(setBranchs(optionsBranchsArr));
  };

  const handleSelect = (e) => {
    setInput(e);
  };

  useEffect(() => {
    if (!branchs.length) {
      getBranchs();
    }
  }, [branchs]);

  const handleDelete = () => {
    Axios.put(`/branches/delete/${input.value.id}`);
    dispatch(deleteBranch(input));
    setInput({});
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <div style={{ marginBottom: "6%" }}>
        <DropDownSelect
          defVal={input}
          options={branchs}
          handleSelect={handleSelect}
        />
      </div>
      {pathname === "/calendar/branchCalendar" ? (
        <Calendario branch={input.value} />
      ) : (
        <>
          <DynamicTable
            object={Array(input.value)}
            handleDelete={handleDelete}
          />
          <BtnNewForAbm />
          <BranchModalEdit branch={input} setState={setInput} />
          <BranchModalNew />
        </>
      )}
    </Container>
  );
}
