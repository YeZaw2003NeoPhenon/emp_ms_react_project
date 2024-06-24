package com.example.employeemanagement_system.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.example.employeemanagement_system.entityModel.Employee;
@Mapper
public interface EmployeeRepository {
	
	public abstract List<Employee> getAllEmployees();
	
	public abstract int insertIntoEmployee(Employee employee);
	
	public abstract int deleteEmployee( int id );
	
	public abstract Employee getEmployeeById( int id );
	
	public abstract int updateEmployee(Employee employee);
	
	public abstract List<Employee>getAllEmployeesWithManagers();
	

	
}
