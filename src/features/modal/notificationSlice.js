import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isNotificationOpen : false,
}

const notificationSlice = createSlice({

    name : 'notificationModel',
    initialState,
    reducers : {
        closeNotification : (state) => {
            state.isNotificationOpen = false;
        },
        openNotification : (state) => {
            state.isNotificationOpen = true;
            // setTimeout(() => {
            //     notificationSlice.caseReducers.closeNotification();
            // },2000)
        },
    }
})

export const {openNotification , closeNotification} = notificationSlice.actions;

export default notificationSlice.reducer;