import { createSlice } from "@reduxjs/toolkit";
import { reducerUtils } from "../../lib/asyncUtils";

const initialState = {
  user : reducerUtils.initial()
  ,
};

const userSlice = createSlice({ 
  name : "user",
  initialState,
  reducers: {
    getUser: (state) => ({
      ...state,
      user: reducerUtils.loading(),
    }),
    getUserSuccess: (state, action) => ({
      ...state,
      user: reducerUtils.success(action.payload),
    }),
    getUserError: (state, action) => ({
      ...state,
      user: reducerUtils.error(action.error),
    })
  }
})

export const {
  getUser,
  getUserSuccess,
  getUserError
} = userSlice.actions;

export default userSlice.reducer;