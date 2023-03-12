import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];
export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      return [...action.payload];
    },
    deleteClient(state, action) {
      return current(state).filter((element) => element !== action.payload);
    },
    editClient(state, action) {
      const clientEdited = current(state).filter(
        (element) => element !== action.payload.client
      );
      clientEdited.push(action.payload.clientEdit);
      return clientEdited;
    },
    unSetClient(state, action) {
      return initialState;
    },
    newClient(state, action) {
      return [...current(state)].push(action.payload);
    },
  },
});

export const { setClients, deleteClient, editClient, unSetClient, newClient } =
  clientsSlice.actions;
