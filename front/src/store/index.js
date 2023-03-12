import { configureStore } from "@reduxjs/toolkit";
import {
  modalSlice,
  userSlice,
  modalSliceNew,
  clientsSlice,
  guardSlice,
  branchSlice,
  calendarSlice,
} from "./slices";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    modalCreate: modalSliceNew.reducer,
    clients: clientsSlice.reducer,
    guards: guardSlice.reducer,
    branchs: branchSlice.reducer,
    calendar: calendarSlice.reducer,
  },
});
