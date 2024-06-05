import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { v4 as uuidv4 } from 'uuid'; 


//user정보 얻기
function* fetchUserSaga(action){
  try {
    const user = yield call(action.payload);
    yield put ({
      type: "user/getUserSuccess",
      payload : user
    });
    
  } catch (e) {
    yield put({
      type: "user/getUserError",
      error: true,
      payload: e.message,
    });
  }
}

function* setUserId({payload}){
  try {
    const { id: uuid } = payload; 
    const user = { id: uuid };
    yield put ({
      type: "user/setUserSuccess",
      payload : user
    });
  } catch (e) {
    yield put({
      type: "user/setUserError",
      error: true,
      payload: e.message,
    });
  }
}

function* postUserLike({payload}) {
  try {
    const likeBoards = yield select(state => state.user.likeBoards.data || []);
    const updatedLikeBoards = [...likeBoards, payload]; 

    yield put({
      type: "user/postUserLikesSuccess",
      payload: updatedLikeBoards,
    });
  } catch (e) {
    yield put({
      type: "user/postUserLikesError",
      error: true,
      payload: e.message,
    });
  }
}

//userLikes정보 얻기
function* fetchUserLike(action){
  try {
    const likeBoards = yield call(action.payload);
    yield put ({
      type: "user/getUserLikesSuccess",
      payload : likeBoards
    });
    
  } catch (e) {
    yield put({
      type: "user/getUserLikesError",
      error: true,
      payload: e.message,
    });
  }
}

function* deleteUserLike({payload}){
  try {
    const likeBoards = yield select(state => state.user.likeBoards.data || []);
    const updatedLikeBoards = likeBoards.filter(id => id !== payload);

    yield put({
      type: "user/deleteUserLikesSuccess",
      payload: updatedLikeBoards,
    });

  } catch (e) {
    yield put({
      type: "user/deleteUserLikesError",
      error: true,
      payload: e.message,
    });
  }
}

function* postRatingBoards({payload}) {
  try {
    const ratingBoards = yield select(state => state.user.ratingBoards.data || []);
    const updatedRatingBoards = [...ratingBoards, payload]; 

    yield put({
      type: "user/postRatingBoardsSuccess",
      payload: updatedRatingBoards,
    });
  } catch (e) {
    yield put({
      type: "user/postRatingBoardsError",
      error: true,
      payload: e.message,
    });
  }
}



function* userSaga(){
  yield takeEvery("user/getUser", fetchUserSaga);
  yield takeEvery("user/setUser", setUserId);
  yield takeEvery("user/postUserLikes", postUserLike);
  yield takeEvery("user/getUserLikes", fetchUserLike);
  yield takeEvery("user/deleteUserLikes", deleteUserLike);
  yield takeEvery("user/postRatingBoards", postRatingBoards);
}

export default userSaga;

