import { useState } from "react";
import { extractDate, extractTime } from "../utils/helper";
import Table from "./Table";
import ShowPatientDetail from "./ShowPatientDetail";

function ReportDisplay({ report }) {
  const { date, doctorName, issues, medicalPrescription, suggestions } = report;
  //   console.log(issues);

  const [open, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  if (open) return <ShowPatientDetail report={report} onClose={handleClose} />;
  return (
    <Table.Row>
      <div>{extractDate(date)}</div>
      <div>{extractTime(date)}</div>
      <div>{doctorName}</div>
      <button
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
        onClick={() => handleOpen()}
      >
        view full detail
      </button>
    </Table.Row>
  );
}

export default ReportDisplay;
