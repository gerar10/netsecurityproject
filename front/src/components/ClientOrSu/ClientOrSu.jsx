import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "../../utils/AxiosWithCredentials.js";

import DropDownSelect from "../../commons/DropDown/DropDownSelect.jsx";
import DynamicTable from "../../commons/Tables/DynamicTable.jsx";
import ClientModal from "./ClientModalEdit.jsx";
import ClientModalNew from "./ClientModalNew.jsx";
import { Container } from "react-bootstrap";
import { FetchsDb } from "../../utils/FetchsDb.js";
import { setClients, deleteClient } from "../../store/slices/index.js";
import BtnNewForAbm from "../../commons/Buttons/BtnNewForAbm.jsx";

export default function ClientOrSu() {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [select, setSelect] = useState([]);
  const [input, setInput] = useState({});

  const handleSelect = (e) => {
    setInput(e);
  };

  const getClients = async () => {
    const clientsArr = await FetchsDb.fetchGet("/clients");

    const optionsClientsArr = clientsArr.map((element) => {
      return {
        label: `${element.name}`,
        value: element,
      };
    });
    dispatch(setClients(optionsClientsArr));
  };

  useEffect(() => {
    if (!clients.length) {
      getClients();
    }
  }, [clients]);

  const handleDelete = () => {
    Axios.put(`/clients/delete/${input.value.id}`);
    dispatch(deleteClient(input));
    setInput({});
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      {!select ? null : (
        <DropDownSelect
          defVal={input}
          options={clients}
          handleSelect={handleSelect}
        />
      )}

      <DynamicTable object={Array(input.value)} handleDelete={handleDelete} />

      <BtnNewForAbm />
      <ClientModal client={input} setState={setInput} />
      <ClientModalNew />
    </Container>
  );
}
