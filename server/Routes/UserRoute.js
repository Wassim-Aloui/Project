
const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {  sendResetPassword } = require('../Config/nodemailer');


// Secret key used for JWT token generation
var privateKey = "this is my secret key testjsdjsbdjdbdjbcjbkajdbqsjq"

//Register method
router.post('/register', async (req, res) => {
    try {
        // Extract relevant information from the request body
        const { username, password , email, phone } = req.body;
        // Hash the password using bcyrpt module to provide security
        const hashedPassword = await bcrypt.hash(password, 10);
        //Create new user instance then save it
        const user = new User({ username, password: hashedPassword, email, phone });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed : username or email exists' });
    }
});

//Login method
router.post('/login', async (req, res) => {
    try {
         // Extract username and password from the request body
        const { username, password } = req.body;
         // Find the user in the database by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Username does not exist' });
        }
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password does not exist' });
        }
        // Generate a JWT token with the user's ID that expires after one hour
        const token = jwt.sign({ userId: user._id }, privateKey, {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed ' });
    }
});


//Get all users method
router.get('/getAll', async (req, res) => {
    try {
        // Retrieve all created users
        const users = await User.find().lean();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

//Reset password method 
router.post('/resetPassword', async (req, res) => {
    try {
        // Extract email from the request body
        const { email } = req.body;
        //Find user by it's email
        const user = User.findOne({ email: email });
        user.exec().then((doc) => {
            if (doc) {
                //Generate the password reset link (it's the route on the client side towards the update password component)
                const cnt = `http://localhost:3000/updatePassword/${doc._id}`;
                //use the function created in the nodemailerconfig that allows to send emails 
                sendResetPassword(email, cnt);
                res.status(200).send('Password reset link sent successfully.');
            } else {
                res.status(404).send('Email does not exits'); // Adjust the status code and message accordingly
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error'); // Adjust the status code and message accordingly
    }
});

//update password method 
router.put('/updatePassword/:_id', async (req, res) => {
    try {
      const { _id } = req.params; // Extract _id from request parameters
      const { password } = req.body; //Extract password from request body 
  
      //find the user by id 
      const user = await User.findById(_id);
  
      if (!user) {
        throw new Error('User not found');
      }
      //Hash user passwords
      const hashedPassword = await bcrypt.hash(password, 10);
      
      //Add the new hashed password then save the new user
      user.password = hashedPassword;
  
      const updatedUser = await user.save();
    
  
      res.json("Password updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  });
  



 

module.exports = router;