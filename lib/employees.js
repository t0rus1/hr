var employeeDb = require('../database/employees');
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

// getEmployees
// Requires no parameters other than a callback 
// Will callback with null error value and employees array
function getEmployees(callback) {
  setTimeout(function() {
    callback(null, employeeDb);
  }, 500);
}

// getEmployee
// Requires employeeId and a callback
// Will callback with error value and an employee if possible
function getEmployee(employeeId, callback) {
  getEmployees(function(error, data) {
    if (error) {
      return callback(error);
    }
    var result = data.find(function(item) {
      return item.id === employeeId;
    });
    callback(null, result);
  });
}

