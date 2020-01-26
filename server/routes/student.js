const express = require('express')
const {auth} = require('../middleware/auth');
const { addStudent, updateStudent, getStudents} =  require('../controllers/student.controller');

const router = express.Router()

router.get('/', auth, getStudents)

router.post('/', auth, addStudent);

router.put('/:studentId', auth, updateStudent)

module.exports = router;

