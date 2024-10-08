package com.example.employeemanagement_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeemanagement_system.entityModel.Employee;
import com.example.employeemanagement_system.exception.managerAlreadyExistsException;
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
		if( !employeeRepository.isEmployeeExist(id).isPresent()) {
			 
		}
		
		return employeeRepository.deleteEmployee(id);
	}

	@Override
	public Employee getEmployeeById(int id) {
		
		return employeeRepository.getEmployeeById(id);
	}

	@Override
	public int updateEmployee(Employee employee) {
		if( !managerRepository.existsById(employee.getManager_id())) {
            throw new managerAlreadyExistsException("Manager with Id" + employee.getManager_id() + "already exists!");
		}
		return employeeRepository.updateEmployee(employee);
	}

	@Override
	public List<Employee> getAllEmployeesWithManagers() {
		return employeeRepository.getAllEmployeesWithManagers();
	}

	@Override
	public Optional<Employee> isEmployeeExist(int id) {
		return employeeRepository.isEmployeeExist(id);
	}
	
}
