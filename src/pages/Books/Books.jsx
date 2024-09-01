import Table from "../../components/Table/table";
import { useState, useCallback, useEffect } from "react";
import Button from "../../components/Button/button";
import SearchIcon from "../../assets/icons/magnifying-glass.png";
import LeftPageIcon from "../../assets/icons/LeftPage.png";
import RightPageIcon from "../../assets/icons/Right-Page.png";
import EditIcon from "../../assets/icons/EditIcom.png";

import AdminHOC from "../../hoc/adminHOC";
import Modal from "../../components/modal/modal";
import Dynamicform from "../../components/forms/dynamicform";
import DeleteIcon from "../../assets/icons/DeleteIcon.png";
import {
  fetchBooks,
  createBook,
  deleteBook,
  updateBook,
} from "../../api/services/bookApi";
import { fetchAllCategories, getCategoryByName } from "../../api/services/categoryApi";
import Tooltip from "../../components/tooltip/toolTip";

import "./Books.css";
import IssuanceForm from "../../components/forms/issuanceform";
import { createIssuance } from "../../api/services/issuancesApi";

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingBook, setEditingBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isIssuanceModalOpen, setIsIssuanceModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

 


  const debounceSearch = useCallback(
    debounce((newSearchTerm) => {
      loadBooks(newSearchTerm); // Fetch books whenever search term changes
    }, 1000), // 300ms delay
    []
  );

  useEffect(() => {
    loadBooks();
    fetchCategories();
  }, [currentPage]);

  const loadBooks = async (search = "") => {
    try {
      const data = await fetchBooks(currentPage, 10, search);

     

      const startIndex = currentPage * data.size;
      const transformedBooks = data.content.map((book, index) => ({
        ...book,
        displayId: startIndex + index + 1,
        categoryName: book.category.name,
      }));
      setBooks(transformedBooks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load books:", error);
    }
  };

const fetchCategories = async () => {
    try {
      const categoryList = await fetchAllCategories(); // Replace this with your API function to fetch categories
      setCategories(categoryList);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

 

  const handleAddBook = async (newBook) => {

    console.log(newBook);

    if (
      newBook.title &&
      newBook.author &&
      newBook.categoryId &&
      newBook.quantity
    ) {

      
  
    
        const bookToCreate = {
          title: newBook.title,
          author: newBook.author,
          categoryId : newBook.categoryId,
          quantity: parseInt(newBook.quantity),
        };
    

        console.log(bookToCreate);
         try {
          if(editingBook) {
            await updateBook(editingBook.category.id, {...bookToCreate})
            setEditingBook(null);
          }else {
            await createBook(bookToCreate);
          }
         
   
      
     
        loadBooks(); // Reload books after adding a new one
        handleCloseModal();
      } catch (error) {
        console.error("Failed to add book:", error);
      }
    }
  };

  const handleDelete = async (rowData) => {
    const id = rowData.id;

    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to delete the book", error);
    }
  };

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debounceSearch(newSearchTerm); // Call the debounced search function
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOpenModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { header: "ID", accessor: "id", width: "5%" },
    { header: "Title", accessor: "title", width: "10%" },
    { header: "Author", accessor: "author", width: "10%" },
    { header: "Category", accessor: "categoryName", width: "5%" },
    { header: "Quantity", accessor: "quantity", width: "0%" },

    {
      header: "Options",
      render: (rowData) => (
        <div className="button-container">
          <Button
            text="Issue"
            className="action-button issue-button"
            onClick={() => handleIssue(rowData)}
          />
        </div>
      ),
      width: "2%",
    },
    {
      header: "Actions",
      render: (rowData) => renderActions(rowData),
      width: "1%",
    },
    
  ];

  const handleIssuanceSubmit = async (issuanceDetails) => {
    // Call your API to submit issuance details
    try {
       const response = await createIssuance(issuanceDetails);

       console.log(response);

      if (response === "Issuance already exists for this user and book.") {
          alert(response);  // Display message from backend
      } else {
          alert("Issuance created successfully.");
      }
  } catch (error) {
      console.error("Failed to create issuance:", error);
      alert("Failed to create issuance.");
  }
  };

  const handleIssue = (rowData)=> {

    setSelectedBook(rowData);
    setIsIssuanceModalOpen(true);


    
  }



  const handleEdit = (rowData) => {

   
    setEditingBook(rowData)
    setIsModalOpen(true);
     
  };

  const renderActions = (rowData) => (
   
    <div className="actionicons">
      
      <Tooltip message="Edit">
        <img
          src={EditIcon}
          alt="Edit"
          className="action-icon"
          
          onClick={() => handleEdit(rowData)}
          
        />
      </Tooltip>

      <Tooltip message="Delete">
        <img
          src={DeleteIcon}
          alt="Delete"
          className="action-icon"
          onClick={() => handleDelete(rowData)}
        />
      </Tooltip>
    </div>

  
  );

  return (
    <>
      <div className="center-div">
        <div className="upper-div">
          <div className="upper-div-text">
            <span>Books</span>
          </div>

          <div className="upper-div-btns">
            <div className="upper-search-div">
              <div className="search-input-div">
                <div className="search-icon-div">
                  <img src={SearchIcon} alt="" />
                </div>

                <div className="search-categories-div">
                  <input
                    type="text"
                    placeholder="Search Books..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="add-categories-div">
              <Button
                text="Add Book"
                className="add-categories-btn"
                onClick={handleOpenModal}
              />
            </div>
          </div>
        </div>

        <div className="lower-div">
          <Table data={books} columns={columns} />
        </div>
        <div className="pagination-div">
          <div className="left-pagination">
            <img
              src={LeftPageIcon}
              alt=""
              onClick={() => handlePageChange("prev")}
            />
          </div>
          <div className="pagination-number">
            <span>
              {currentPage + 1} of {totalPages}
            </span>
          </div>
          <div className="right-pagination">
            <img
              src={RightPageIcon}
              alt=""
              onClick={() => handlePageChange("next")}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Dynamicform
           heading={editingBook ? "Edit Book" : "Add Book"}
          fields={[
            {
              name: "title",
              type: "text",
              placeholder: "Book Title",
              required: true,
            
            },
            {
              name: "author",
              type: "text",
              placeholder: "Author Name",
              required: true,
             
            },
            {
              name: "categoryId", // Change to categoryId to match the dropdown selection
              type: "select", // Use "select" type for a dropdown
              placeholder: "Select Book Category",
              required: true,
              options: categories.map((category) => ({
                value: category.id,
                label: category.name,
              })),
            },
            {
              name: "quantity",
              type: "number",
              placeholder: "Enter Quantity",
              required: true,
            },
          ]}
          onSubmit={handleAddBook}
          isEditMode={!!editingBook}
        />
      </Modal>


      <Modal isOpen={isIssuanceModalOpen} onClose={() => setIsIssuanceModalOpen(false)}>
        <IssuanceForm
          onSubmit={handleIssuanceSubmit}
          selectedBook={selectedBook}
          onClose={() => setIsIssuanceModalOpen(false)}
        />
      </Modal>


  

    </>
  );
};

export default AdminHOC(Books);