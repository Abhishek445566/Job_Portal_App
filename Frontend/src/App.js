import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

function App() {
  return (
    <div className="App">
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li>
            <Link to="/">Jobs</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/create">Create Job</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<JobForm />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
