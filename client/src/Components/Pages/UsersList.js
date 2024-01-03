import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/listUsersStyle.css';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';


function UsersList() {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  //using localstorage because when we refresh the page, the component loses its state, including the token 
  useEffect(() => {
    // Check if there is no token in the context or local storage
    if (!token && !localStorage.getItem('token')) {
      // Redirect to the login page
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
         // Make a GET request to retrieve the list of users
        const response = await axios.get('http://localhost:3001/user/getAll');
        // Set the retrieved users in the state
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      
      <div className="page-container">
        <div className="sidebar">
          <div className="logo">
            <img src="./logo2.png" id='logo' alt="Logo" />
          </div>
          <ul>
            <li>
            <a href="*">Dashboards</a>
            </li>
            <li>
              <a href="*">Alerts</a>
            </li>
            <li>
              <a href="*">Cameras</a>
            </li>
            <li>
              <a href="*">Rules</a>
            </li>
            <li>
              <a href="*">Zones</a>
            </li>
            <li>
              <a href="*">Users</a>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <div className="Logout">
          <Logout />
          </div>
        
          <h1>Users</h1>
          <table className='tab'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default UsersList;
