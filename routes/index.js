const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator');
const user = require('./user');
const admin = require('./admin');
const student = require('./student');


//user
router.post('/user/sendmail',user.sendsignupmail);
router.post('/user/login', validator.login, user.login);
router.post('/user/register',user.createUser);

//student
router.get('/student/notes/:id',student.getNotesByUserID);
router.get('/student/note/:id',student.getNoteByID);
router.post('/student/note/create',student.createNote);
router.put('/student/note/update/:id',student.update);
router.delete('/student/note/delete/:id',student.delete);

//admin
router.get('/admin/users/:no',admin.getUsers);
router.get('/admin/user/:id',admin.getUserByID);

module.exports = router;
