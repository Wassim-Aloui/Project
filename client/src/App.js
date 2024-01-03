import './App.css';
import { Route, Routes } from 'react-router';
import Register from './Components/Pages/Register';
import Login from './Components/Pages/Login';
import UsersList from './Components/Pages/UsersList';
import PasswordRecovery from './Components/Pages/passwordRecovery';
import Logout from './Components/Pages/Logout';
import { AuthProvider } from './Components/Context/AuthContext';
import UpdatePassowrd from './Components/Pages/updatePassword';

 

function App() {
  return (

    <div>
      {/* Wrap the entire application with the AuthProvider to manage authentication state */}
       <AuthProvider>
        <Routes>
          <Route path='/' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/passwordRecovery' element={<PasswordRecovery />}></Route>
          <Route path='/users' element={<UsersList />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/updatePassword/:id' element={<UpdatePassowrd />}></Route>
        </Routes>
        </AuthProvider>
    </div>

  );
}

export default App;
