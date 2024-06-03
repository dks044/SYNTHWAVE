import { createSlice } from "@reduxjs/toolkit";
import { reducerUtils } from "../../lib/asyncUtils";

const initialState = {
  boards : reducerUtils.initial(),
  board : reducerUtils.initial()
}

const boardSlice = createSlice({ 
  name : "board",
  initialState,
  reducers: {
    getBoards: (state) => ({
      ...state,
      boards: reducerUtils.loading(),
    }),
    getBoardsSuccess: (state, action) => ({
      ...state,
      boards: reducerUtils.success(action.payload),
    }),
    getBoardsError: (state, action) => ({
      ...state,
      boards: reducerUtils.error(action.error),
    }),
    setBoards: (state) => ({
      ...state,
      boards: reducerUtils.loading(),
    }),
    setBoardsSuccess: (state, action) => ({
      ...state,
      boards: reducerUtils.success(action.payload),
    }),
    setBoardsError: (state, action) => ({
      ...state,
      boards: reducerUtils.error(action.error),
    })
  }
})

export const {
  getBoards,
  getBoardsSuccess,
  getBoardsError,
  setBoards,
  setBoardsSuccess,
  setBoardsError
} = boardSlice.actions;

export default boardSlice.reducer;