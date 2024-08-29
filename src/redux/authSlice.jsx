import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user :null,
    jwtToken : null,
    name :null,
    isAuthenticated :false,
    error :null,
};


const authSlice = createSlice({
    name :'auth',
    initialState ,
    reducers : {
        loginSuccess : (state,action) =>{
            state.user = action.payload.user;
            state.jwtToken =action.payload.jwtToken;
            state.name = action.payload.user.name;
            state.isAuthenticated = true;
            state.error = null;

        },

        logout :(state) => {
            state.user = null;
            state.jwtToken = null;
            state.isAuthenticated = false;
            state.error = null;

        },
        setError :(state,action) => {
            state.error = action.payload;
        },
    },
});

export const { loginSuccess, logout, setError } = authSlice.actions;

export default authSlice.reducer;