package com.example.employeemanagement_system.controller;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.example.employeemanagement_system.entityModel.Employee;
import com.example.employeemanagement_system.service.EmployeeServiceImp;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/employees")
public class EmployeeRestController {
	
	@Autowired
	private EmployeeServiceImp employeeServiceImp;
	
	
	private static final Logger employee_logger = LoggerFactory.getLogger(EmployeeRestController.class);
	
			
	@GetMapping(value = {"/" , "/employees"} , produces = MediaType.APPLICATION_JSON_VALUE )
	public List<Employee> getAllEmployees(){
		employee_logger.info("Fetching Employees Datas");
		List<Employee> employees = employeeServiceImp.getAllEmployees();
		employee_logger.info("Retrived Employees + {} ", employees.size());
		return employees;
	}
	
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
	@PostMapping(value = "/create" , produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> createEmployee( @Valid @RequestBody Employee employee , BindingResult rsResult) {
    	   employee_logger.info("Creating new employee with data: {}", employee);
    	if( rsResult.hasErrors()) {
            employee_logger.error("Validation errors while creating employee: {}", rsResult.getAllErrors());
    		return ResponseEntity.badRequest().body(rsResult.getAllErrors());
    	}
		int result =  employeeServiceImp.insertIntoEmployee(employee);
		
		if( result > 0 ) {
            employee_logger.info("Employee created successfully with ID: {}", employee.getId());
			return ResponseEntity.status(HttpStatus.CREATED).body("Employee created successfully");
		}
		else {
            employee_logger.error("Failed to create employee");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee creation failed!");
		}
	}
	
	@DeleteMapping(  value = "/delete/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteEmployee( @PathVariable int id ) {
		int result = employeeServiceImp.deleteEmployee(id);
        employee_logger.info("Deleting employee with ID: {}", id);
		if( result > 0 ) {
            employee_logger.info("Employee deleted successfully with ID: {}", id);
			return ResponseEntity.status(HttpStatus.CREATED).body("Employee deleted successfully");
		}
		else {
            employee_logger.error("Failed to delete employee with ID: {}", id);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee deletion failed!");
		}
	}

    @GetMapping( value ="/select/{id}" , produces = MediaType.APPLICATION_JSON_VALUE )
    @ResponseBody
    public ResponseEntity<Employee> getEmployeeById(@PathVariable int id ) {
        Employee employee = employeeServiceImp.getEmployeeById(id);
        employee_logger.info("Fetching employee with ID: {}", id);
        if( employee != null ) {
            employee_logger.info("Employee retrieved successfully with ID: {}", id);
        	return ResponseEntity.status(HttpStatus.OK).body(employee);
        	}
        else {
            employee_logger.error("Employee not found with ID: {}", id);
        	return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> updateEmployeeById(@PathVariable int id , @RequestBody Employee employee) {
        employee_logger.info("Updating employee with ID: {}", employee.getId());
        employee.setId(id);
        try {
            int result = employeeServiceImp.updateEmployee(employee);
            if (result > 0) {
                employee_logger.info("Employee updated successfully with ID: {}", employee.getId());
                return new ResponseEntity<String>("Employee Updated Successfully", HttpStatus.OK);
            } else {
                employee_logger.error("Failed to update employee with ID: {}", employee.getId());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update employee! Try again!");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
	 @GetMapping(value ="/with-managers" , produces = MediaType.APPLICATION_JSON_VALUE)
	  @ResponseStatus(HttpStatus.OK)
	    public List<Employee> getAllEmployeesWithManagers() {
	       employee_logger.info("Fetching Employees Datas Recuperated With Managers ");
	       List<Employee> employee_list=  employeeServiceImp.getAllEmployeesWithManagers();
	       employee_logger.info("Retrived Employees + {} ", employee_list.size());
	       return employee_list;
	    }
}
