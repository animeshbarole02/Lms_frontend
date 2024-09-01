import { useState } from "react"
import { findBookByTitle } from "../../api/services/bookApi";
import "./issuanceform.css";
import Button from "../Button/button";


const UserIssuanceform = ({onSubmit,selectedUser,onClose}) => {

     const [bookTitle , setBookTitle] = useState("");
     const [bookId , setBookId] = useState(null);
     const [issuanceType, setIssuanceType] = useState("Home");
     const [returnDate, setReturnDate] = useState("");
     const [returnTime, setReturnTime] = useState("");
     const [issuedAt] = useState(new Date().toISOString().slice(0, 19));
     const [expectedReturn, setExpectedReturn] = useState("");
     const [errorMessage, setErrorMessage] = useState(""); 
     

     const fetchBookDetails =  async(bookTitle) => {
        try {
            const bookDetails = await findBookByTitle(bookTitle);
            setBookId(bookDetails.id); // Update userId state with retrieved user ID
            setErrorMessage("");

        }catch(error) {
            console.error("Failed to fetch Books details:", error);
            setBookId(null); // Clear userId if not found
            setErrorMessage("User not found. Please register first.");
        }
     }


     const handleBookTitleChange = (e) => {
        const bookTitle = e.target.value;
        setBookTitle(bookTitle);
        fetchBookDetails(bookTitle);
     }


     const handleSubmit = (event) => 
     {
        event.preventDefault();

        if (!bookId) {
            setErrorMessage("Please enter a valid Title and try again.");
            return;
          }

          let returnedAt = null;
          if(issuanceType==="Home" && returnDate) {
            returnedAt = new Date(`${returnDate}T23:59:59`).toISOString().replace('Z', ''); 
          
        } else if (issuanceType === "Library" && returnTime) {
            const currentDate = new Date().toISOString().slice(0, 19); // Get the current date in YYYY-MM-DD format
            returnedAt = new Date(`${currentDate}T${returnTime}`).toISOString().replace('Z', ''); // Remove 'Z' if needed
          }

          
     const formatDateTime = (date) => {
        const d = new Date(date);
        return d.toISOString().slice(0, 19); // Slice to get 'YYYY-MM-DDTHH:mm:ss' format
      };


      const issuanceDetails = {
        userId :selectedUser.id,
        bookId,
        issuedAt,
        returnedAt,
        expectedReturn: formatDateTime(expectedReturn),
        status: "Issued", // Set the status according to your logic
        issuanceType,
         
      }


      onSubmit(issuanceDetails);
      onClose();


         
     }

  return (
    <div className="issuance-form">

        <h2>Issue User <br /><span>{selectedUser.name}</span></h2>
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Book Title</label>
                <input 
                type="text"
                value={bookTitle}
                onChange={handleBookTitleChange}
                placeholder="Enter Book Title"

                 />
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            <div className="form-group">
                <label>Issuance Type</label>
                <select
                value={issuanceType}
                onChange={(e)=>setIssuanceType(e.target.value)}
                >
                    <option value="Home">Home</option>
                    <option value="Library">Library</option>

                </select>
            </div>

            <div className="form-group">
             <label>Expected Return</label>
          <input
            type="datetime-local"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            required
          />
        </div>

        
        <Button
        className="submit-button"
        text  ="Issue Book"
         />

        </form>

    </div>
  )
}

export default UserIssuanceform