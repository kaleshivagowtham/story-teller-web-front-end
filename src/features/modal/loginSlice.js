import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    userName : '',
}

const loginSlice = createSlice({

    name : 'loggedIn',
    initialState,
    reducers : {
        loginAction : (state , action) => {
            state.isLoggedIn = true;
            state.userName = action.payload;
        },
        logoutAction : (state) => {
            state.isLoggedIn = false;
            state.userName = '';
        }
    }
})

export const { loginAction ,logoutAction } = loginSlice.actions;

export default loginSlice.reducer;