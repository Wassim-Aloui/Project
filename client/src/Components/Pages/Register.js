import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/formStyle.css';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const validateEmail = (email) => {
        // Simple email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        // Check if the phone number is a valid 8-digit number
        const phoneRegex = /^\d{8}$/;
        return phoneRegex.test(phone);
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();

        //form emptiness validation
        if (!username || !email || !phone || !password) {
            setError('All form fields are required; none can be left empty'); 
            return;
        }
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePhone(phone)) {
            setError('Please enter a valid 8-digit phone number.');
            return;
        }

       

        try {
            // Make a POST request to the register server route
            const response = await axios.post('http://localhost:3001/user/register', {
                username,
                email,
                phone,
                password,
            });
            console.log(response.data.message);
           // Navigate to the login page after a successful register
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            setError(error.response.data.error);
        }
    };

    return (
        <section>
            <div className="mainDiv">
                <div className="cardStyle">
                    <form onSubmit={handleRegister} name="signupForm" id="signupForm">
                        <div className="logoContainer">
                            <img src="/logo.png" alt="Logo" id="logo" />
                        </div>
                        <h1 className="formTitle">Register</h1>

                        <div className="inputDiv">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                
                            />
                        </div>

                        <div className="inputDiv">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="inputDiv">
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="inputDiv">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                
                            />
                        </div>

                        <div className="submit">
                            <button type="submit" id="submitButton" className="submitButton">
                                Register
                            </button>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;
