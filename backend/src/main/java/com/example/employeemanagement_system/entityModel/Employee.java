package com.example.employeemanagement_system.entityModel;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class Employee {

	@Getter
	@Setter
	@NotNull( message = "Id Can not be empty!")
	private int id;
	
	@Getter
	@Setter
    @NotNull(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
	private String name;
	
	@Getter
	@Setter
    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 60, message = "Age must be 60 or less than that")
	private int age ;
	
	@Getter
	@Setter
    @NotNull(message = "Role is required")
	private String role;
	
	 @Getter
	 @Setter
	 @NotNull(message = "Manager id is required")
	 private int manager_id;
	 
	 @Getter
	 @Setter
	private Manager manager;
	 
}
