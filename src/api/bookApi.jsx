
// booksApi.js
const BASE_URL = "http://localhost:8080/api/v1/books";



const getAuthHeaders = () =>{
    const token =  localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    
};

// Function to fetch books with pagination and search
export const fetchBooks = async (page = 0, size = 7, searchTerm = "") => {
    try {
      const response = await fetch(`${BASE_URL}/list?page=${page}&size=${size}&search=${searchTerm}`, {
        method: "GET",
        headers: {
          ...getAuthHeaders(),
          "Cache-Control": "no-cache", // Prevents caching
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); 
 
      // Return the same structure as the original response but with transformed books
      return data;

      
      
    } catch (error) {
      console.error("Failed to fetch books:", error);
      throw error;
    }
  };

// Function to add a new book
export const createBook = async (book) => {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers:getAuthHeaders(),
      body:JSON.stringify([book]),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to create book:", error);
    throw error;
  }
};

// Function to delete a book by ID
export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw error;
  }
};

// Function to update a book by ID
export const updateBook = async (id, updatedBook) => {

  console.log(updatedBook);
  try {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
     
        ...getAuthHeaders(),
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
  } catch (error) {
    console.error("Failed to update book:", error);
    throw error;
  }
};

