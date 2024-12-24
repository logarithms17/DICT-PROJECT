import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: localStorage.getItem("token") ? true : false,
        notification: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            console.log(action);
            localStorage.setItem("token", action.payload);
            state.notification = { type: "success", message: "Login successful!" };
        },
        logout(state, action) {
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            state.notification = { type: "info", message: "Logged out successfully!" };
        },
        clearNotification(state) {
            state.notification = null; // Clear notifications
        },
    },
});

export const { login, logout, clearNotification } = authSlice.actions;
export default authSlice.reducer;