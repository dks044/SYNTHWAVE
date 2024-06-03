import createSagaMiddleware from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import boardSaga from "./board/boardSaga";
import userSaga from "./user/userSaga";
import { v4 as uuidv4 } from 'uuid';

const sagaMiddleware = createSagaMiddleware();

// 앱이 시작될 떄
function* initializeAppSaga() {
  const uuid = uuidv4(); // UUID 생성
  // UUID를 사용자 상태에 저장하는 액션 디스패치
  yield put({
    type: "user/getUserSuccess",
    payload: { uuid }
  });
}

export function* rootSaga() {
  // 애플리케이션 초기화 사가를 가장 먼저 등록
  yield takeLatest("app/initialize", initializeAppSaga);
  yield all([
    call(boardSaga),
    call(userSaga),
  ]);
}

export default sagaMiddleware;