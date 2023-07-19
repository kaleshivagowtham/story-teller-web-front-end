import { createSlice } from "@reduxjs/toolkit";
import useLocalStorage from '../../utils/useLocalStorage';

const initialState = {
    isLoggedIn : useLocalStorage.getItemFromLocalStorage('jwt_auth_token') ? true : false,
    userName : '',
    jwt_auth_token : useLocalStorage.getItemFromLocalStorage('jwt_auth_token') ? jwt_auth_token : '',
}

const loginSlice = createSlice({

    name : 'loggedIn',
    initialState,
    reducers : {
        loginAction : (state , action) => {
            state.isLoggedIn = true;
            state.userName = action.payload.username;
            state.jwt_auth_token = action.payload.accessToken;
            useLocalStorage.setItemInLocalStorage({"key" : "jwt_auth_token",value : action.payload.accessToken});
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