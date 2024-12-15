const URL = "http://127.0.0.1:3000/api/v1/appointment";

export async function bookAppointment(doctorId, patientId, date) {
  try {
    // Create the request payload
    const payload = {
      doctorId,
      patientId,
      date,
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
