import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "../../components/Navbar/navbar";
import SideBar from "../../components/SideBar/sideBar";
import Card from "../../components/Card/card";

import Reading from "../../assets/icons/girl-reading-book.png";
import Books from "../../assets/icons/Books.png";
import TakeAway from "../../assets/icons/Categories1.png";
import TotalUsers from "../../assets/icons/TotalUsers.png";
import AdminHOC from "../../hoc/adminHOC";
import { fetchUserCount } from "../../api/services/usersApi";
import { fetchCategoryCount } from "../../api/services/categoryApi"; 
import { fetchBooks, fetchTotalBookCount } from "../../api/services/bookApi";
import { fetchIssuanceCount } from "../../api/services/issuancesApi";
import Table from "../../components/Table/table";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [issuanceCount , setIssuanceCount] = useState(0);
  const [tableData, setTableData] = useState([]); 

  useEffect(() => {
    const getCounts = async () => {
      try {
        const userCount = await fetchUserCount();
        setUserCount(userCount);

        const issuanceCount = await fetchIssuanceCount();
        setIssuanceCount(issuanceCount);
        

        const bookCount = await fetchTotalBookCount();
        setBookCount(bookCount);

        const categoryCount = await fetchCategoryCount(); 
        setCategoryCount(categoryCount);

      
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    getCounts();
  }, []);

  const handleClick = (cardType) => {
    console.log(`${cardType} card clicked`);
  };

  const columns = [
    { header: "ID", accessor: "id", width: "10%" },
    { header: "Book Title", accessor: "title", width: "45%" },
    { header: "Author", accessor: "author", width: "45%" },
  ];

  return (
    <div className="dashboard-div">
      <div className="contains">
      <div className="card-table-div">
        <div className="leftdash-div">
          <div className="cards-div">
            <div className="card-div">
              <Card
                src={Reading}
                heading="Book Issued"
                count={issuanceCount} 
              />
            </div>

            <div className="card-div">
              <Card
                src={TakeAway}
                heading="Categories Available"
                count={categoryCount}
              />
            </div>

            <div className="card-div">
              <Card
                src={TotalUsers}
                heading="Active Users"
                count={userCount} 
              />
            </div>

            <div className="card-div">
              <Card
                className="books-card"
                src={Books}
                heading="Books Available"
                count={bookCount}
              />
            </div>
          </div>
        </div>
        </div>

        <div className="rightdash-div">
          <div className="dashboard-table">
            <Table data={tableData} columns={columns} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHOC(Dashboard);
