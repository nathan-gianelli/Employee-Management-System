const mysql = require('mysql')
const conTable = require('console.table');
const inquirer = require('inquirer');
const PORT = 3306

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "347*98Ng",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err
    console.log(`connected to port ${PORT}`);
    start();
});

function start() {
inquirer.prompt([
      { 
        name: "menu",
        type: "list",
        message: "What option would you like to chose?",
        choices: 
        [
            "add department",
            "add roles",
            "add employees",
            "view all departments",
            "view all roles",
            "view all employees",
            "update employee roles",
            "Quit"
        ]
      }
  ])
  .then(function(answer) {
        switch (answer.menu) {
        case "add department":
          newDepartment();
          break;

        case "add roles":
          newRole();
          break;
        
        case "add employees":
          newEmployee();
          break;

        case "view all departments":
          viewDepartment();
          break;

        case "view all roles":
          viewRole();
          break;

        case "view all employees":
          viewEmployee();
          break;

        case "update employee roles":
          updateEmployeeRole();
          break;

        case "Quit":
          connection.end()
        }
      });
}
// add a new department
function newDepartment() {
  inquirer.prompt({
    name: 'newDepartment',
    message: 'What is the name of the deparment you would like to add?'
  }).then(function(answer) {
    connection.query("INSERT INTO department (name) VALUE (?)", answer.newDepartment, function(err, res) {
      if (err) throw err;
    });
    start();
  })
};
// add a new role
function newRole() {
  inquirer.prompt([
    {
    name: 'roleName',
    message: 'What is the name of the role you would like to add?'
    },
    {
    name: 'roleSalary',
    message:'what is the salary for your new role?'
    },
    {
    name:'roleDepartmentId',
    message:'what is the department ID for this role'
    }
    ]).then(function(answer) {
      connection.query("INSERT INTO role SET ?", {title: answer.roleName, salary: answer.roleSalary, department_id: answer.roleDepartmentId}, function(err, res) {
        if (err) throw err
      })
      start();
    })
};
// add a new employee
function newEmployee() {
  inquirer.prompt([
    {
      name: 'addFirst',
      message: 'What is the employees first name?'
    },
    {
      name: 'addLast',
      message: 'what is the employees last name?'
    },
    {
      name: 'addRoleId',
      message: 'what is the role ID for this employee?'
    },
    {
      name: 'addManagerId',
      message: 'what is the manager ID for this employee?'
    }
  ]).then (function(answer) {
    connection.query("INSERT INTO employee SET ?", {first_name: answer.addFirst, last_name: answer.addLast, role_id: answer.addRoleId, manager_id: answer.addManagerId}, function(err, res) {
      if (err) throw err
    })
    start();
  }) 
};
// view deparment
