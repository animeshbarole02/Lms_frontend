// Import centralized API methods
import { get, post, del, patch } from "../apiClient";

// Fetch users with pagination and search
export const fetchUsers = async (page = 0, size = 7, searchTerm = "") => {
  try {
    return await get("/api/v1/users/list", {
      page,
      size,
      search: encodeURIComponent(searchTerm),
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

// Add a new user
export const addUser = async (newUser) => {
  try {
    await post("/api/v1/users/register", newUser);
    console.log("User added successfully");
  } catch (error) {
    console.error("Error in addUser function:", error);
    throw error;
  }
};

export const fetchUserCount = async () => {
  try {
    return await get("/api/v1/users/count");
  } catch (error) {
    console.error("Failed to fetch user count:", error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    await del(`/api/v1/users/delete/${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};

// Find user by mobile number
export const findUserByMobile = async (number) => {
  try {
    return await get(`/api/v1/users/number/${number}`);
  } catch (error) {
    console.error("Failed to get the user details:", error);
    throw error;
  }
};

// Update user by ID
export const updateUser = async (userId, updatedUser) => {
  try {
    return await patch(`/api/v1/users/update/${userId}`, updatedUser);
  } catch (error) {
    console.error("Error in updateUser function:", error);
    throw error;
  }
};
