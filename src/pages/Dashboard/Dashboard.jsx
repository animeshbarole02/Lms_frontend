import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import Card from "../../components/Card/Card";

import Reading from "../../assets/icons/girl-reading-book-concept-free-vector.jpg";
import Books from "../../assets/icons/Books.png";
import TakeAway from "../../assets/icons/Takeaway.png";
import TotalUsers from "../../assets/icons/TotalUsers.png";
import AdminHOC from "../../hoc/AdminHOC";
const Dashboard = () => {
  const handleClick = (cardType) => {
    console.log(`${cardType} card clicked`);
  };
  return (
    <div>

    

    <div className="dashboard-div">
    
    

     
    <div className="contains"> 
     <div className="leftdash-div">
      <div className="cards-div">
        <div className="card-div">
          <Card
            src={Reading}
            heading="Currently Reading"
            count={120}
          
          />
        </div>

        <div className="card-div">
          <Card
            src={TakeAway}
            heading="Reading at Home"
            count={120}
            
          />
        </div>
        <div className="card-div">
          <Card
            src={TotalUsers}
            heading="Total Users"
            count={120}
           
          />
        </div>
        <div className="card-div">
          <Card
            className="books-card"
            src={Books}
            heading="Total Books Available"
            count={120}
          
          />
        </div>
        

      </div>
      </div>

      <div className="rightdash-div">
          
      </div>
      </div> 
    </div>

    </div> 
  );
};

export default AdminHOC(Dashboard);
