// booksApi.js
import { get, post, put, del, patch } from "../apiClient";

const BASE_URL = "/api/v1/books";

// Function to fetch books with pagination and search
export const fetchBooks = async (page = 0, size = 7, searchTerm = "") => {
  try {
    // Using the get method from apiClient
    return await get(`${BASE_URL}/list`, { page, size, search: searchTerm });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error; 
  }
};


export const fetchTotalBookCount = async () => {
  try {
    return await get(`${BASE_URL}/count`);
  } catch (error) {
    console.error("Failed to fetch total book count:", error);
    throw error;
  }
};

// Function to add a new book
export const createBook = async (book) => {
  try {

    console.log(book);
    
    return await post(`${BASE_URL}/create`, [book]);
  } catch (error) {
    console.error("Failed to create book:", error);
    throw error; 
  }
};

// Function to delete a book by ID
export const deleteBook = async (id) => {
  try {
    
    return await del(`${BASE_URL}/delete/${id}`);
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw error;
  }
};

// Function to update a book by ID
export const updateBook = async (id, updatedBook) => {
  try {
    // Using the put method from apiClient
    return await patch(`${BASE_URL}/update/${id}`, updatedBook);
  } catch (error) {
    console.error("Failed to update book:", error);
    throw error; 
  }
};


export const findBookByTitle = async (title) => {
  try {
   
    return await get(`${BASE_URL}/getByTitle/${title}`);
  } catch (error) {
    console.error("Failed to get the book details:", error);
    throw error; 
  }
};
