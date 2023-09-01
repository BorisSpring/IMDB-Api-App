import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  session_id: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) {
        return;
      }
      state.user = action.payload;
      state.isAuthenticated = true;
      state.session_id = localStorage.getItem("session_id");
      localStorage.setItem("account_id", action.payload.id);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.session_id = "";
      state.user = {};
      localStorage.clear();
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
