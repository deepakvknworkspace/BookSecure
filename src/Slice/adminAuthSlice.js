import { createSlice } from "@reduxjs/toolkit";

const storedAuth = sessionStorage.getItem("adminAuth");

const initialState = {
  user: storedAuth ? JSON.parse(storedAuth).user : null,
  token: storedAuth ? JSON.parse(storedAuth).token : null,
  isAuthenticated: !!storedAuth,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // 🔹 Persist in sessionStorage
      sessionStorage.setItem(
        "adminAuth",
        JSON.stringify({ user, token })
      );
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      sessionStorage.removeItem("adminAuth");
    },
  },
});

export const { loginSuccess, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
