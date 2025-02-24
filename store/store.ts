import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { jwtDecode } from "jwt-decode";

// Token mẫu để test trong môi trường dev
const DEFAULT_TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IlVzZXIifQ.DummySignature123";

const token =
  typeof window !== "undefined"
    ? localStorage.getItem("token") || DEFAULT_TEST_TOKEN
    : DEFAULT_TEST_TOKEN;

const initialAuthState = token
  ? (() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(token);
        return {
          token,
          email: decoded.email || "test@gmail.com",
          role: decoded.role || "User",
        };
      } catch (error) {
        console.error("Invalid token:", error);
        return {
          token: null,
          email: null,
          role: null,
        };
      }
    })()
  : {
      token: null,
      email: null,
      role: null,
    };

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  preloadedState: {
    auth: initialAuthState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
