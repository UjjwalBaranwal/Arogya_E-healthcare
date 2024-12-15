const URL = "http://127.0.0.1:3000/api/v1/report";

export async function postMedicalReport(data) {
  try {
    const response = await fetch(`${URL}/createReport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post medical report");
    }
    const responseData = await response.json();
    console.log("report : ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error Posting Report", error.message);
    return error;
  }
}
