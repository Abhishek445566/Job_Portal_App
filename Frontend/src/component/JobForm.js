import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const newJob = { 
        title, 
        description, 
        location, 
        company, 
        salary: parseFloat(salary)
      };
      await axios.post('http://localhost:8080/api/jobs', newJob, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Job created!');
      navigate('/');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Error creating job');
    }
  };

  return (
    <div>
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Location: </label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Company: </label>
          <input 
            type="text" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Salary: </label>
          <input 
            type="number" 
            value={salary} 
            onChange={(e) => setSalary(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}

export default JobForm;
