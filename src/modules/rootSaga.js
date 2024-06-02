import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";
import boardSaga from "./board/boardSaga";


const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([call(boardSaga), ]);

}

export default sagaMiddleware;