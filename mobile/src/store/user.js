import { createAction, createReducer } from "@reduxjs/toolkit";

export const userLogin = createAction("LOGIN");
export const userLogout = createAction("LOGOUT");

const initialState = {
  id: "",
  email: "",
  fullname: "",
  rol: "",
};

const userReducer = createReducer(initialState, {
  [userLogin]: (state, action) => action.payload,
});

export default userReducer;
