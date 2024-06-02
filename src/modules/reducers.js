import { combineReducers } from "@reduxjs/toolkit";
import board from "./board/board";


const rootReducer = combineReducers({
  board,
});

export default rootReducer;