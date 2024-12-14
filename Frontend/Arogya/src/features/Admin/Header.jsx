import { useSelector } from "react-redux";
// import PatientInfoBox from "../../UI/PatientInfoBox";
import PatientInfoBox from "../../UI/PatientInfoBox";

function Header() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { name, email, role,  _id: adminID,} = user;
  return (
    <>
      <div className="p-4 grid grid-cols-2 grid-rows-2 capitalize gap-3 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 col-span-2">
          Admin Information
        </h1>
        <PatientInfoBox name="name" value={name} />
        <PatientInfoBox name="email" value={email} />
        <PatientInfoBox name="role" value={role} />
        <PatientInfoBox name="AdminID" value={adminID} />
      </div>
    </>
  );
}

export default Header;
