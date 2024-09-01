import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  jwtToken: null,
  name: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.jwtToken = action.payload.jwtToken;
      state.name = action.payload.user.name;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.jwtToken = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAuthFromLocalStorage: (state, action) => {
      const token = action.payload.jwtToken;
      if (token) {
        state.jwtToken = token;
        state.isAuthenticated = true;
        // Fetch user info to complete state initialization if necessary
        // Example: dispatch(fetchUserInfo(token));
      } else {
        state.isAuthenticated = false;
      }
    },
  },
});

export const { loginSuccess, logout, setError, setAuthFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
