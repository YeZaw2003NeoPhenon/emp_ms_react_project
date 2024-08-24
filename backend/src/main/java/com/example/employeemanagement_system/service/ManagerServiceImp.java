package com.example.employeemanagement_system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeemanagement_system.entityModel.Employee;
import com.example.employeemanagement_system.entityModel.Manager;
import com.example.employeemanagement_system.repository.ManagerRepository;

@Service
public class ManagerServiceImp implements ManagerService {

	@Autowired
	private ManagerRepository managerRepository;
	
	
	@Override
	public List<Manager> getAllManagers() {
		return managerRepository.getAllManagers();
	}

	@Override
	public Manager getManagerById(int id) {
		return managerRepository.getManagerById(id);
	}

	@Override
	public int insertIntoManager(Manager manager) {
		return managerRepository.insertIntoManager(manager);
	}
	
	@Override
	public int updateManager(Manager manager) {
		return managerRepository.updateManager(manager);
	}

	@Override
	public int deleteManager(int id) {
		return managerRepository.deleteManager(id);
	}

	@Override
	public boolean existsById(int id) {
		return managerRepository.existsById(id);
	}

	@Override
	public Employee getEmployeeForManager(int id) {
		return managerRepository.selectEmployeeForParticularManager(id);
	}

	@Override
	public List<Manager> getManagersByEmployeeCount(int count) {
		return managerRepository.getManagersByEmployeeCount(count);
	}
	
}
