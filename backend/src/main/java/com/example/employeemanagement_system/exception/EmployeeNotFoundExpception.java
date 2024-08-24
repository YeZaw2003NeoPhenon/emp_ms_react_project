package com.example.employeemanagement_system.exception;

public class EmployeeNotFoundExpception extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public EmployeeNotFoundExpception(String message) {
		super(message);
	}
	
}
