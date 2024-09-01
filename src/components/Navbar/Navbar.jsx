import Logo from "../../assets/icons/ReadingLogo.png";
import User from "../../assets/icons/user.png";
import LogoutSwtich from "../../assets/icons/LogoutSwitch2.png"
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
     navigate("/");
  };

  return (
    <div className="navbar-div">
      <div className="logo">
        <div className="logo-img">
          <img src={Logo} alt="logo-img" />
        </div>

        <div className="logo-text">
          <p>Readify</p>
        </div>
      </div>

      <div className="header">
        <div className="user-name">
          <img src={User} alt=""></img>

          <p>Hello Animesh !</p>
          <br></br>
        </div>

        <div className="logout-button">
          <div className="img">
            <img
              src={LogoutSwtich}
              alt="Logout"
              className="logout-icon"
              onClick={handleLogout}
            />
          </div>

          <div className="text">
                <span>Logout</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
