package com.example.employeemanagement_system.controller;


import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeemanagement_system.entityModel.userDetailModel;
import com.example.employeemanagement_system.service.accountCreationServiceImp;

import jakarta.validation.Valid;

@RestController
public class accountCreationController {
	
	@Autowired
	private accountCreationServiceImp accountCreationServiceImp;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(accountCreationController.class);
	
	
	@RequestMapping(value = "/api/accountCreationProcess" , method = RequestMethod.POST , produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<Object> saveAccountCreation( @Valid @RequestBody userDetailModel authorizedUserObj, BindingResult bindingResult) {
		
		if( bindingResult.hasErrors()) {
			Map<String, Object> errorsMap = new HashMap<>();
			
			for( FieldError error :  bindingResult.getFieldErrors()) {
				errorsMap.put(error.getField(), error.getDefaultMessage());
			}
			
			Map<String, Object> response = new HashMap<>();
			response.put("success", false);
			response.put("count", -1);
			response.put("error", errorsMap);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		
		double output_val  = accountCreationServiceImp.accountCreationProcess(authorizedUserObj);

		if( output_val == 2 ) {
			LOGGER.info(" Account created blossomingly : {} " + authorizedUserObj.getUsername());
		}
		else {
			LOGGER.warn(" Someing hallaciously wrong with Account Creation Entry! : {} " + authorizedUserObj.getUsername());
		}
		
		return ResponseEntity.status(HttpStatus.CREATED).body("Account has been successfully setup!.. splickered back to some emoulments");
	}
}
