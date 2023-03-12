import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uiOpen: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setUiOpen: (state, action) => {
      state.uiOpen = action.payload;
    },
    unSetModal() {
      return initialState;
    },
  },
});

export const { setUiOpen, unSetModal } = modalSlice.actions;
