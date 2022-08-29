const response = require('../helpers/response');
var await = require('await')
const userModel = require('../models/user');
var nodemailer = require('nodemailer');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { result } = require('lodash');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gspremaratne@gmail.com',
        pass: 'ofjlkpttskgiwtrk'
    }
});

const userRoutes = {

    sendsignupmail: async (req, res) => {

        const { email } = req.body;
        const userData = {
            email: email,
            password: "12345"
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                throw err;
            } else {
                bcrypt.hash(userData.password, salt, function (err, hash) {
                    if (err) {
                        throw err;
                    } else {


                        const user = new userModel({
                            
                            firstName: null,
                            lastName: null,
                            email: email,
                            dateOfBirthday: null,
                            mobile: null,
                            status: 1,
                            password: hash,
                            accountType: 'student'
                            
                        });
                        user.save().then(data => {
                           
                            const mailOptions = {
                                from: 'gspremaratne@gmail.com', // sender address
                                to: email, // list of receivers
                                subject: 'YOUR SIGN UP LINK', // Subject line
                                html: '<p>Hello,<br><br>Please follow this link to sign up.</p> <a href="localhost:3000/main">localhost:3000/main</a>. <br> Your temporary password is <b>12345</b>. '// plain text body
                            };

                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err)
                                    console.log(err)
                                else
                                    console.log(info);
                            });
                            return res.send(JSON.stringify({ "status": 200, "error": null, "response": "success" }));
                        }).catch(err => {
                            response.fail(req, res, response.messages.db_error, 'create temporary user', err);

                            return;
                        });

                    }
                })
            }
        });


    },

    login: (req, res) => {

        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        userModel.find({email:email}, (err, user) => {
            //console.log(user)
            if (user.length === 0)  {
                
                response.fail(req, res, response.messages.not_found, 'Login user', err);

                return;
            } else {
                
                    bcrypt.compare(password, user[0].password, function (err, hash) {
                        if (hash) {
                            const date_objt = new Date();
                            const miliseconds = 1 * 1000 * 60 * 60 * 8.5; // 8.5 hours

                            date_objt.setTime(date_objt.getTime() + miliseconds);

                            const token = jwt.encode({
                                exp: date_objt,
                                user_id: user[0]._id,
                                type: user[0].accountType,
                                status:user[0].status

                            }, process.env.SURGE_AUTH_SECRET);

                            user[0].token = token;
                            delete user[0].password;


                            response.success(req, res, token, 'Login success');
                            return;
                        } else {
                            response.fail(req, res, response.messages.db_error, 'Invalid password');

                            return;
                        }
                    });
                
            }
        });
    },

    createUser: (req, res) => {
        
        const { fname, lname, dob, email, password, mobile } = req.body;
      
        userModel.find({email:email}, (err, user) => {
            //console.log(user)
            if (user.length === 0)  {
                
                response.fail(req, res, response.messages.not_found, 'Login user', err);

                return;
            } else {
                const id = user[0]._id
                console.log(id)
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    if (err) {
                        throw err;
                    } else {
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err) {
                                throw err;
                            } else {
        
                                const user= {
                                    
                                    firstName: fname,
                                    lastName: lname,
                                    dateOfBirth: dob,
                                    mobile: mobile,
                                    status: 0,
                                    password: hash,
                                    accountType: 'student'
                                    
                                };
        
                                // userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                                ((err, result) =>{
                                    if (err) {
                                        response.fail(req, res, response.messages.db_error, 'Register user', err);
                                        return;
                                    }
                                    else {
        
                                        response.success(req, res, result, 'Successfully registered');
                                        return;
                                    }
                                })
                                userModel.updateOne({_id:id},
                                {$set: 
                                    { "firstName" : user.firstName, 
                                    "lastName": user.lastName, 
                                    "dateOfBirth":user.dateOfBirth, 
                                    "mobile":user.mobile, 
                                    "status":user.status, 
                                    "password":user.password, 
                                    "accountType":user.accountType
                                }}).then(result =>{
                                    if (!result) {
                                        response.fail(req, res, response.messages.db_error, 'Register user', result);
                                        return;
                                    }
                                    else {
        
                                        response.success(req, res, result, 'Successfully registered');
                                        return;
                                    }
                                })
                            }
                            
                            })
                    
                        }
                    })
                }
     
            })
    },
};
module.exports = userRoutes;
