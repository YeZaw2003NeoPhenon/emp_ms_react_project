package com.example.employeemanagement_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employeemanagement_system.entityModel.userDetailModel;
import com.example.employeemanagement_system.repository.accountCreationRepository;

@Service
public class accountCreationServiceImp implements accountCreationService{

	@Autowired
	private accountCreationRepository accountCreationRepository;
	
	@Override
	public int accountCreationProcess(userDetailModel userDetailModel) {
		userDetailModel.setPassword(new BCryptPasswordEncoder().encode(userDetailModel.getPassword()));
		
		int user_processing_output = accountCreationRepository.createUserAccount(userDetailModel);
		int admin_processing_output = accountCreationRepository.createAdminAccount(userDetailModel);
		
		int result = user_processing_output + admin_processing_output;
		
		if( result > 1 ) {
			return result;
		}
		else {
			return -1;
		}
	}

}
