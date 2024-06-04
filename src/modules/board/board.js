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
    postBoard: (state) => ({
      ...state,
      boards: reducerUtils.loading(),
    }),
    postBoardSuccess: (state, action) => ({
      ...state,
      boards: reducerUtils.success(action.payload),
    }),
    postBoardError: (state, action) => ({
      ...state,
      boards: reducerUtils.error(action.error),
    })
  }
})

export const {
  getBoards,
  getBoardsSuccess,
  getBoardsError,
  postBoard,
  postBoardSuccess,
  postBoardError
} = boardSlice.actions;

export default boardSlice.reducer;