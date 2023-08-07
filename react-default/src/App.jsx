import './App.css';

import { Navigate } from 'react-router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TheHeader from './components/TheHeader';
import TheButtons from './components/TheButtons';
import DayList from './pages/DayList';
import WordList from './pages/WordList';
import CreateDay from './pages/CreateDay';
import CreateWord from './pages/CreateWord';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TheHeader />
        <TheButtons />

        <Routes>
          <Route path="/" element={<Navigate replace to="/dayList" />} />
          <Route path="/dayList" element={<DayList />} />
          <Route path="/wordList/:day" element={<WordList />} />
          <Route path="/createWord" element={<CreateWord />} />
          <Route path="/createDay" element={<CreateDay />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
