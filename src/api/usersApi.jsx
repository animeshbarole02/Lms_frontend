const BASE_URL = "http://localhost:8080/api/v1/users"

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};


export const fetchUsers =  async (page =0,size = 7,searchTerm = "") => {
     try {
        const response =  await fetch(
            `${BASE_URL}/list?page=${page}&size=${size}&search=${encodeURIComponent(
                searchTerm
            )}`,
            {
                method : "GET",
                headers : {
                    ...getAuthHeaders(),
                },
            }
        );

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);

        }

        const data  =  await response.json();
        return data;

     }catch(error) {
        console.log("Failed to fetch Users",error);
         throw error;
     }
}

export const addUser = async (newUser)=>{
    try {
        const response =  await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(newUser),

        });

        console.log("Response Recived:",response);

        if (!response.ok) {
            throw new Error(`Failed to add User: ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error in addUser function:", error);
          throw error;
        }
}

export const deleteUser = async (id) => {
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
}

