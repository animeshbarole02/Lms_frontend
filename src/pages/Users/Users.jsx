import  { useCallback, useEffect, useState } from 'react'

import EditIcon from "../../assets/icons/EditIcom.png";
import SearchIcon from "../../assets/icons/magnifying-glass.png";
import Button from '../../components/Button/button';
import Table from '../../components/Table/table';
import LeftPageIcon from "../../assets/icons/LeftPage.png";
import RightPageIcon from "../../assets/icons/Right-Page.png";
import AdminHOC from '../../hoc/adminHOC';
import Modal from '../../components/modal/modal';
import Dynamicform from '../../components/forms/dynamicform';
import DeleteIcon from "../../assets/icons/DeleteIcon.png";
import { fetchBooks } from '../../api/bookApi';
import { addUser, deleteUser, fetchUsers } from '../../api/usersApi';



const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const Users = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const debounceSearch = useCallback(
      debounce((newSearchTerm)=> {
     loadUsers(newSearchTerm);
      },1000),
      []
    );
     
    useEffect(() => {
      loadUsers(searchTerm);
    }, [currentPage]);

    const loadUsers =  async (search = "")=> {
      try {
        const data = await fetchUsers(currentPage, 7, search);
        
        const startIndex = currentPage * data.size;
        const transformedCategories = data.content.map((user, index) => ({
          ...user,
          displayId: startIndex + index + 1,
        }));
        setUsers(transformedCategories);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to load Users:", error);
      }
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleAddUser = async (newUser) => {
    
       newUser = {
          ...newUser,
          role:"USER",
       }

       console.log(newUser)

      if (newUser.name && newUser.email && newUser.phoneNumber && newUser.password) {

        
        try {
   
         await addUser(newUser);
         loadUsers();
         handleCloseModal();

        }catch(error) {
          console.error("Failed to add User:", error);
        }
  
  
      }
    };

    const handleDelete = async (rowData) => {
      const id =  rowData.id;

      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      }catch(error) {
        console.log("Failed to delete User",error);
      }
    };

    const handleIssue = (rowData)=> {


    
    }
  
    const handleHistory = (rowData)=>{
  
    }


    const handleSearchInputChange = (event) => {
       const newSearchTerm = event.target.value;
       setSearchTerm(newSearchTerm);
       debounceSearch(newSearchTerm);
    }

    const handlePageChange = (direction) => {
      if(direction ==="prev" && currentPage >0) {
        setCurrentPage(currentPage -1);
      }
      else if(direction ==="next" && currentPage <totalPages -1)
      {
         setCurrentPage(currentPage +1);
      }
    }
  
      const columns = [
        { header: "ID", accessor: "id", width: "2%" },
        { header: "User Name", accessor: "name", width: "3%" },
        { header: "User Email", accessor: "email", width: "5%" },

        {
          header: "Options",
          render: (rowData) => (
            <div className="button-container">
              <Button
                text="Issue"
                className="action-button issue-button"
                onClick={() => handleIssue(rowData)}
              />
              <Button
                text="History"
                className="action-button history-button"
                onClick={() => handleHistory(rowData)}
              />
            </div>
          ),
          width: "4%",
        }, 
        {
            header: "Actions",
            render: (rowData) => renderActions(rowData),
            width: "1%",
          },

          


      ];



      const handleEdit = (rowData) => {
       
        console.log("Edit clicked for", rowData);
      };
    
   
      const renderActions = (rowData) => (
        <div className="actionicons">
          <img
            src={EditIcon}
            alt="Edit"
            className="action-icon"
            onClick={() => handleEdit(rowData)}
          />
          <img
            src={DeleteIcon}
            alt="Assign-Book"
            className="action-icon"
            onClick={() => handleDelete(rowData)}
          />
        </div>
      );
      
  
  return (
    <>
           <div className="center-div">
           <div className="upper-div">
            <div className="upper-div-text">
              <span>Users</span>
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
                    placeholder="Search Users..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                  />
                 </div>
                </div>
              </div> 

              <div className="add-categories-div">
              <Button text="Add User" className="add-categories-btn" onClick={handleOpenModal} />
               </div>
            </div>

           
          </div>

        <div className="lower-div">
        <Table data={users} columns={columns} />
        </div>
        <div className="pagination-div">
          <div className="left-pagination">
            <img src={LeftPageIcon} alt="" 
             onClick={() => handlePageChange("prev")}/>
          </div>
          <div className="pagination-number">
            <span>  {currentPage + 1}/{totalPages}</span>
          </div>
          <div className="right-pagination">
            <img src={RightPageIcon} alt=""
            onClick={() => handlePageChange("next")}
             />
          </div>
        </div>
     </div>
     <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Dynamicform
          heading="Add User"
          fields={[
            {
              name: "name",
              type: "text",
              placeholder: "User Name",
              required: true,
            },
            {
              name: "email",
              type: "email",
              placeholder: "User Email",
              required: true,
            },
            {
              name: "phoneNumber",
              type: "tel",
              placeholder: "Phone Number",
              required: true,
            },
            {
              name: "password",
              type: "password",
              placeholder: "Password",
              required: true,
            },
          ]}
          onSubmit={handleAddUser}
        />
      </Modal>
      
    </>
  )
}

export default AdminHOC(Users)