const BASE_URL = "http://localhost:8080/api/v1/issuances"; // Replace with your backend URL

// Fetch issuances with pagination and optional search
export const fetchIssuances = async (page, size, search = "") => {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append("page", page);
    url.searchParams.append("size", size);
    if (search) url.searchParams.append("search", search);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching issuances: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Assuming your backend returns a data object with content, size, and totalPages
  } catch (error) {
    console.error("Error fetching issuances:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// Create a new issuance
export const createIssuance = async (issuanceData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issuanceData),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating issuance: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating issuance:", error);
      throw error;
    }
  };
  





// Delete an issuance by ID
// Update an issuance by ID
export const updateIssuance = async (issuanceId, updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/${issuanceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating issuance: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating issuance:", error);
      throw error;
    }
  };

  
  // Delete an issuance by ID
export const deleteIssuance = async (issuanceId) => {
    try {
      const response = await fetch(`${BASE_URL}/${issuanceId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting issuance: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting issuance:", error);
      throw error;
    }
  };
  