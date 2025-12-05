import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './contexts/TaskContext';
import { Home } from './pages/Home';
import { AddTask } from './pages/AddTask';
import './App.css';

function App() {
  return (
    <Router>
      <TaskProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<AddTask />} />
        </Routes>
      </TaskProvider>
    </Router>
  );
}

export default App;
