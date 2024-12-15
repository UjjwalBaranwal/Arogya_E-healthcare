import { useState } from "react";
import Table from "./Table";
import ReportForm from "./ReportForm";

function AppointmentColumnDoctor({ data }) {
  console.log(data);
  const { date, totalPatient, patients } = data;
  console.log(date, totalPatient, patients);
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen((p) => !p);
  }

  //   if (open) return <ReportForm />;
  return patients.map((el, key) => (
    <Table.Row key={key}>
      <div>{date.split("T")[0]}</div>
      <div>{el.isPriority ? "true" : "false"}</div>
      <div>{el.moneyPaid ? "true" : "false"}</div>
      <div>{el.patientName}</div>
      <button
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
        onClick={() => handleOpen()}
      >
        {open ? "Close" : "Asses"}
      </button>
      {open && (
        <ReportForm
          className="col-start-1 col-end-[-1]"
          patientId={el.patientId}
          patientName={el.patientName}
          handleOpen={handleOpen}
        />
      )}
      {/* {console.log("patientId : ", el.patientId)} */}
    </Table.Row>
  ));
}

export default AppointmentColumnDoctor;
