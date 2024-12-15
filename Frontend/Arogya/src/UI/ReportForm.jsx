import { useState } from "react";
import { useSelector } from "react-redux";
import { postMedicalReport } from "../../services/apiPostMedicalReport";
import { toast } from "react-hot-toast";

function MedicalReportForm({ className, patientId, patientName, handleOpen }) {
  const { user } = useSelector((state) => state.auth);
  const doctorId = user._id;

  const [formData, setFormData] = useState({
    issues: [{ description: "", severity: "mild", dateReported: "" }],
    suggestions: [{ advice: "", recommendedBy: "", followUpDate: "" }],
    medicalPrescription: [
      {
        medicineDetails: { name: "", dosage: "", frequency: "", duration: "" },
        form: "",
        instructions: "",
        prescribedBy: "",
        datePrescribed: "",
      },
    ],
    patientId: patientId,
    doctorId: doctorId,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name.includes("issues") || name.includes("suggestions")) {
      const [arrayName, index, key] = name.split(".");
      const updatedArray = [...formData[arrayName]];
      updatedArray[index][key] = value;
      setFormData({ ...formData, [arrayName]: updatedArray });
    } else if (name.includes("medicalPrescription")) {
      // Split name to get the field and index for medicalPrescription
      const [arrayName, index, key, subKey] = name.split(".");
      const updatedArray = [...formData[arrayName]];

      // Check if it's medicineDetails and handle nested properties
      if (subKey) {
        updatedArray[index].medicineDetails[subKey] = value;
      } else {
        updatedArray[index][key] = value;
      }

      setFormData({ ...formData, [arrayName]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddIssue = () => {
    setFormData((prevData) => ({
      ...prevData,
      issues: [
        ...prevData.issues,
        { description: "", severity: "mild", dateReported: "" },
      ],
    }));
  };

  const handleAddSuggestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      suggestions: [
        ...prevData.suggestions,
        { advice: "", recommendedBy: "", followUpDate: "" },
      ],
    }));
  };

  const handleAddPrescription = () => {
    setFormData((prevData) => ({
      ...prevData,
      medicalPrescription: [
        ...prevData.medicalPrescription,
        {
          medicineDetails: {
            name: "",
            dosage: "",
            frequency: "",
            duration: "",
          },
          form: "",
          instructions: "",
          prescribedBy: "",
          datePrescribed: "",
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      postMedicalReport(formData);

      toast.success("Report is Created");
      handleOpen();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Patient and Doctor IDs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="block text-gray-700">Patient Name</div>
          <div>{patientName}</div>
        </div>
      </div>

      {/* Issues */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Issues</h3>
        {formData.issues.map((issue, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div className="mb-2">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                name={`issues.${index}.description`}
                value={issue.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Severity</label>
              <select
                name={`issues.${index}.severity`}
                value={issue.severity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <div className="mb-2 col-span-2">
              <label className="block text-gray-700">Date Reported</label>
              <input
                type="date"
                name={`issues.${index}.dateReported`}
                value={issue.dateReported}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIssue}
          className="text-blue-500"
        >
          Add Issue
        </button>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
        {formData.suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div className="mb-2">
              <label className="block text-gray-700">Advice</label>
              <input
                type="text"
                name={`suggestions.${index}.advice`}
                value={suggestion.advice}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Recommended By</label>
              <input
                type="text"
                name={`suggestions.${index}.recommendedBy`}
                value={suggestion.recommendedBy}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2 col-span-2">
              <label className="block text-gray-700">Follow Up Date</label>
              <input
                type="date"
                name={`suggestions.${index}.followUpDate`}
                value={suggestion.followUpDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSuggestion}
          className="text-blue-500"
        >
          Add Suggestion
        </button>
      </div>

      {/* Medical Prescription */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Medical Prescription</h3>
        {formData.medicalPrescription.map((prescription, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div className="mb-2">
              <label className="block text-gray-700">Medicine Name</label>
              <input
                type="text"
                name={`medicalPrescription.${index}.medicineDetails.name`}
                value={prescription.medicineDetails.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Dosage</label>
              <input
                type="text"
                name={`medicalPrescription.${index}.medicineDetails.dosage`}
                value={prescription.medicineDetails.dosage}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Frequency</label>
              <input
                type="text"
                name={`medicalPrescription.${index}.medicineDetails.frequency`}
                value={prescription.medicineDetails.frequency}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Duration</label>
              <input
                type="text"
                name={`medicalPrescription.${index}.medicineDetails.duration`}
                value={prescription.medicineDetails.duration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Form</label>
              <input
                type="text"
                name={`medicalPrescription.${index}.form`}
                value={prescription.form}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Instructions</label>
              <input
                type="text"
                name={`medicalPrescription.${index}.instructions`}
                value={prescription.instructions}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Prescribed By</label>
              <input
                type="text"
                name={`medicalPrescription.${index}.prescribedBy`}
                value={prescription.prescribedBy}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Date Prescribed</label>
              <input
                type="date"
                name={`medicalPrescription.${index}.datePrescribed`}
                value={prescription.datePrescribed}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPrescription}
          className="text-blue-500"
        >
          Add Prescription
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 mt-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}

export default MedicalReportForm;
