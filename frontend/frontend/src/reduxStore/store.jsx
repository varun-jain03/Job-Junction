import { configureStore } from "@reduxjs/toolkit";
import useReducer from './slices/authSlice.jsx';

export const store = configureStore({
  reducer: {
    user: useReducer
  }
})