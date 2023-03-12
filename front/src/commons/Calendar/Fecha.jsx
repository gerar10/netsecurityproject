import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

function Fecha({ handleSelect }) {
  const [date, setDate] = useState();
  const startDate = new Date();
  const handleDateSelect = (e) => {
    handleSelect(e);
    setDate(e);
  };

  return (
    <div>
      <DatePicker
        minDate={startDate}
        className="form-control"
        selected={date}
        onChange={handleDateSelect}
        placeholderText="Elija una fecha.."
        isClearable
        closeOnScroll={true}
        todayButton="Fecha Actual"
        shouldCloseOnSelect
        required={true}
        // onSelect={(date) => setDate(date)}
      />
    </div>
  );
}

export default Fecha;
