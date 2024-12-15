import Modal from "./model";

function ShowPatientDetail({ report, onClose }) {
  const { date, doctorName, issues, medicalPrescription, suggestions } = report;

  return (
    <Modal handleClose={onClose}>
      <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Patient Report Details
        </h2>

        {/* Issues Section */}
        <div className="mb-2">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Issues</h3>
          <ul className="space-y-2">
            {issues?.map((el, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-md border border-gray-200 flex justify-between"
              >
                <span className="font-medium text-gray-600">
                  {el.description}
                </span>
                <span className="text-sm text-gray-500">{el.severity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Medical Prescription Section */}
        <div className="mb-2">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Medical Prescription
          </h3>
          <ul className="space-y-3">
            {medicalPrescription?.map((el, index) => (
              <li
                key={index}
                className="p-4 bg-blue-50 rounded-md border-l-4 border-blue-400"
              >
                <p className="font-semibold text-gray-700">
                  Medicine:{" "}
                  <span className="text-blue-600">
                    {el.medicineDetails.name}
                  </span>
                </p>
                <p className="text-gray-600">
                  Dosage: {el.medicineDetails.dosage} | Duration:{" "}
                  {el.medicineDetails.duration}
                </p>
                <p className="text-gray-600">
                  Frequency: {el.medicineDetails.frequency}
                </p>
                <p className="text-gray-600">Instructions: {el.instructions}</p>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Suggestions
        </h2>

        {/* Issues Section */}
        <div className="mb-2">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Issues</h3>
          <ul className="space-y-2">
            {suggestions?.map((el, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-md border border-gray-200 flex justify-between"
              >
                <span className="font-medium text-gray-600">{el.advice}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default ShowPatientDetail;
