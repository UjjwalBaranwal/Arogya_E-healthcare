import { useSelector } from "react-redux";
import Modal from "./model";
import { useState } from "react";
import { bookAppointment } from "../../services/apiBookAppointment";
import { toast } from "react-hot-toast";
function BookAppointment({
  doctorId,
  handleClose,
  name: doctorName,
  consultationFee: fee,
}) {
  const { user } = useSelector((state) => state.auth);
  const { _id: patientID, name: patientName } = user;
  const [date, setDate] = useState("");

  console.log(date); // Debugging date value
  async function handleBookAppointment() {
    try {
      // Await the API call to book the appointment
      const { responseData, error } = await bookAppointment(
        doctorId,
        patientID,
        date
      );

      // Check for errors and handle them
      if (error) {
        console.error("Error while booking appointment:", error);
        return;
      }

      // Log success message and response data
      console.log("Appointment successfully booked!");
      toast.success("Appointment is booked");
      handleClose();
      console.log(responseData);
    } catch (err) {
      // Handle unexpected errors (e.g., network or runtime errors)
      console.error("An unexpected error occurred:", err.message);
      toast.error(err.message);
    }
  }
  return (
    <Modal handleClose={handleClose}>
      <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Book an Appointment
        </h2>

        {/* Patient Name */}
        <div className="grid grid-cols-2 items-center mb-2">
          <span className="text-gray-600 font-medium">Patient Name:</span>
          <span className="text-gray-800">{patientName}</span>
        </div>

        {/* Doctor Name */}
        <div className="grid grid-cols-2 items-center mb-2">
          <span className="text-gray-600 font-medium">Doctor Name:</span>
          <span className="text-gray-800">{doctorName}</span>
        </div>

        {/* Appointment Date */}
        <div className="grid grid-cols-2 items-center mb-2">
          <label
            htmlFor="appointment-date"
            className="text-gray-600 font-medium"
          >
            Appointment Date:
          </label>
          <input
            id="appointment-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded-md text-gray-700"
          />
        </div>

        {/* Fees */}
        <div className="grid grid-cols-2 items-center mb-4">
          <span className="text-gray-600 font-medium">Fees to be paid:</span>
          <span className="text-gray-800 font-semibold">₹ {fee}</span>
        </div>

        {/* Book Appointment Button */}
        <button
          onClick={() => handleBookAppointment()} // Replace with actual logic
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Book Appointment
        </button>
      </div>
    </Modal>
  );
}

export default BookAppointment;
