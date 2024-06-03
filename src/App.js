import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutContainer from './containers/LayoutContainer';
import HomePage from './pages/HomePage';
import BoardsPage from './pages/board/BoardsPage';
import WritePage from './pages/write/WritePage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; 
import {setUser} from "./modules/user/user"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let uuid = localStorage.getItem('userUUID'); // localStorage에서 UUID 조회

    if (!uuid) {
      // UUID가 없다면 새로 생성하여 localStorage에 저장
      uuid = uuidv4();
      localStorage.setItem('userUUID', uuid);
      // 저장된 UUID를 사용하여 사용자 정보 설정
      dispatch(setUser({id : uuid}));
    }

  }, [dispatch]);



  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutContainer />} >
          <Route index element={<HomePage />} />
          {/* Board */}
          <Route path='/boards' element={<BoardsPage />} />
          {/* Write(작성,수정) */}
          <Route path='/write' element={<WritePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
