import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import * as boardAPI from "../../api/boardApi";

function* fetchBoardsSaga(action){
  try {
    const boards = yield call(boardAPI.getBoardsAPI,action.payload);
    yield put ({
      type: "board/getBoardsSuccess",
      payload : boards
    });
    
  } catch (e) {
    yield put({
      type: "board/getBoardsError",
      error: true,
      payload: e.message,
    });
  }
}

function* setBoardsSaga(action) {
  try {
    const newBoard = action.payload;
    // 기존 상태를 가져오기 위해 select Effect를 사용
    const currentBoards = yield select(state => state.board.boards.data);
    // 새로운 게시글을 기존 게시글 배열에 추가
    const updatedBoards = [...currentBoards, newBoard];
    yield put({
      type: "board/setBoardsSuccess",
      payload: updatedBoards,
    });
  } catch (e) {
    yield put({
      type: "board/setBoardsError",
      error: true,
      payload: e.message,
    });
  }
}



function* boardSaga() {
  yield takeEvery("board/getBoards", fetchBoardsSaga);
  yield takeEvery("board/setBoards", setBoardsSaga);
}

export default boardSaga;


