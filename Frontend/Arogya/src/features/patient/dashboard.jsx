import { getAllDoctors } from "./queryPatient"; // Assuming this is a custom hook
import Spinner from "../../../commonUI/Spinner";
import CardDoctor from "../../../commonUI/CardDoctor";

function Dashboard() {
  // Using the custom hook `getAllDoctors` for fetching data
  const { isLoading, doctor, error } = getAllDoctors();

  // If loading, show the spinner
  if (isLoading) return <Spinner />;

  // If there's an error, show the spinner or error message
  if (error) return <div>Error: {error}</div>;
  console.log(doctor.data.data);
  const doctorList = doctor.data.data;
  // Render doctor data
  return (
    <div className="grid grid-cols-2 gap-2 m-2">
      {doctorList.map((d) => (
        // <h1>this is docotr</h1> // Assuming `name` is the doctor's name
        <CardDoctor key={d._id} doctor={d} />
      ))}
    </div>
  );
}

export default Dashboard;
