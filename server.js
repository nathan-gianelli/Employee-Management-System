const mysql = require('mysql')
const conTable = require('console.table');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "347*98Ng",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err
    console.log(`connected to port`);
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
          updateEmployeeWizard();
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
function viewDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res)
  })
  start()
};
// view roles
function viewRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.table(res)
  })
  start()
}
// view employee
function viewEmployee() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res)
  })
  start()
}
// update employee role
function updateEmployeeRole(roleId, employeeId) {
  connection.query("UPDATE employee SET role_id = "+roleId+" WHERE id = "+employeeId+";")
}

// {
//   id: 1,
//   first_name: 'Jeff',
//   last_name: 'Hoffman',
//   role_id: 1,
//   manager_id: null
// }

function updateEmployeeWizard() {
  var employeeName;
  var roleTitle;

  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // console.log(res)
    var employeeList = [];
    
    res.map((val, index, arr) => {
      console.log(val.first_name)
      employeeName = val.first_name;
      employeeList.push(val.first_name)  
      // return element to new Array
    });
    inquirer.prompt([
      {
      name: 'firstName',
      type: 'list',
      message: 'What is the name of the employee you would like to update?',
      choices: employeeList
      }
      ]).then(function(answer) {
        console.log(answer.firstName)
      var roleList = [];

        connection.query("SELECT * FROM role", function(err, response) {
          if (err) throw err
          response.map((val, index, arr) => {
            roleList.push(val.title)  
            // return element to new Array
          });
          inquirer.prompt([
            {
              name: 'roleTitle',
              type:'list',
              message: 'please select a role',
              choices: roleList
            }
          ]).then(function(roleAnswer) {
            console.log(roleAnswer)
            roleTitle = roleAnswer
            // new help updating employee with id
          })
        })
       // console.log(roleList)
        start()
        
      })
  })
}