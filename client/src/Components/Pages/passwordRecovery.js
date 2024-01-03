import React, { useState,useEffect } from "react";
import axios from 'axios';
import '../Styles/formStyle.css';
import { useNavigate } from 'react-router-dom';



function PasswordRecovery() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage("");
        // Make a POST request to the resetPassword server route
        const response = axios
            .post("http://localhost:3001/user/resetPassword", { email })
            .then((response) => {
                console.log(response.data.message);
                setSuccess("Email sent successfully")

            })
            .catch((error) => {
                console.error(error.response.data);
                setErrorMessage(error.response.data);
            });
    };

    return (
        <section>
            <div className="mainDiv">
                <div className="cardStyle">
                    <form action="" method="post" name="signupForm" id="signupForm" onSubmit={handleSubmit} >

                        <div className="logoContainer">
                            <img src="/logo.png" alt="Logo" id="logo" />

                        </div>
                        <h1 className="formTitle">
                            Password Recovery
                        </h1>

                        <div className="inputDiv">

                            <input type="email" id="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  required />
                        </div>


                        <div className="submit">
                            <button type="submit" id="submitButton" className="submitButton ">
                                send email

                            </button>

                        </div>

                    </form>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {success && <p  className="success">{success}</p>}
                </div>
            </div>
        </section>
    )
}

export default PasswordRecovery;