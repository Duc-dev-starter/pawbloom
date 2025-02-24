import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  email: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);

      // Decode token để lấy email & role
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwtDecode(token);
      state.token = token;
      state.email = decoded.email || null;
      state.role = decoded.role || null;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
