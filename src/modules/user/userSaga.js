import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";
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

function* userSaga(){
  yield takeEvery("user/getUser", fetchUserSaga);
  yield takeEvery("user/setUser", setUserId); 
}

export default userSaga;

