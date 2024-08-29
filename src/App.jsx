import "./App.css";
import Books from "./pages/Books/books";

import Categories from "./pages/Categories/categories";
import Dashboard from "./pages/Dashboard/dashboard";
import Login from "./pages/Login/login";
import Users from "./pages/Users/users";
import Issuances from "./pages/Issuances/issuances";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./style/style.css";
import ProtectedRoute from "./routers/protectedRoute";

function App() {
  return (

    <Provider store={store}>
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
    </Provider> 
  );
}

export default App;
