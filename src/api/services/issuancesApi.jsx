
import { get, post, del, patch } from "../apiClient";


const BASE_URL = "/api/v1/issuances"; 


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


export const createIssuance = async (issuance) => {
  try {

    if (!issuance.userId || !issuance.bookId) {
      throw new Error("User ID and Book ID are required");
    }

    const response = await post(`${BASE_URL}/save`, issuance);

    console.log("Response received:", response);

    return response; 
  } catch (error) {
    console.error("Error in createIssuance function:", error);
    throw error;
  }
};


export const updateIssuance = async (issuanceId, updatedData) => {
  try {
    const response = await patch(
      `${BASE_URL}/update/${issuanceId}`,
      updatedData
    );

    console.log("Response received:", response);

    return response; 
  } catch (error) {
    console.error("Error updating issuance:", error);
    throw error;
  }
};


export const deleteIssuance = async (issuanceId) => {
  try {
    await del(`${BASE_URL}/${issuanceId}`);
    return true;
  } catch (error) {
    console.error("Error deleting issuance:", error);
    throw error;
  }
};


export const fetchIssuanceCount = async () => {
  try {
    const response = await get(`${BASE_URL}/count`);
    return response;
  } catch (error) {
    console.error("Error fetching issuance count:", error);
    throw error;
  }
};
