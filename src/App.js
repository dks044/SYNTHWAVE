import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutContainer from './containers/LayoutContainer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutContainer />} >
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
