const Joi = require('joi');
const { Student } = require('../models/student')

const validateStudent = (body) => {
  const schema = {
      name: Joi.string().required(),
      roll_no: Joi.string().required(),
      degree: Joi.string().required(),
      city: Joi.string().required()
  }

  const result = Joi.validate(body, schema);
  return result
}

async function getStudents(req, res) {
  try {
    const students = await Student.find()
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
}


async function addStudent(req, res) {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let student = new Student({
      name: req.body.name,
      roll_no: req.body.roll_no,
      degree: req.body.degree,
      city: req.body.city
    });
    student = await student.save()
    res.send(student);
  } catch (error) {
    res.status(500).send(error)
  }



}

async function updateStudent(req, res) {

  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(req.params.studentId,
    {
      name: req.body.name,
      roll_no: req.body.roll_no,
      degree: req.body.degree,
      city: req.body.city
    }, { new: true });

  if (!student) return res.status(404).send('The Student with the given ID was not found.');

  res.send(student);

}

module.exports = { getStudents, addStudent, updateStudent };



