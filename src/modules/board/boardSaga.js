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
    const { id, updatedBoard, file } = action.payload; //file 도 분해해서 가져옴
    const response = yield call(boardAPI.patchBoardAPI, id, updatedBoard, file); // 여기에 file을 전달

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

function* increaseBoardLikesSaga(action){
  try {
    const response = yield call(boardAPI.IncreaseLikesBoardAPI,action.payload);
    yield put ({
      type: "board/increaseBoardLikesSuccess",
      payload : response
    });
    // 게시글 목록 갱신
    yield put({
      type: "board/getBoards",
    });
  } catch (e) {
    yield put({
      type: "board/increaseBoardLikesError",
      error: true,
      payload: e.message,
    });
  }
}

function* decreaseBoardLikesSaga(action){
  try {
    const response = yield call(boardAPI.DecreaseLikesBoardAPI,action.payload);
    yield put ({
      type: "board/decreaseBoardLikesSuccess",
      payload : response
    });
    // 게시글 목록 갱신
    yield put({
      type: "board/getBoards",
    });
  } catch (e) {
    yield put({
      type: "board/decreaseBoardLikesError",
      error: true,
      payload: e.message,
    });
  }
}

//레이팅 업데이트
function* patchBoardRatingUserSaga(action){
  try {
    console.log(action.payload);
    const response = yield call(boardAPI.ratingBoardAPI, action.payload.boardId, action.payload.userId, action.payload.rating);
    yield put ({
      type: "board/patchBoardRatingUserSuccess",
      payload : response
    });
    // 게시글 목록 갱신
    yield put({
      type: "board/getBoards",
    });
  } catch (e) {
    yield put({
      type: "board/patchBoardRatingUserError",
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
  yield takeEvery("board/increaseBoardLikes", increaseBoardLikesSaga);
  yield takeEvery("board/decreaseBoardLikes", decreaseBoardLikesSaga);
  yield takeEvery("board/patchBoardRatingUser", patchBoardRatingUserSaga);
}

export default boardSaga;


