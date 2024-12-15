const URL = "http://127.0.0.1:3000/api/v1/appointment";

export async function bookAppointment(
  doctorId,
  patientId,
  date,
  patientName,
  isPriority
) {
  try {
    // Create the request payload
    const payload = {
      doctorId,
      patientId,
      date,
      patientName,
      isPriority,
    };
    console.log("payload ", payload);

    // Send POST request to the API
    const response = await fetch(`${URL}/bookAppointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to book appointment");
    }

    // Parse the response data
    const responseData = await response.json();

    // Log or return the response
    console.log("Appointment booked successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error booking appointment:", error.message);
    throw error;
  }
}

export async function appointmentByDoctorID(id) {
  try {
    const res = await fetch(`${URL}/getAppointmentByDoctorID/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch appointment. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    throw error;
  }
}
