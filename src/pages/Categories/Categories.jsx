import "./Categories.css";

import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button/button";
import EditIcon from "../../assets/icons/EditIcom.png";
import LeftPageIcon from "../../assets/icons/LeftPage.png";
import RightPageIcon from "../../assets/icons/Right-Page.png";


import DeleteIcon from "../../assets/icons/DeleteIcon.png";
import Table from "../../components/Table/table";

import SearchIcon from "../../assets/icons/magnifying-glass.png";
import AdminHOC from "../../hoc/adminHOC";
import Modal from "../../components/modal/modal";
import Dynamicform from "../../components/forms/dynamicform";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from "../../api/categoryApi";
import Tooltip from "../../components/tooltip/toolTip";

 // Debounce utility function
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Debounce function to delay search execution
  const debounceSearch = useCallback(
    debounce((newSearchTerm) => {
      loadCategories(newSearchTerm);
    }, 100), // 300ms delay
    []
  );

  useEffect(() => {
    loadCategories(searchTerm);
  }, [currentPage]);

  // Load categories from the backend with optional search term
  const loadCategories = async (search = "") => {
    try {
      const data = await fetchCategories(currentPage, 10, search);

     console.log(data);
      
      const startIndex = currentPage * data.size;
      const transformedCategories = data.content.map((category, index) => ({
        ...category,
        displayId: startIndex + index + 1,
      }));
      setCategories(transformedCategories);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debounceSearch(newSearchTerm); // Call the debounced search function
  };

 
  const handleAddCategory = async (category) => {
    if (category.name && category.categoryDesc) {
      try {
        if (editingCategory) {
          // If editing, update the category

         
          await updateCategory(editingCategory.id, category);
          setEditingCategory(null); // Reset editing state
        } else {
          // If adding, add a new category
          await addCategory(category);
        }
        loadCategories();
        handleCloseModal();
      } catch (error) {
        console.error("Failed to save category:", error);
      }
    }
  };

  const handleDelete = async (rowData) => {
    const id = rowData.id;
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Failed to delete the category", error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const columns = [
    { header: "ID", accessor: "displayId", width: "0.25%" },
    { header: "Category Name", accessor: "name", width: "2%" },
    { header: "Category Description", accessor: "categoryDesc", width: "3%" },
    {
      header: "Actions",
      render: (rowData) => renderActions(rowData),
      width: "0.2%",
    },
  ];

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

  
  const handleEdit = (rowData) => {
    setEditingCategory(rowData); 
    setIsModalOpen(true); 
  };



  return (
    <>
      <div className="categories-div">
        <div className="center-div">
          <div className="upper-div">
            <div className="upper-div-text">
              <span>Categories</span>
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
                      placeholder="Search categories..."
                      className="search-input"
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                      
                    />
                  </div>
                </div>
              </div>

              <div className="add-categories-div">
                <Button
                  text="Add Category"
                  className="add-categories-btn"
                  onClick={handleOpenModal}
                />
              </div>
            </div>
          </div>

          <div className="lower-div">
            <Table data={categories} columns={columns} />

            <div className="pagination-div">
              <div className="left-pagination">
                <img 
                src={LeftPageIcon} 
                alt="" 
                onClick={() => handlePageChange("prev")}
                />
              </div>
              <div className="pagination-number">
              <span>{currentPage + 1}/{totalPages}</span>
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
        </div>
      </div>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <Dynamicform
          heading={editingCategory ? "Edit Category" : "Add Category"}
          fields={[
            {
              name: "name",
              type: "text",
              placeholder: "Category Name",
              required: true,
              defaultValue: editingCategory?.name || "", // Pre-fill if editing
            },
            {
              name: "categoryDesc",
              type: "text",
              placeholder: "Category Description",
              required: true,
              defaultValue: editingCategory?.categoryDesc || "", // Pre-fill if editing
            },
          ]}
          onSubmit={handleAddCategory}
          isEditMode={!!editingCategory}
        />
      </Modal>
    </>
  );
};

export default AdminHOC(Categories);
