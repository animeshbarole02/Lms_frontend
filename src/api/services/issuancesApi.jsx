// Import centralized API methods
import { get, post, del, patch } from "../apiClient";

// Base URL for API requests
const BASE_URL = "/api/v1/issuances"; // Adjust if needed

// Fetch issuances with pagination and optional search
export const fetchIssuances = async (page = 0, size = 10, searchTerm = "") => {
  try {
    return await get(`${BASE_URL}/list`, {
      page,
      size,
      search: encodeURIComponent(searchTerm),
    });
  } catch (error) {
    console.error("Error fetching issuances:", error);
    throw error;
  }
};

// Create a new issuance
export const createIssuance = async (issuance) => {
  try {
    // Ensure that issuance object has correct user and book data
    if (!issuance.userId || !issuance.bookId) {
      throw new Error("User ID and Book ID are required");
    }

    const response = await post(`${BASE_URL}/save`, issuance);

    console.log("Response received:", response);

    return response; // Return the response data
  } catch (error) {
    console.error("Error in createIssuance function:", error);
    throw error;
  }
};

// Update an issuance by ID (Assuming `updateIssuance` is needed)
export const updateIssuance = async (issuanceId, updatedData) => {
  try {
    const response = await patch(
      `${BASE_URL}/update/${issuanceId}`,
      updatedData
    );

    console.log("Response received:", response);

    return response; // Return the response data
  } catch (error) {
    console.error("Error updating issuance:", error);
    throw error;
  }
};

// Delete an issuance by ID
export const deleteIssuance = async (issuanceId) => {
  try {
    await del(`${BASE_URL}/${issuanceId}`);
    return true;
  } catch (error) {
    console.error("Error deleting issuance:", error);
    throw error;
  }
};
