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

function* postBoardSaga(action) {
  try {
    const { newBoard, file } = action.payload;

    // 서버에 새로운 게시글 데이터 전송
    const response = yield call(boardAPI.addBoardAPI, newBoard, file);

    yield put({
      type: "board/postBoardSuccess",
      payload: response,
    });
    // 게시글 목록 갱신
    yield put({
      type: "board/getBoards",
    });
  } catch (e) {
    yield put({
      type: "board/postBoardError",
      error: true,
      payload: e.message,
    });
  }
}




function* boardSaga() {
  yield takeEvery("board/getBoards", fetchBoardsSaga);
  yield takeEvery("board/postBoard", postBoardSaga);
}

export default boardSaga;


