import createSagaMiddleware from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import boardSaga from "./board/boardSaga";
import userSaga from "./user/userSaga";

const sagaMiddleware = createSagaMiddleware();


export function* rootSaga() {
  yield all([
    call(boardSaga),
    call(userSaga),
  ]);
}

export default sagaMiddleware;