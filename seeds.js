var mongoose = require('mongoose');
const User = require('./models/user')
var async = require("async"); 


mongoose
    .connect('mongodb://localhost:27017/test3',{
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(()=>{console.log('Connection open')})
    .catch((err)=>{console.log(err)})

const data = [
  {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@gmail.com',
    dateOfBirth: '1999-10-20',
    mobile: 11111111,
    status: 0,
    password: '$2b$10$F5IXHk2jiqvWH1MmZQtQdObRfIDPevglpSzga5e5y1oOTo8Uns5TW',
    accountType: 'admin'
  },
  {
    firstName: 'user',
    lastName: 'user',
    email: 'user@gmail.com',
    dateOfBirth: '1999-10-21',
    mobile: 11111111,
    status: 1,
    password: '$2b$10$h/FhotNHBFBq5t/uwIDIXeTUrqwIgBTe9VNSDSP3Mk3S8JczhN1Hy',
    accountType: 'student'
  }
];
 
const seedDB = async ()=>{
    await User.deleteMany({});
    await User.insertMany(data);
};
seedDB().then(()=>{mongoose.connection.close();
});