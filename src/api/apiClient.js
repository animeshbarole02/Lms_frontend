// Base URL for API requests
const BASE_URL = "http://localhost:8080"; // Adjust if needed

// Function to get authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Centralized function to handle HTTP responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text(); // Get error text for better debugging
    throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}. ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text(); // Handle non-JSON responses
};

// Function to make a GET request
export const get = async (url, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}${url}?${queryString}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

// Function to make a POST request
export const post = async (url, body = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// Function to make a PUT request
export const put = async (url, body = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// Function to make a PATCH request
export const patch = async (url, body = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
  
    return handleResponse(response);
  };

// Function to make a DELETE request
export const del = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  await handleResponse(response);
  return true;
};
