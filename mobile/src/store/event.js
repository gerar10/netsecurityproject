import { createAction, createReducer } from "@reduxjs/toolkit";

export const userGetEvent = createAction("GET_EVENT")

const initialState = 
    [
        {
          id: "",
          date: "",
          time_in: "",
          position_in_latitude: "",
          position_in_longitude: "",
          time_out: "",
          position_out_latitude: "",
          position_out_longitude: "",
          branchId: 1,
          guardId: 1,
          shiftId: 1,
          branch: {
            fulladdress: "",
            coordinates: "",
            id: "",
            name: "",
            street: "",
            number: "",
            city: "",
            province: "",
            postalcode: "",
            latitude: "",
            longitude: "",
            active: "",
            createdAt: "",
            updatedAt: "",
            clientId: "",
          },
          shift: {
            id: "",
            type: "",
            start: "",
            end: "",
            createdAt: "",
            updatedAt: "",
          }
        }
      ]

const userEvent = createReducer(initialState, {
    [userGetEvent]: (state, action) => action.payload,
})      

export default userEvent