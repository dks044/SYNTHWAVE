import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";
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

function* boardSaga() {
  yield takeEvery("board/getBoards", fetchBoardsSaga);

}

export default boardSaga;


