// Utility function to format date and time to 'YYYY-MM-DDTHH:mm:ss'
export const formatDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure month is 2 digits
  const day = String(d.getDate()).padStart(2, '0'); // Ensure day is 2 digits
  const hours = String(d.getHours()).padStart(2, '0'); // Ensure hours are 2 digits
  const minutes = String(d.getMinutes()).padStart(2, '0'); // Ensure minutes are 2 digits
  const seconds = String(d.getSeconds()).padStart(2, '0'); // Ensure seconds are 2 digits

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};