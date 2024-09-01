// categoriesApi.js
import { get, post, put, del } from "../apiClient";

const BASE_URL = "/api/v1/categories";

// Function to fetch categories with pagination and search
export const fetchCategories = async (page = 0, size = 8, searchTerm = "") => {
  try {
    
    return await get(`${BASE_URL}/list`, { page, size, search: searchTerm }); // Removed encodeURIComponent as apiClient.js will handle query params encoding
  } catch (error) {
    console.error("Failed to Fetch Categories :", error);
    throw error; // Re-throw to handle in component
  }
};


export const fetchCategoryCount= async () => {
  try {
    const count = await get(`${BASE_URL}/count`);
    return count;
  } catch (error) {
    console.error("Failed to fetch category count:", error);
    throw error; // Re-throw to handle in component
  }
};

// Function to add a new category
export const addCategory = async (newCategory) => {
  try {
    console.log([newCategory]);
 
    return await post(`${BASE_URL}/save`, [newCategory]);
  } catch (error) {
    console.error("Error in addCategory function:", error);
    throw error; // Re-throw to handle in component
  }
};

// Function to delete a category by ID
export const deleteCategory = async (id) => {
  try {
    
    return await del(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error; // Re-throw to handle in component
  }
};

// Function to get category by name
export const getCategoryByName = async (name) => {
  try {

    const data = await get(`${BASE_URL}/name/${name}`);
    return data.id; // Return the category ID
  } catch (error) {
    console.error("Failed to find category By Name:", error);
    throw error; // Re-throw to handle in component
  }
};

// Function to update a category
export const updateCategory = async (categoryId, updatedCategory) => {
  try {
    // Use put method from apiClient to update category
    return await put(`${BASE_URL}/update/${categoryId}`, updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error; // Re-throw to handle in component
  }
};

// Function to fetch all categories
export const fetchAllCategories = async () => {
  try {

    return await get(`${BASE_URL}/getAll`);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error; // Re-throw to handle in component
  }
};
