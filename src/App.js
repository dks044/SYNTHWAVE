import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutContainer from './containers/LayoutContainer';
import HomePage from './pages/HomePage';
import BoardPage from './pages/board/BoardPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutContainer />} >
          <Route index element={<HomePage />} />
          {/* Board */}
          <Route path='/board' element={<BoardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
