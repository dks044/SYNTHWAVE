import { createSlice } from "@reduxjs/toolkit";
import { reducerUtils } from "../../lib/asyncUtils";

const initialState = {
  user: reducerUtils.initial(),
  likeBoards: reducerUtils.initial(),
  ratingBoards: reducerUtils.initial(),
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
    }),
    setUser: (state) => ({
      ...state,
      user: reducerUtils.loading(),
    }),
    setUserSuccess: (state, action) => ({
      ...state,
      user: reducerUtils.success(action.payload),
    }),
    setUserError: (state, action) => ({
      ...state,
      user: reducerUtils.error(action.error),
    }),

    getUserLikes: (state) => ({
      ...state,
      likeBoards: reducerUtils.loading(),
    }),
    getUserLikesSuccess: (state, action) => ({
      ...state,
      likeBoards: reducerUtils.success(action.payload),
    }),
    getUserLikesError: (state, action) => ({
      ...state,
      likeBoards: reducerUtils.error(action.error),
    }),
    postUserLikes: (state) => ({
      ...state,
      likeBoards: reducerUtils.loading(),
    }),
    postUserLikesSuccess: (state, action) => ({
      ...state,
      likeBoards: reducerUtils.success(action.payload),
    }),
    postUserLikesError: (state, action) => ({
      ...state,
      likeBoards: reducerUtils.error(action.error),
    }),
    deleteUserLikes: (state) => ({
      ...state,
      likeBoards: reducerUtils.loading(),
    }),
    deleteUserLikesSuccess: (state, action) => ({
      ...state,
      likeBoards: reducerUtils.success(action.payload),
    }),
    deleteUserLikesError: (state, action) => ({
      ...state,
      likeBoards: reducerUtils.error(action.error),
    }),
    postRatingBoards: (state) => ({
      ...state,
      ratingBoards: reducerUtils.loading(),
    }),
    postRatingBoardsSuccess: (state, action) => ({
      ...state,
      ratingBoards: reducerUtils.success(action.payload),
    }),
    postRatingBoardsError: (state, action) => ({
      ...state,
      ratingBoards: reducerUtils.error(action.error),
    }),
  }
})

export const {
  getUser,
  getUserSuccess,
  getUserError,
  setUser,
  setUserSuccess,
  setUserError,
  postUserLikes,
  postUserLikesSuccess,
  postUserLikesError,
  getUserLikes,
  getUserLikesSuccess,
  getUserLikesError,
  deleteUserLikes,
  deleteUserLikesSuccess,
  deleteUserLikesError,
  postRatingBoards,
  postRatingBoardsSuccess,
  postRatingBoardsError
} = userSlice.actions;

export default userSlice.reducer;