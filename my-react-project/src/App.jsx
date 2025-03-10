import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Create from './pages/Create';
import Play from './pages/Play';
import QuizCreationPage from './pages/QuizCreationPage';
import UpdatePage from './pages/UpdatePage';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="create"
            element={<Create />}
          />
          <Route
            path="play"
            element={<Play />}
          />
          <Route
            path="quizCreate"
            element={<QuizCreationPage />}
          />
          <Route
            path="quizUpdate/:id"
            element={<UpdatePage />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;