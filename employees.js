const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Sinajoon12",
  database: "employeesDB"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Employees",
        "View Roles",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Exit"
      ]
    })
    .then(function (answer) {
      if (answer.action === "View Departments") {
        viewDepartments();
      } else if (answer.action === "View Employees") {
        viewEmployees();
      } else if (answer.action === "View Roles") {
        findAllRoles();
      } else if (answer.action === "Add Department") {
        addDepartment();
      } else if (answer.action === "Add Role") {
        addRole();
      } else if (answer.action === "Add Employee") {
        addEmployee();
      } else {
        connection.end();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "departmentAdd",
      type: "input",
      message: "What is the name of the Department?",
    })
    .then(function (answer) {
      connection.query(`INSERT INTO department (name) VALUES ("${answer.departmentAdd}")`, function (err, res) {
        if (err) throw err;
      });
    })
}

function addRole() {
  inquirer
    .prompt({
      name: "roleTitle",
      type: "input",
      message: "What is the name of the Role?",
    }, {
      name: "salary",
      type: "input",
      message: "What is the salary of the Role?(Use Decimal)",
    }, {
      
        name: "departmentId",
        type: "input",
        message: "What is the Id of the Role?(Use Decimal)",
      
    })
    .then(function (answer) {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleTitle}, ${answer.salary},                   ${answer.departmentId}")`, function (err, res) {
        if (err) throw err;
      });
      start();
    })
}

function addEmployee() {
  inquirer
    .prompt({
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    }, {
      name: "secondName",
      type: "input",
      message: "What is the employee's last name?",
    }, {
      name: "roleId",
      type: "input",
      message: "What is the employee's role id?"
    }, {
      name: "managerid",
      type: "input",
      message: "What is the employee's manager id?"
    })
    .then(function (answer) {
      connection.query(`INSERT INTO department (name) VALUES ("${answer.departmentAdd}")`, function (err, res) {
        if (err) throw err;
      });
    })
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\n Name: " + res[i].first_name + " " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id);
    }
  });
  start();
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\n Department ID: " + res[i].id + " || Department Name: " + res[i].name);
    }
  });
  start();
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\n Role ID: " + res[i].id + " || Role Name: " + res[i].title + "|| Role Salary: " + res[i].salary + "|| Department ID: " + res[i].department_id);
    }
  });
  start();
}

function findAllRoles() {
  connection.query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
  );
}
