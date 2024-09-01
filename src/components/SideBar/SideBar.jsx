import React, { useState } from 'react';
import './sideBar.css';

import Dash from '../../assets/icons/Dashboard.png';
import List from '../../assets/icons/List.png';
import Book from '../../assets/icons/Book.png';
import Group from '../../assets/icons/Users.png';
import Issuance from '../../assets/icons/Issuance.png';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);

  const handleItemClick = (path) => {
    setSelectedItem(path);
  };

  return (
    <div className='sideBar-div'>
      <div className="dashboard-items-div">
        <Link 
          to="/dashboard" 
          className={`dashboard item ${selectedItem === '/dashboard' ? 'selected' : ''}`} 
          onClick={() => handleItemClick('/dashboard')}
        >
          <img src={Dash} alt="Dashboard Icon" className="icon" />
          <span className="item-text">Dashboard</span>
        </Link>

        <Link 
          to="/categories" 
          className={`categories item ${selectedItem === '/categories' ? 'selected' : ''}`} 
          onClick={() => handleItemClick('/categories')}
        >
          <img src={List} alt="Categories Icon" className="icon" />
          <span className="item-text">Categories</span>
        </Link>

        <Link 
          to="/books" 
          className={`books item ${selectedItem === '/books' ? 'selected' : ''}`} 
          onClick={() => handleItemClick('/books')}
        >
          <img src={Book} alt="Books Icon" className="icon" />
          <span className="item-text">Books</span>
        </Link>

        <Link 
          to="/users" 
          className={`users item ${selectedItem === '/users' ? 'selected' : ''}`} 
          onClick={() => handleItemClick('/users')}
        >
          <img src={Group} alt="Users Icon" className="icon" />
          <span className="item-text">Users</span>
        </Link>

        <Link 
          to="/issuances" 
          className={`issuances item ${selectedItem === '/issuances' ? 'selected' : ''}`} 
          onClick={() => handleItemClick('/issuances')}
        >
          <img src={Issuance} alt="Issuances Icon" className="icon" />
          <span className="item-text">Issuances</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
