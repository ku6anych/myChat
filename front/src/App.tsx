import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/users/Login';

import Register from './features/users/Register';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';

const App = () => {
  return (
    <>
      <header>
        <AppToolBar />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
