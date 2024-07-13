# Employee Management System - Full-Stack Project

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Backend](#backend)
- [Frontend](#frontend)
- [Running Guide](#running-guide)
- [Technologies Used](#technologies-used)
- [Spring Security Integration](#spring-security-integration)
- [Contributing](#contributing)

## Description

The Employee Management System is a basic CRUD application built with React for the frontend and Spring Boot for the backend. It allows users to add, edit, view, and delete employee records. Additionally, it includes a `ManagerTable` feature for managing and viewing manager-specific data.


## Features

- Add, edit, view, and delete employee records
- Responsive design
- Form validation with Formik and Yup
- Manage and view manager-specific data with `ManagerTable`

## Technologies Used

### Backend

- **Spring REST API** - Framework for building the backend API
- **MyBatis** - Persistence framework for interacting with the database
- **PostgreSQL** - Relational database
- **Spring Security** - Framework for securing the application


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
   ```CREATE DATABASE employee_management_system```

## Running Guide

# Database Configuration
 ```spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=your_username
spring.datasource.password=your_password
 ```

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

## Spring Security Integration

Enhance the security of your Employee Management System with Spring Security, providing robust authentication and authorization mechanisms.

### Authentication

Spring Security ensures secure login functionality by verifying user identities through credentials validation. Users authenticate using their unique username and password combination.

### Authorization

Control access to system resources based on user roles (e.g., ADMIN, USER) with Spring Security's powerful authorization features. Define specific permissions and restrict actions accordingly.

### Implementation

Implement Spring Security **majestically** to:
- Safeguard your application against unauthorized access.
- Manage user authentication and role-based access control (RBAC) predominently.

For detailed configuration and setup instructions, explore the security configuration within your backend project.

### Usage

Spring Security secures the application by:
- Authenticating users with their credentials.
- Authorizing access based on user roles.
  

### Contributing

## Fork the Repository:
**We welcome contributions to enhance the project! Follow these steps to contribute:
Click the "Fork" button at the top right of the repository page.**

## Create a New Branch:
```git checkout -b feature/your-feature```

## Make Your Changes:
Implement your feature or bug fix.

## Commit Your Changes:
```git commit -m "Add feature: your feature description"```

## Push To The Branch
```git push origin feature/your-feature```

## Create a Pull Request:
Open a pull request on GitHub and describe your changes.

### Acknowledgements
🙏
Special thanks to the open-source community for the tools and libraries used in this project



