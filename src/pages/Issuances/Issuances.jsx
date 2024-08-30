import  { useCallback, useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/magnifying-glass.png";
import Table from "../../components/Table/table";
import Modal from "../../components/modal/modal";
import Dynamicform from "../../components/forms/dynamicform";
import LeftPageIcon from "../../assets/icons/LeftPage.png";
import RightPageIcon from "../../assets/icons/Right-Page.png";
import AdminHOC from "../../hoc/adminHOC";
import {
  fetchIssuances,
 
  deleteIssuance,
  updateIssuance,
} from "../../api/issuancesApi";
import Tooltip from "../../components/tooltip/toolTip";
import EditIcon from "../../assets/icons/EditIcom.png";
import DeleteIcon from "../../assets/icons/DeleteIcon.png";
import "./Issuances.css"; // Make sure to create a corresponding CSS file for styling

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const Issuances = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [issuances, setIssuances] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIssuance, setEditingIssuance] = useState(null);

  // Debounce function to delay search execution
  const debounceSearch = useCallback(
    debounce((newSearchTerm) => {
      loadIssuances(newSearchTerm);
    }, 1000),
    []
  );

  useEffect(() => {
    loadIssuances(searchTerm);
  }, [currentPage]);

  // Load issuances from the backend with optional search term
  const loadIssuances = async (search = "") => {
    try {
      const data = await fetchIssuances(currentPage, 10, search);
      console.log(data);
      const startIndex = currentPage * data.size;
      const transformedIssuances = data.content.map((issuance, index) => ({
        ...issuance,
        displayId: startIndex + index + 1,
      }));
      setIssuances(transformedIssuances);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load issuances:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debounceSearch(newSearchTerm);
  };

  const handleAddIssuance = async (issuance) => {
    if (issuance.userId && issuance.bookId && issuance.issueDate) {
      try {
        if (editingIssuance) {
          await updateIssuance(editingIssuance.id, issuance);
          setEditingIssuance(null);
        } else {
          await createIssuance(issuance);
        }
        loadIssuances();
        handleCloseModal();
      } catch (error) {
        console.error("Failed to save issuance:", error);
      }
    }
  };

  const handleDelete = async (rowData) => {
    const id = rowData.id;
    try {
      await deleteIssuance(id);
      setIssuances(issuances.filter((issuance) => issuance.id !== id));
    } catch (error) {
      console.error("Failed to delete the issuance", error);
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
    setEditingIssuance(null);
  };

  const columns = [
    { header: "ID", accessor: "displayId", width: "10%" },
    { header: "User ID", accessor: "userId", width: "15%" },
    { header: "Book ID", accessor: "bookId", width: "15%" },
    { header: "Issue Date", accessor: "issueDate", width: "20%" },
    { header: "Return Date", accessor: "returnDate", width: "20%" },
    {
      header: "Actions",
      render: (rowData) => renderActions(rowData),
      width: "20%",
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
    setEditingIssuance(rowData);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="issuances-div">
        <div className="center-div">
          <div className="upper-div">
            <div className="upper-div-text">
              <span>Issuances</span>
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
                      placeholder="Search issuances..."
                      className="search-input"
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                </div>
              </div>

            
            </div>
          </div>

          <div className="lower-div">
            <Table data={issuances} columns={columns} />

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
          heading={editingIssuance ? "Edit Issuance" : "Add Issuance"}
          fields={[
            {
              name: "userId",
              type: "number",
              placeholder: "User ID",
              required: true,
              defaultValue: editingIssuance?.userId || "",
            },
            {
              name: "bookId",
              type: "number",
              placeholder: "Book ID",
              required: true,
              defaultValue: editingIssuance?.bookId || "",
            },
            {
              name: "issueDate",
              type: "date",
              placeholder: "Issue Date",
              required: true,
              defaultValue: editingIssuance?.issueDate || "",
            },
            {
              name: "returnDate",
              type: "date",
              placeholder: "Return Date",
              defaultValue: editingIssuance?.returnDate || "",
            },
          ]}
          onSubmit={handleAddIssuance}
          isEditMode={!!editingIssuance}
        />
      </Modal>
    </>
  );
};

export default AdminHOC(Issuances);
