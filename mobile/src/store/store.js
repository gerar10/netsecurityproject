import { configureStore } from "@reduxjs/toolkit";
import userEvent from "./event";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    user: userReducer,
    event: userEvent,
  },
});

export default store;
