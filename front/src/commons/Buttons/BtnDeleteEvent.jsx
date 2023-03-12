import React from "react";
import { Button } from "react-bootstrap";

import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { eventDeleted, setUiOpen } from "../../store/slices";
import { Axios } from "../../utils/AxiosWithCredentials";
import Swal from "sweetalert2";

export default function BtnDeleteEvent() {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.calendar);

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Estimado usuario..",
      text: "Esta seguro que desea borrar el evento?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      try {
        await Axios.delete("/events", { data: activeEvent });
        dispatch(eventDeleted(activeEvent));
        dispatch(setUiOpen(false));
      } catch (err) {
        console.error(err);
      }
    } else {
      dispatch(setUiOpen(true));
    }
  };

  return (
    <Button className={`btn btn-danger`} onClick={handleDelete}>
      <BiTrash size={"1.1em"} />
      <span>Borrar </span>
    </Button>
  );
}
