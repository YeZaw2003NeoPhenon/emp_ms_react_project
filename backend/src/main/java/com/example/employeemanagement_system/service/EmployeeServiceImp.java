package com.example.employeemanagement_system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeemanagement_system.entityModel.Employee;
import com.example.employeemanagement_system.repository.EmployeeRepository;
import com.example.employeemanagement_system.repository.ManagerRepository;

@Service
public class EmployeeServiceImp implements EmployeeService{

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private ManagerRepository managerRepository;
	
	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.getAllEmployees();
	}

	@Override
	public int insertIntoEmployee(Employee employee) {
		
		return employeeRepository.insertIntoEmployee(employee);
	}

	@Override
	public int deleteEmployee(int id) {
		
		return employeeRepository.deleteEmployee(id);
	}

	@Override
	public Employee getEmployeeById(int id) {
		
		return employeeRepository.getEmployeeById(id);
	}

	@Override
	public int updateEmployee(Employee employee) {
		
		int managerId = employee.getManager_id();
		if( !managerRepository.existsById(managerId)) {
            throw new IllegalArgumentException("Manager with ID " + managerId + " does not exist.");
		}
		return employeeRepository.updateEmployee(employee);
	}

	@Override
	public List<Employee> getAllEmployeesWithManagers() {
		return employeeRepository.getAllEmployeesWithManagers();
	}
	
}
