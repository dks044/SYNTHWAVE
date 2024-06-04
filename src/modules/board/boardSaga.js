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

function* fetchBoardSaga(action) {
  try {
    const board = yield call(boardAPI.getBoardByIdAPI, action.payload);
    yield put({
      type: "board/getBoardSuccess",
      payload: board,
    });
  } catch (e) {
    yield put({
      type: "board/getBoardError",
      error: true,
      payload: e.message,
    });
  }
}

function* patchBoardSaga(action) {
  try {
    const { id, updatedBoard } = action.payload;
    const response = yield call(boardAPI.patchBoardAPI, id, updatedBoard);

    yield put({
      type: "board/patchBoardSuccess",
      payload: response,
    });
    // 게시글 목록 갱신
    yield put({
      type: "board/getBoards",
    });
  } catch (e) {
    yield put({
      type: "board/patchBoardError",
      error: true,
      payload: e.message,
    });
  }
}

function* deleteBoardSaga(action) {
  try {
    const response = yield call(boardAPI.deleteBoardAPI, action.payload);

    yield put({
      type: "board/deleteBoardSuccess",
      payload: response,
    });
    // 게시글 목록 갱신
    yield put({
      type: "board/getBoards",
    });
  } catch (e) {
    yield put({
      type: "board/deleteBoardError",
      error: true,
      payload: e.message,
    });
  }
}


function* boardSaga() {
  yield takeEvery("board/getBoards", fetchBoardsSaga);
  yield takeEvery("board/getBoard", fetchBoardSaga);
  yield takeEvery("board/postBoard", postBoardSaga);
  yield takeEvery("board/patchBoard", patchBoardSaga);
  yield takeEvery("board/deleteBoard", deleteBoardSaga);
}

export default boardSaga;


