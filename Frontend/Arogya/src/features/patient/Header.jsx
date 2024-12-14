import { useSelector } from "react-redux";
import PatientInfoBox from "../../UI/PatientInfoBox";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const { name, email, phoneNumber, role, gender, _id: patientID } = user;

  return (
    <div className="p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border border-gray-300 rounded-lg shadow-lg bg-white ">
      <h1 className="text-xl md:text-2xl font-bold text-center text-blue-600 mb-2 col-span-1 md:col-span-2">
        Patient Information
      </h1>
      <PatientInfoBox name="Name" value={name} />
      <PatientInfoBox name="Email" value={email} />
      <PatientInfoBox name="Phone Number" value={phoneNumber} />
      <PatientInfoBox name="Role" value={role} />
      <PatientInfoBox name="Gender" value={gender} />
      <PatientInfoBox name="Patient ID" value={patientID} />
    </div>
  );
}

export default Header;
