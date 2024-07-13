package com.example.employeemanagement_system.entityModel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

public class userDetailModel {
	
	@NotBlank(message = "User name is required")
	@Getter
	@Setter
	private String username;
	
	@NotBlank( message = "Password is required")
	@Size( min = 6 , message = "password must be at least 6 length long")
	@Getter
	@Setter
	private String password;
	
	@Getter
	@Setter
	private boolean enabled;
	
	@NotBlank( message = "authority is required")
	@Getter
	@Setter
	private String authority;

}
