package com.example.employeemanagement_system.entityModel;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Manager {
	
	@NotNull(message = "Manager id must not be null")
	@Max(value = 1000 , message = "Manager id must not be beyond 1000")
	private int id ;
	
	@NotNull( message = " name must not be null")
	@Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
	private String name ;
	
	
	@NotNull( message = "Department is essentially required ")
	private String department;
}
