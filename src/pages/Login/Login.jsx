import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LibraryLogo from "../../assets/icons/WithoutBorder.png";
import Button from "../../components/Button/button";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setError } from "../../redux/authSlice";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [usernameOrPhoneNumber, setUsernameOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  
 
  const dispatch = useDispatch();
  

  const navigate = useNavigate(); 

  const error =  useSelector((state)=>state.auth.error);
  

  const handleUserTypeChange = (type) => {
    setIsAdmin(type === "ADMIN");

    setUsernameOrPhoneNumber("");
    setPassword("");
    dispatch(setError(null));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setError(null));
   
    const trimmedInput = usernameOrPhoneNumber.trim();
    const payload = {
      usernameOrPhoneNumber: trimmedInput,
      password: password.trim(),
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/; // Adjust the pattern based on your requirements
  
    // Validate input based on selected role
    if (isAdmin) {
      if (!emailPattern.test(trimmedInput)) {
        dispatch(setError("Please enter a valid email address for admin login."));
        return;
      }
    } else {
      if (!phonePattern.test(trimmedInput)) {
        dispatch(setError("Please enter a valid phone number for user login."));
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login SucccessFull", data);
        localStorage.setItem("token", data.jwtToken);

        dispatch(loginSuccess({ user: data, jwtToken: data.jwtToken }));

        if (isAdmin) {
           navigate("/dashboard");
        } 
        else {
          alert("User login successful. You are not redirected as this is a user account.");
        }

      } else {
        dispatch(setError(data.message || "Login Failed, Please Try Again"));
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setError("An error occurred. Please try again later."));
    }



  };

  return (
    <div className="outline-div">
      <div className="login-div">
        <div className="left-page">
          <div className="input-div">
            <div className="text">
              <h2>Log in</h2>
            </div>

            <div className="choose">
              <Button
                text="Admin"
                active={isAdmin}
                onClick={() => handleUserTypeChange("ADMIN")}
              />
              <Button
                text="User"
                active={!isAdmin}
                onClick={() => handleUserTypeChange("USER")}
              />
            </div>

            <div className="form">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">
                    {isAdmin ? "Username" : "Enter Mobile Number"}
                  </label>
                  <input
                    type={isAdmin ? "text" : "tel"}
                    id="username"
                    name="username"
                    value={usernameOrPhoneNumber}

                    onChange={(e) => setUsernameOrPhoneNumber(e.target.value)}
                    placeholder={
                      isAdmin
                        ? "Enter your username"
                        : "Enter your mobile number"
                    }
                   
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group button-div">
                  <Button text="Login" className="login-btn" />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="vertical-line"></div>

        <div className="right-page">
          <div className="img-div">
            <div className="text">
              <h2>Library Management Portal</h2>
              <p>
                Your gateway to a world of knowledge. Manage your library
                account, explore our extensive collection, and keep track of
                your reading journey all in one place.{" "}
              </p>
            </div>

            <div className="icon">
              <img src={LibraryLogo} alt="Library Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
