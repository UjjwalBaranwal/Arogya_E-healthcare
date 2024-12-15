// import { useEffect, useState } from "react";
// import { appointmentByDoctorID } from "../../../services/apiAppointmentByDoctorID";
import { useSelector } from "react-redux";
import Spinner from "../../UI/Spinner";
import { getAllAppointment } from "./queryAppointment";
import Table from "../../UI/Table";
import AppointmentColumnDoctor from "../../UI/AppointmentColumnDoctor";
import Error from "../../UI/Error";
function Appointment() {
  // const [data, setData] = useState([]);
  // const [error, setError] = useState("");
  // const { user } = useSelector((state) => state.auth);
  // const id = user._id;
  // useEffect(() => {
  //   async function fetchAppointment() {
  //     try {
  //       if (!id) return;
  //       const res = await appointmentByDoctorID(id);
  //       setData(res);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }
  //   fetchAppointment();
  // }, []);
  // console.log(data.data[0].appointmentList);
  const { user } = useSelector((state) => state.auth);
  const id = user._id;
  const { isLoading, appointment, error } = getAllAppointment(id);
  if (isLoading) return <Spinner />;
  console.log(appointment);
  const data = appointment.data[0].appointmentList;
  console.log(data);
  if (error) return <Error message={error?.message} />;
  return (
    <Table columns="1fr 1fr 1fr 1fr 0.4fr">
      <Table.Header>
        <div>Date</div>
        <div>is_Priority</div>
        <div>moneyPaid</div>
        <div>patient Name</div>
      </Table.Header>
      <Table.Body
        data={data}
        render={(el, key) => <AppointmentColumnDoctor data={el} key={key} />}
      ></Table.Body>
    </Table>
  );
}

export default Appointment;
