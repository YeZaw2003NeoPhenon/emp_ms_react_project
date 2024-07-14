package com.example.employeemanagement_system.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeemanagement_system.entityModel.userDetailModel;
import com.example.employeemanagement_system.service.userDetailServiceImp;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class AuthenticaionController {
	
	@Autowired
	private userDetailServiceImp userDetailServiceImp;
	
	  @RequestMapping(value = "/api/authenticate" , method = RequestMethod.POST , produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<Object> authenticate( @RequestBody userDetailModel userDetailModel) {   
	        
	        boolean isAuthenticated = userDetailServiceImp.authenticate(userDetailModel.getUsername(), userDetailModel.getPassword());
	        
	        if (isAuthenticated) {
	            return ResponseEntity.ok("Authentication successful");
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
	        }
	    }
	  
	  @RequestMapping(value = "/api/logout" , method = RequestMethod.POST , produces = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<Object> logout(HttpServletResponse response , HttpServletRequest request ) {   
	        
		 Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
		  
		 if( authentication != null ) {
			 new SecurityContextLogoutHandler().logout(request, response, authentication);
		 }
		 
         Cookie successCookie = new Cookie("logoutSuccess", "true");
         successCookie.setPath("/");
         successCookie.setHttpOnly(true);
         response.addCookie(successCookie);
         return ResponseEntity.ok("Logout successful");
	    }
	  
}
