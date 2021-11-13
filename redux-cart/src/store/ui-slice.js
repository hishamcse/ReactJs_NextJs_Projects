import {createSlice} from "@reduxjs/toolkit";

const initUIState = {show: true, notification: null};

const uiSlice = createSlice({
    name: 'ui',
    initialState: initUIState,
    reducers: {
        toggle(state) {
            state.show = !state.show
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice;