const URL = "http://127.0.0.1:3000/api/v1/";

export async function getAllDoctor({ filter, sortBy }) {
  try {
    let query = `${URL}doctor/getAll/?`;
    if (filter) {
      query = `${query}${filter.field}=${filter.value}&`;
    }
    if (sortBy) {
      query = `${query}sort=${sortBy.field}&order=${sortBy.direction}&`;
    }
    const response = await fetch(query);
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
