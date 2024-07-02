# Employee Management System - Full-Stack Project

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Backend](#backend)
- [Frontend](#frontend)
- [Running Guide](#running-guide)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Description

The Employee Management System is a basic CRUD application built with React for the frontend and Spring Boot for the backend. It allows users to add, edit, view, and delete employee records. Additionally, it includes a `ManagerTable` feature for managing and viewing manager-specific data.


## Features

- Add, edit, view, and delete employee records
- Responsive design
- Form validation with Formik and Yup
- Secure authentication
- Manage and view manager-specific data with `ManagerTable`
## Technologies Used

### Backend

- **Spring REST API** - Framework for building the backend API
- **MyBatis** - Persistence framework for interacting with the database
- **PostgreSQL** - Relational database


### Frontend

- **React** - JavaScript library for building user interfaces
- **React Router** - For navigation
- **Formik** - For form management and validation
- **Axios** - For making HTTP requests
- **Bootstrap** - For responsive design
  

### Setting Up PostgreSQL

1. **Install PostgreSQL:**
   Follow the instructions on the [official PostgreSQL website](https://www.postgresql.org/download/) to install PostgreSQL on your system.

2. **Create a Database:**
   ```sql

## Running Guide

# Database Configuration
``spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=your_username
spring.datasource.password=your_password
``

# MyBatis Configuration
``mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true
mybatis.mapper-locations=classpath:mappers/*.xml
``

**Backend Setup**
``git clone https://github.com/YeZaw2003NeoPhenon/emp_ms_react_project.git
cd emp_ms_react_project/backend``

``./mvnw spring-boot:run``

**Frontend Setup**

``cd ../frontend``

``npm install``

``npm start``
