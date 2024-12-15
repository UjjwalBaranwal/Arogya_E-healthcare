// Function to extract the date from an ISO string
export function extractDate(isoString) {
  const dateObj = new Date(isoString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Returns formatted date: YYYY-MM-DD
}

// Function to extract the time from an ISO string
export function extractTime(isoString) {
  const dateObj = new Date(isoString);
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`; // Returns formatted time: HH:MM:SS
}
