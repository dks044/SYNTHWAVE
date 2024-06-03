import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutContainer from './containers/LayoutContainer';
import HomePage from './pages/HomePage';
import BoardsPage from './pages/board/BoardsPage';
import WritePage from './pages/write/WritePage';

function App() {
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
