import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];
export const guardSlice = createSlice({
  name: "guards",
  initialState,
  reducers: {
    setGuards: (state, action) => {
      return [...action.payload];
    },
    deleteGuard(state, action) {
      return current(state).filter((element) => element !== action.payload);
    },
    unSetGuard(state, action) {
      return initialState;
    },
    editGuard(state, action) {
      const guardEdited = current(state).filter(
        (element) => element !== action.payload.guard
      );
      guardEdited.push(action.payload.guardEdit);
      return guardEdited;
    },
    newGuard(state, action) {
      return [...current(state)].push(action.payload);
    },
  },
});

export const { setGuards, deleteGuard, unSetGuard, editGuard, newGuard } =
  guardSlice.actions;
