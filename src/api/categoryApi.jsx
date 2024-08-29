const BASE_URL = "http://localhost:8080/api/v1/categories";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchCategories = async (page = 0, size = 8, searchTerm = "") => {
  try {
    const response = await fetch(
      `${BASE_URL}/list?page=${page}&size=${size}&search=${encodeURIComponent(
        searchTerm
      )}`,
      {
        method: "GET",
        headers: {
          ...getAuthHeaders(),
          
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to Fetch Categories :", error);
    throw error;
  }
};

export const addCategory = async (newCategory) => {
  try {
    const response = await fetch(`${BASE_URL}/save`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify([newCategory]),
    });

    console.log("Response received:", response);

    if (!response.ok) {
      throw new Error(`Failed to add category: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error in addCategory function:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error;
  }
};


export const getCategoryByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch category with category Id: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Failed to find category By Name:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, updatedCategory) => {
  try {
    const response = await fetch(`${BASE_URL}/update/${categoryId}`, {
      method: "PUT",
      headers : getAuthHeaders(),
      body: JSON.stringify(updatedCategory),
    });
    
    
    if (!response.ok) {
      throw new Error("Failed to update category");
    }

    return true;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};