package com.example.employeemanagement_system.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeemanagement_system.entityModel.Manager;
import com.example.employeemanagement_system.service.ManagerServiceImp;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/managers")
@RestController
public class ManagerController {
	
	@Autowired
	private ManagerServiceImp managerServiceImp;
	
	private static final Logger MANAGER_LOGGER = LoggerFactory.getLogger(ManagerController.class);

	@GetMapping
	public List<Manager> getAllManagers(){
		List<Manager> managers = managerServiceImp.getAllManagers();
		return managers;
	}
	
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
	@PostMapping(value = "/create" , produces = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<Object> createEmployee( @Valid @RequestBody Manager manager , BindingResult rsResult) {
    	
    	MANAGER_LOGGER.info("Creating new manager data: {}", manager);
    	
    	if(rsResult.hasErrors() ) {
    		MANAGER_LOGGER.error("Validation errors while creating manager: {}", rsResult.getAllErrors());
      		return ResponseEntity.badRequest().body(rsResult.getAllErrors());
    	}
    	
		int result =  managerServiceImp.insertIntoManager(manager);
		
		if( result > 0 ) {
			MANAGER_LOGGER.info("Manager created successfully with ID: {}", manager.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body("Manager created successfully");
		}
		else {
			MANAGER_LOGGER.error("Failed to create manager");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Manager creation failed!");
		}
	}
	
	@DeleteMapping(  value = "/delete/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteManager( @PathVariable int id ) {
		int result = managerServiceImp.deleteManager(id);
		MANAGER_LOGGER.info("Deleting Manager with ID: {}", id);
		if( result > 0 ) {
			MANAGER_LOGGER.info("Manager Data deleted successfully with ID: {}", id);
			return ResponseEntity.status(HttpStatus.CREATED).body("Manager deleted successfully");
		}
		else {
			MANAGER_LOGGER.error("Failed to delete manager with ID: {}", id);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Manager deletion failed!");
		}
	}
	
    @GetMapping( value = "/select/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Manager> getManagerById(@PathVariable("id") String id) {
        Manager manager = managerServiceImp.getManagerById(Integer.parseInt(id));
        MANAGER_LOGGER.info("Fetching manager with ID: {}", id);
        if( manager != null ) {
        	MANAGER_LOGGER.info("Manager retrieved successfully with ID: {}", id);
        	return ResponseEntity.status(HttpStatus.OK).body(manager);
        	}
        else {
        	MANAGER_LOGGER.error("Manager not found with ID: {}", id);
        	return new ResponseEntity<Manager>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping(value = "/update/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> updateManagerById( @PathVariable int id ,  @ModelAttribute Manager manager) {
    	manager.setId(id);
    	MANAGER_LOGGER.info("Updating manager with ID: {}", id );
       int result =	managerServiceImp.updateManager(manager);
       
       if( result > 0 ) {
    	   MANAGER_LOGGER.info("Manager updated successfully with ID: {}", manager.getId());
    	   return new ResponseEntity<String>("Manager Updated Successfully" , HttpStatus.OK);
       }
       else {
    	   MANAGER_LOGGER.error("Failed to update manager with ID: {}", manager.getId());
    	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed to update Manager! try out again!");
       }
    }
}
