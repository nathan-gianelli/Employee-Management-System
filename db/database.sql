DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department(
id int auto_increment,
name varchar(50),
primary key (id)
);

CREATE TABLE role (
id int auto_increment,
title varchar(30),
salary decimal,
department_id int ,
primary key(id),
foreign key (department_id) references department(id)
);

CREATE TABLE employee (
id int auto_increment,
first_name varchar(50),
last_name varchar(50),
role_id int,
manager_id int,
primary key(id),
foreign key(role_id) references role(id),
foreign key(manager_id) references role(id)
);

INSERT INTO department (name) 
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id) 
VALUES ("sales lead", 100000, 1), ("Engineering lead", 70000,2), ("finance lead", 150000, 3), ("legal lead", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Jeff", "Hoffman",1, null), ("Nathan", "Gianelli", 2, null), ("Julian", "Squires", 3, null), ("Cassidy", "Groenendaal",4,null);
