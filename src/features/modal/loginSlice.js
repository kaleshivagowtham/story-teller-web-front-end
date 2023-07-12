import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    userName : '',
    jwt_auth_token : '',
}

const loginSlice = createSlice({

    name : 'loggedIn',
    initialState,
    reducers : {
        loginAction : (state , action) => {
            state.isLoggedIn = true;
            state.userName = action.payload.username;
            state.jwt_auth_token = action.payload.accessToken;
        },
        logoutAction : (state) => {
            state.isLoggedIn = false;
            state.userName = '';
            state.jwt_auth_token = '';
        }
    }
})

export const { loginAction ,logoutAction } = loginSlice.actions;

export default loginSlice.reducer;