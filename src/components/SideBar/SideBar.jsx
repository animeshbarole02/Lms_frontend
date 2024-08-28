import './SideBar.css';

import Dash from '../../assets/icons/Dashboard.png';
import List from '../../assets/icons/List.png';
import Book from '../../assets/icons/Book.png';
import Group from '../../assets/icons/Users.png';
import Issuance from '../../assets/icons/Issuance.png'
import { Link } from 'react-router-dom';

const SideBar = () => {

 
  return (
    <div className='sideBar-div'>

    <div className="dashboard-items-div">

       <Link to="/dashboard" className="dashboard item">
        <img src={Dash} alt="Dashboard Icon" className="icon" />
        <span className="item-text">Dashboard</span>

      </Link>
     

       <Link to="/categories" className="categories item">
        <img src={List} alt="Categories Icon" className="icon" />
        <span className="item-text">Categories</span>
      </Link>

      <Link to="/books" className="books item">
        <img src={Book} alt="Books Icon" className="icon" />
        <span className="item-text">Books</span>
      </Link>

      <Link to="/users" className="users item">
    
        <img src={Group} alt="Users Icon" className="icon" />
        <span className="item-text">Users</span>
      </Link>
   
      <Link to="/issuances" className="issuances item">

        <img src={Issuance} alt="Issuances Icon" className="icon" />
        <span className="item-text">Issuances</span>
      </Link>
      </div>  
    </div>
  )
}

export default SideBar;
