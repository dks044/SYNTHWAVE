import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";
import boardSaga from "./board/boardSaga";


const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  // 예시
  // yield all([call(vocaSaga), call(vocaBookSaga),call(userLearnPerformanceSaga),
  //           call(grammarBookSaga),call(grammarSaga),call(myVocaBookSaga),call(myVocaSaga)]);
  yield all([call(boardSaga), ]);

}

export default sagaMiddleware;