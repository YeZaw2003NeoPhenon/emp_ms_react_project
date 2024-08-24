package com.example.employeemanagement_system.service;

import java.util.List;

import com.example.employeemanagement_system.entityModel.Employee;
import com.example.employeemanagement_system.entityModel.Manager;

public interface ManagerService {
	  List<Manager> getAllManagers();
	    Manager getManagerById(int id);
	    int insertIntoManager(Manager manager);
	    int updateManager(Manager manager);
	    int deleteManager(int id);
	    boolean existsById(int id );
	    Employee getEmployeeForManager(int id);
	    List<Manager> getManagersByEmployeeCount(int count);
}
