const URL = "http://127.0.0.1:3000/api/v1/";

export async function getAllDoctor() {
  try {
    const response = await fetch(`${URL}doctor/getAll`);
    const data = await response.json();

    if (!response.ok) {
      // Assuming the error message is in the response body
      throw new Error(data.message || "Failed to fetch doctors");
    }

    return { data }; // Return data in the expected structure
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Return error in the same structure as `data`
  }
}
