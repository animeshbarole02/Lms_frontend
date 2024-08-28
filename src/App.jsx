import "./App.css";
import Books from "./pages/Books/Books";

import Categories from "./pages/Categories/Categories";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import Issuances from "./pages/Issuances/Issuances";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./style/style.css";
import ProtectedRoute from "./routers/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/categories"
           element={
            <ProtectedRoute>
              <Categories />
           </ProtectedRoute>
           } />
          <Route path="/books" 
          element={
             <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
            <Users />
            </ProtectedRoute>
            } />
          <Route path="/issuances" element={<Issuances />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
