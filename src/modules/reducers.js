import { combineReducers } from "@reduxjs/toolkit";
import board from "./board/board";
import user from "./user/user";


const rootReducer = combineReducers({
  board,
  user
});

export default rootReducer;