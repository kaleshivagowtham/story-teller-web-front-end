import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../features/modal/modalSlice';
import loginModalReducer from '../features/modal/loginModalSlice';
import loginReducer from '../features/modal/loginSlice';
import rememberLoginReducer from '../features/modal/rememberLoginSlice';
import notificationReducer from '../features/modal/notificationSlice';

export const store = configureStore({

    reducer : {

        modal : modalReducer,
        loginModal : loginModalReducer,
        loggedIn : loginReducer,
        rememberLogin : rememberLoginReducer,
        notificationModel : notificationReducer,
    },
})