package com.example.employeemanagement_system.exception;


public class managerAlreadyExistsException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public managerAlreadyExistsException(String message) {
		super(message);
	}
}
