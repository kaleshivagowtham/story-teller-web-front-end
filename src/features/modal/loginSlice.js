import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
}

const loginSlice = createSlice({

    name : 'loggedIn',
    initialState,
    reducers : {
        loginAction : (state) => {
            state.isLoggedIn = true;
        },
        logoutAction : (state) => {
            state.isLoggedIn = false;
        }
    }
})

export const { loginAction ,logoutAction } = loginSlice.actions;

export default loginSlice.reducer;