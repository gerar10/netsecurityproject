import React, { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { format } from "date-fns";

import { Table } from "react-bootstrap";

const TableData = ({ reports, start, end }) => {
  const [period, setPeriod] = useState([]);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (end && start) {
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24) + 1);
      const starting = new Date(start);
      const days = [];
      days.push(format(starting, "dd/MM/yyyy"));
      for (let i = 0; i < diff - 1; i++) {
        days.push(
          format(starting.setDate(starting.getDate() + 1), "dd/MM/yyyy")
        );
      }
      setPeriod(days);
      // horas de un trabajador en el periodo (6 dias laborables / 1 franco)
      setHours(diff * 8 - Math.floor(diff / 7) * 8);
    }
  }, [start, end]);

  return (
    <div>
      <Table
        bordered
        hover
        responsive
        size="sm"
        className="text-center align-middle"
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Horas Periodo</th>
            <th>Horas Cubiertas</th>
            <th>Horas Por Cubrir</th>
            <th>Descarga</th>
          </tr>
        </thead>
        <tbody>
          {reports && period
            ? reports.map((report, i) => (
                <tr key={i}>
                  <td>
                    {report.name} {report.lastname || ""}
                  </td>
                  <td>{report.lastname ? hours : period.length * 24} hs</td>
                  <td>{report.events.length * 8} hs</td>
                  <td>
                    {report.lastname
                      ? hours - report.events.length * 8
                      : period.length * 24 - report.events.length * 8}
                    hs
                  </td>
                  <td>
                    <ReactHTMLTableToExcel
                      id="buttonExportExcel"
                      className="btn btn-success"
                      table={`tableReport${i}`}
                      filename={
                        report.lastname
                          ? `report_${report.name}_${report.lastname}_${
                              format(start, "yyyy-MM-dd") +
                              "_" +
                              format(end, "yyyy-MM-dd")
                            }`
                          : `report_${report.name}_${
                              format(start, "yyyy-MM-dd") +
                              "_" +
                              format(end, "yyyy-MM-dd")
                            }`
                      }
                      sheet="table"
                      buttonText="Export"
                    />
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
      <div style={{ display: "none" }}>
        {reports && period
          ? reports.map((report, i) => (
              <Table id={`tableReport${i}`} key={i}>
                <thead>
                  <tr>
                    {report.lastname ? <th>Nombre</th> : <th>{report.name}</th>}
                    {period.map((date) => (
                      <th key={date}>{date}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.lastname ? (
                    <tr>
                      <td>
                        {report.name} {report.lastname || ""}
                      </td>
                      {report.events.map((event, i) =>
                        event.date === period[i] ? (
                          <td key={event.date}>8:00</td>
                        ) : (
                          <td></td>
                        )
                      )}
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td>Mañana</td>
                      </tr>
                      <tr>
                        <td>Tarde</td>
                      </tr>
                      <tr>
                        <td>Noche</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            ))
          : ""}
      </div>
    </div>
  );
};

export default TableData;
