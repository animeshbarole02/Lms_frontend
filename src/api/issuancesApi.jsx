const BASE_URL = "http://localhost:8080/api/v1/issuances";// Replace with your backend URL


const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };
// Fetch issuances with pagination and optional search
export const fetchIssuances = async (page=0, size=10, searchTerm = "") => {
  try {


    const url = `${BASE_URL}/list?page=${page}&size=${size}&search=${searchTerm}`;  // Correct
;
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
          ...getAuthHeaders(), 
        
        },
      });
  

      if (!response.ok) {
        throw new Error(`Error fetching issuances: HTTP status ${response.status}`);
      }
  
     
      const data = await response.json();
  

      return data;
    } catch (error) {
      console.error("Error fetching issuances:", error);
      throw error; 
    }
  };

// Create a new issuance






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
  