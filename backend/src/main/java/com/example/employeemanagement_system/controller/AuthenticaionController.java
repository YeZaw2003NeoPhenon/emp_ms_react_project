package com.example.employeemanagement_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeemanagement_system.entityModel.userDetailModel;
import com.example.employeemanagement_system.service.userDetailServiceImp;

@RestController
public class AuthenticaionController {
	
	@Autowired
	private userDetailServiceImp userDetailServiceImp;
	
	  @RequestMapping(value = "/api/authenticate" , method = RequestMethod.POST , produces = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<Object> authenticate( @RequestBody userDetailModel userDetailModel) {   
	        
	        boolean isAuthenticated = userDetailServiceImp.authenticate(userDetailModel.getUsername(), userDetailModel.getPassword());

	        if (isAuthenticated) {
	            return ResponseEntity.ok("Authentication successful");
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
	        }
	    }
}
