const nodemailer = require('nodemailer');


// Create a nodemailer transporter using Gmail service
const transpoter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    },
});



module.exports.sendResetPassword = (email,cnt)=>{
    transpoter.sendMail({
        from:process.env.AUTH_EMAIL,//sender's email which is by default the email in the .env file 
        to:email,//Recipient's email
        subject:"Password Reset",
        html:`<h1>Password reset link</h1>
        <h2>Hello</h2>
        <p>Click here to reset your password</p>
        ${cnt}`
        
       
    }).catch((err)=>console.log(err));
}



