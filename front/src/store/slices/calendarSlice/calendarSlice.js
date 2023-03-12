import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  activeEvent: null,
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    eventAddNew(state, action) {
      return {
        ...current(state),
        events: [...current(state).events, { ...action.payload }],
      };
    },
    eventSetActive(state, action) {
      return { ...current(state), activeEvent: action.payload };
    },
    unSetEventActive(state, action) {
      return { ...current(state), activeEvent: null };
    },
    eventUpdate(state, action) {
      return {
        ...current(state),
        events: current(state).events.map((element) =>
          element.id === action.payload.id ? action.payload : element
        ),
      };
    },
    eventDeleted(state, action) {
      return {
        ...current(state),
        events: current(state).events.filter(
          (element) => element !== action.payload
        ),
        activeEvent: null,
      };
    },
    branchEvents(state, action) {
      return {
        ...current(state),
        events: [...action.payload],
      };
    },
  },
});

export const {
  eventAddNew,
  eventSetActive,
  unSetEventActive,
  eventUpdate,
  eventDeleted,
  branchEvents,
} = calendarSlice.actions;
