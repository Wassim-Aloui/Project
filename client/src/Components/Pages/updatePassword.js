import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';


function UpdatePassowrd() {
    const [password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        //Check if the passwords match

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Make a PUT request to update the password on the server
            await axios.put(`http://localhost:3001/user/updatePassword/${id}`, {
                password,
            });
            // Navigate to the login page after a successfull update
            navigate('/login');
            setError('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            setError(error.response.data.message);

        }
    };
    return (
        <section>
            <div className="mainDiv">
                <div className="cardStyle">
                    <form onSubmit={handleSubmit} name="loginForm" id="loginForm">

                        <div className="logoContainer">
                            <img src="/logo.png" alt="Logo" id="logo" />
                        </div>
                        <h1 className="formTitle">
                            Update your password
                        </h1>


                        <div className="inputDiv">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="inputDiv">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>



                        <div className="submit">
                            <button type="submit" id="submitButton" className="submitButton">
                                Update
                            </button>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </section>
    )
}

export default UpdatePassowrd;