import { getAllDoctors } from "./queryPatient"; // Assuming this is a custom hook
import Spinner from "../../UI/Spinner";
import CardDoctor from "../../UI/CardDoctor";
import TableOperations from "./TableOperations";

function Dashboard() {
  // Using the custom hook `getAllDoctors` for fetching data
  const { isLoading, doctor, error } = getAllDoctors();
  console.log(doctor);

  // If loading, show the spinner
  if (isLoading) return <Spinner />;

  // If there's an error, show the spinner or error message
  if (error) return <div>Error: {error}</div>;
  // console.log(doctor.data.data);
  const doctorList = doctor?.data?.data || null;
  const length = doctor?.data?.length;
  console.log("doctor length", length);
  // Render doctor data
  return (
    <div className="flex flex-col">
      <TableOperations />
      {!length ? (
        <div className="m-4 p-4 border border-solid shadow-sm">
          No Doctor found
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 m-2">
          {doctorList.map((d) => (
            // <h1>this is docotr</h1> // Assuming `name` is the doctor's name
            <CardDoctor key={d._id} doctor={d} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
