import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uiOpenNew: false,
};
export const modalSliceNew = createSlice({
  name: "modalCreate",
  initialState,
  reducers: {
    setUiOpenNew: (state, action) => {
      state.uiOpenNew = action.payload;
    },
    unSetModalNew() {
      return initialState;
    },
  },
});

export const { setUiOpenNew, unSetModalNew } = modalSliceNew.actions;
