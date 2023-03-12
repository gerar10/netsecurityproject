import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];
export const branchSlice = createSlice({
  name: "branchs",
  initialState,
  reducers: {
    setBranchs: (state, action) => {
      return [...action.payload];
    },
    deleteBranch(state, action) {
      return current(state).filter((element) => element !== action.payload);
    },
    unSetBranch(state, action) {
      return initialState;
    },
    editBranch(state, action) {
      const branchEdited = current(state).filter(
        (element) => element !== action.payload.branch
      );
      branchEdited.push(action.payload.branchEdit);
      return branchEdited;
    },
    newBranch(state, action) {
      return [...current(state)].push(action.payload);
    },
  },
});

export const { setBranchs, deleteBranch, unSetBranch, editBranch, newBranch } =
  branchSlice.actions;
