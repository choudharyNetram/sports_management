import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/homepage.css';
import NotificationHandler from './Notify'; // Import NotificationHandler component

function HomePage() {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if not authenticated
      navigate('/login');
    } else {
      // Fetch tables data if authenticated
      fetchTables();
    }
  }, [navigate]);

  const fetchTables = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tables', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const jsonData = await response.json();
        setTables(jsonData);
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div>
      <h1>Tables</h1>
      <ul className="table-list">
        {tables.map((table) => (
          <li key={table} className="table-link">
            <Link to={`/table/${table}`}>
              {table} {/* Convert table name to uppercase */}
            </Link>
          </li>
        ))}
      </ul>
      <NotificationHandler /> {/* Render NotificationHandler component */}
    </div>
  );
}

export default HomePage;
