package com.example.employeemanagement_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RequestParam;

import com.example.employeemanagement_system.entityModel.Employee;

public interface EmployeeService {
	public abstract List<Employee> getAllEmployees();
	
	public abstract int insertIntoEmployee(Employee employee);
	
	public abstract int deleteEmployee( int id );
	
	public abstract Employee getEmployeeById( int id );
	
	public abstract int updateEmployee(Employee employee);
	
   public abstract List<Employee> getAllEmployeesWithManagers();
	 
    public abstract Optional<Employee> isEmployeeExist( @RequestParam("employeeId")int id);
    
}


