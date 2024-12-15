const URL = "http://127.0.0.1:3000/api/v1/report";
export async function getMedicalReport(id) {
  try {
    const res = await fetch(`${URL}/getReportforPatient/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch reports. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error Fetching the report : ", error.message);
    throw error;
  }
}
