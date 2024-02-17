// Include the filesystem module to read/write files
const fs = require('fs');

// Data class to store students and courses
class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

// Variable to hold the initialized data
let dataCollection = null;

// Initializes the data by reading from JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    // Read student data from file
    fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
      if (err) {
        reject("Unable to read students.json");
        return;
      }

      // Read course data from file
      fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
        if (err) {
          reject("Unable to read courses.json");
          return;
        }

        // Parse the JSON data and store in dataCollection
        dataCollection = new Data(JSON.parse(studentDataFromFile), JSON.parse(courseDataFromFile));
        resolve("Data initialized successfully");
      });
    });
  });
}

// Retrieves all students from the collection
function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      resolve(`Successfully retrieved ${dataCollection.students.length} students`);
    } else {
      reject("No results returned");
    }
  });
}

// Retrieves all courses from the collection
function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.courses.length > 0) {
      resolve(`Successfully retrieved ${dataCollection.courses.length} courses`);
    } else {
      reject("No results returned");
    }
  });
}

// Retrieves all TAs from the student collection
function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      const tas = dataCollection.students.filter(student => student.TA === true);
      resolve(`Successfully retrieved ${tas.length} TAs`);
    } else {
      reject("No results returned");
    }
  });
}

// Filters students by course
function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      const studentsInCourse = dataCollection.students.filter(student => student.course === course);
      if (studentsInCourse.length > 0) {
        resolve(studentsInCourse);
      } else {
        reject("No results returned");
      }
    } else {
      reject("No results returned");
    }
  });
}

// Finds a student by their student number
function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      const student = dataCollection.students.find(student => student.studentNum === num);
      if (student) {
        resolve(student);
      } else {
        reject("No results returned");
      }
    } else {
      reject("No results returned");
    }
  });
}

// Exports the functions for use in other parts of the application
module.exports = {
  initialize,
  getAllStudents,
  getCourses,
  getTAs,
  getStudentsByCourse,
  getStudentByNum
};
