import  { useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Navbar from '../../components/Navbar/Navbar'
import SearchIcon from "../../assets/icons/magnifying-glass.png";
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import LeftPageIcon from "../../assets/icons/LeftPage.png";
import RightPageIcon from "../../assets/icons/Right-Page.png";
import AssignBook from '../../assets/icons/BookBlack.png'
import EditIcon from "../../assets/icons/EditIcom.png";
import AdminHOC from '../../hoc/AdminHOC';
import Modal from '../../components/modal/modal';
import Dynamicform from '../../components/forms/dynamicform';


const Users = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "michael.brown@example.com",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@example.com",
      },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleAddUser = (newUser) => {
      if (newUser.name && newUser.email && newUser.phoneNumber && newUser.password) {
        const newUserEntry = {
          id: users.length + 1,
          ...newUser,
        };
  
        setUsers([...users, newUserEntry]);
  
        handleCloseModal();
      }
    };
  
      const columns = [
        { header: "ID", accessor: "id", width: "2%" },
        { header: "User Name", accessor: "name", width: "3%" },
        { header: "User Email", accessor: "email", width: "5%" },
        {
            header: "Actions",
            render: (rowData) => renderActions(rowData),
            width: "1%",
          },
      ];

      const handleEdit = (rowData) => {
       
        console.log("Edit clicked for", rowData);
      };
    
      const handleDelete = (rowData) => {
       
        console.log("Delete clicked for", rowData);
      };
      const renderActions = (rowData) => (
        <div className="actionicons">
          <img
            src={AssignBook}
            alt="Assign-Book"
            className="action-icon"
            onClick={() => handleDelete(rowData)}
          />
          <img
            src={EditIcon}
            alt="Edit"
            className="action-icon"
            onClick={() => handleEdit(rowData)}
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
            <img src={LeftPageIcon} alt="" />
          </div>
          <div className="pagination-number">
            <span>1/5</span>
          </div>
          <div className="right-pagination">
            <img src={RightPageIcon} alt="" />
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