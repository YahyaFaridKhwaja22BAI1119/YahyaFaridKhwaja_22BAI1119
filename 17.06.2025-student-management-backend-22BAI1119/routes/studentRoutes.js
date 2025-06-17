const express = require('express');
const {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const protectAdmin = require('../middleware/auth');

const router = express.Router();

// Routes
router.get('/', protectAdmin, getAllStudents);
router.post('/', protectAdmin, createStudent);
router.put('/:id', protectAdmin, updateStudent);
router.delete('/:id', protectAdmin, deleteStudent);

module.exports = router;
