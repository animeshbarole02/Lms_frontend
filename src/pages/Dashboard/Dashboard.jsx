import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "../../components/Navbar/navbar";
import SideBar from "../../components/SideBar/sideBar";
import Card from "../../components/Card/card";

import Reading from "../../assets/icons/girl-reading-book.png";
import Books from "../../assets/icons/Books.png";
import TakeAway from "../../assets/icons/Takeaway.png";
import TotalUsers from "../../assets/icons/TotalUsers.png";
import AdminHOC from "../../hoc/adminHOC";
import { fetchUserCount } from "../../api/services/usersApi";
import { fetchCategoryCount } from "../../api/services/categoryApi"; // Adjust the import path as necessary
import { fetchTotalBookCount } from "../../api/services/bookApi";
import { fetchIssuanceCount } from "../../api/services/issuancesApi";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [issuanceCount , setIssuanceCount] = useState(0);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const userCount = await fetchUserCount();
        setUserCount(userCount);

        const issuanceCount = await fetchIssuanceCount();
        setIssuanceCount(issuanceCount);
        

        const bookCount = await fetchTotalBookCount();
        setBookCount(bookCount);

        const categoryCount = await fetchCategoryCount(); // Ensure this function is implemented in categoriesApi
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

  return (
    <div className="dashboard-div">
      <div className="contains">
        <div className="leftdash-div">
          <div className="cards-div">
            <div className="card-div">
              <Card
                src={Reading}
                heading="Readers"
                count={issuanceCount} // Replace with actual count if needed
              />
            </div>

            <div className="card-div">
              <Card
                src={TakeAway}
                heading="Categories Available"
                count={categoryCount} // Replace with actual count if needed
              />
            </div>

            <div className="card-div">
              <Card
                src={TotalUsers}
                heading="Active Users"
                count={userCount} // Display the user count
              />
            </div>

            <div className="card-div">
              <Card
                className="books-card"
                src={Books}
                heading="Books Available"
                count={bookCount} // Replace with actual count if needed
              />
            </div>
          </div>
        </div>

        <div className="rightdash-div">
          {/* Add any additional content for the right side */}
        </div>
      </div>
    </div>
  );
};

export default AdminHOC(Dashboard);
