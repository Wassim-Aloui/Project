import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const {logout } = useAuth();
  

  const handleLogout = () => {
  
    //Use the logout function from the AuthContext that set token to null 
    logout();
    //remove the token from the localstorage 
    localStorage.removeItem("token");
    navigate('/login');

  };

  return (
    <div>
      <button class="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
     
    </div>
  );
}

export default Logout;
