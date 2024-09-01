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
} from "../../api/services/issuancesApi";
import Tooltip from "../../components/tooltip/toolTip";
import EditIcon from "../../assets/icons/EditIcom.png";
import DeleteIcon from "../../assets/icons/DeleteIcon.png";
import "./Issuances.css"; // Make sure to create a corresponding CSS file for styling
import { formatDateOrTime } from "../../utils/formateDateOrTime";

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
        name: issuance.user?.name || "Unknown", // Extract user name
        title: issuance.book?.title || "Unknown", // Extract book title

      }));

      console.log(transformedIssuances);
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

  

  const handleDelete = async (rowData) => {
    const id = rowData.id;
    console.log(id);
    try {
      await deleteIssuance(id);
      
      setIssuances(issuances.filter((issuance) => issuance.id !== id));
      return alert("Issuance Deleted Successfully");
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
    { header: "Id", accessor: "displayId", width: "3%" },
    { header: "User", accessor: "name", width: "8%" },
    { header: "Book", accessor: "title", width: "8%" },
    { header: "Issue", accessor: "issuedAt", 
      
      width: "10%",
      render: (rowData) => formatDateOrTime(rowData.issuedAt, rowData.issuanceType)
     },
     {header :"Expected Return",accessor:"expectedReturn", width:"10%",
      render: (rowData) => formatDateOrTime(rowData.expectedReturn, rowData.issuanceType)
     },
    { header: "Return", accessor: "returnedAt", width: "10%" ,
      render: (rowData) => {
        if (!rowData.returnedAt) return ""; // If returnedAt is null, return an empty string
        return formatDateOrTime(rowData.returnedAt, rowData.issuanceType); // Otherwise, format and display the date or time
      }
    }, 
    { header: "Status", accessor: "status", width: "5%" },
    {header : "Type" , accessor :"issuanceType",width : "5%"},
    {
      header: "Actions",
      render: (rowData) => renderActions(rowData),
      width: "5%",
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
     
    </>
  );
};

export default AdminHOC(Issuances);
