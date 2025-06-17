const Student = require('../models/Student');

// GET: All students (sorted by name)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
};

// POST: Add a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
};

// PUT: Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err.message });
  }
};

// DELETE: Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
};
