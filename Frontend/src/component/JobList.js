import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      let url = 'http://localhost:8080/api/jobs';
      if (searchKeyword) {
        url = `http://localhost:8080/api/jobs/search?keyword=${searchKeyword}`;
      }
      const response = await axios.get(url, { headers });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <h2>Job Listings</h2>
      <div>
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={fetchJobs}>Search</button>
      </div>
      <ul style={{ padding: 0 }}>
        {jobs.map((job) => (
          <li key={job.id} style={{ border: '1px solid #ccc', margin: '0.5rem', padding: '1rem' }}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Company: {job.company}</p>
            <p>Salary: {job.salary}</p>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
