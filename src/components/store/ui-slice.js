import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
    name:"ui",
    initialState:{isVisible:false , notification:null},
    reducers:{
        toggleCart(state) {
            state.isVisible = !state.isVisible;
        },
        showNotification(state , action) {
            state.notification = {
                status:action.payload.status,
                title:action.payload.title,
                message:action.payload.message,
            }
        }
    }    
});

export const uiActions = uiSlice.actions;
const uiReducer = uiSlice.reducer;
export default uiReducer;

