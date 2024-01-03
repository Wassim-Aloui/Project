import { useState } from 'react';
import axios from 'axios';
import '../Styles/formStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';




function Login() {

    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();




    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            //Form emptiness validation
            if (!username || !password) {
                setError('Please provide both username and password.'); 
                return;
            }

            // Make a POST request to the login server route
            const response = await axios.post('http://localhost:3001/user/login', {
                username: username,
                password: password,
            });
            //stock the token genarted in in the server side into a variable 
            const token = response.data.token;
            // Store the token in the context
            login(token);
            //store the token in the localstorage
            localStorage.setItem('token', token);
            // Redirect successful login to the users list
            navigate('/users');
        } catch (error) {
            //set the error from the server side in the error variable 
            setError(error.response.data.error);
        }
    };


    return (
        <section>
            <div className="mainDiv">
                <div className="cardStyle">
                    <form onSubmit={handleLogin} name="loginForm" id="loginForm">

                        <div className="logoContainer">
                            <img src="/logo.png" alt="Logo" id="logo" />
                        </div>
                        <h1 className="formTitle">
                            Login
                        </h1>

                        <div className="inputDiv">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder='User Name'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="inputDiv">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="inputDiv">
                            <div className="rememberMeContainer">
                                <label className="rememberMeText">
                                    <input type="checkbox" id="rememberMe" name="rememberMe" className="checkbox" />
                                    Remember Me
                                </label>
                             <Link to="/passwordRecovery">  <span className="forgotPasswordLink">I forgot my password</span></Link> 
                            </div>
                        </div>

                        <div className="submit">
                            <button type="submit" id="submitButton" className="submitButton">
                                Login
                            </button>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </section>
    );
}

export default Login;
