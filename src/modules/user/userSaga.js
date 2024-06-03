import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";


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

function* userSaga(){
  yield takeEvery("user/getUser",fetchUserSaga);
}

export default userSaga;

