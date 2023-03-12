import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { setUiOpenNew } from "../../store/slices/index.js";

export default function BtnNewForAbm() {
  const dispatch = useDispatch();
  const handleNew = () => {
    dispatch(setUiOpenNew(true));
  };

  return (
    <div className="text-center">
      <Button onClick={handleNew}>Crear nuevo</Button>
    </div>
  );
}
