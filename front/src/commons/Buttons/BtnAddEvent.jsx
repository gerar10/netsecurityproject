import React from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import style from "../../assets/styles/commons/BtnAddEvent.module.scss";

import { setUiOpen } from "../../store/slices";

export const BtnAddEvent = () => {
  const dispatch = useDispatch();

  const handleClickBtnEvent = () => {
    dispatch(setUiOpen(true));
  };
  return (
    <button
      className={`btn btn-primary ${style["btnAddEvent"]}`}
      onClick={handleClickBtnEvent}
    >
      <FaPlus />
    </button>
  );
};
