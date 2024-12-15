const URL = "http://127.0.0.1:3000/api/v1/appointment";
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
