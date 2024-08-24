package com.example.employeemanagement_system.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.event.AuthenticationCredentialsNotFoundEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.employeemanagement_system.entityModel.userDetailModel;
import com.example.employeemanagement_system.repository.userDetailModelRepository;

@Service
public class userDetailServiceImp implements UserDetailsService{

	@Autowired
	private userDetailModelRepository userDetailModelRepository;

	private static final Logger LOGGER = LoggerFactory.getLogger(userDetailServiceImp.class);
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
	userDetailModel userDetailModel = userDetailModelRepository.loginProcess(username);
	
	 if( userDetailModel == null ) {
		 new UsernameNotFoundException(" User still stuck on tie to be found!");
		 LOGGER.error("user name is ultimately null!");
	 }
	 
	List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_"+userDetailModel.getAuthority()));
		
		   return User.withUsername(userDetailModel.getUsername())
	                .password(userDetailModel.getPassword())
	                .authorities(authorities)
	                .credentialsExpired(false)
	                .accountLocked(!userDetailModel.isEnabled())
	                .build();
		  
	}
	
    public boolean authenticate(String username, String password) {
        userDetailModel userDetailModel = userDetailModelRepository.findByUsername(username);

        if (userDetailModel == null) {
            return false; 
        }

        return new BCryptPasswordEncoder().matches(password, userDetailModel.getPassword());
    }
  
    public String getCurrentUserName() {
    	
   Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
   
   			if( authentication != null && authentication.getName() != null && authentication.isAuthenticated() ) {
   			 Object principal =	authentication.getPrincipal();
   			 
   			 if(  principal instanceof userDetailModel ) {
   				 	return  ((userDetailModel) principal).getUsername();
   			 }
   			 else {
   				 return principal.toString();
   			 }
   			}
   			
   			return null;
    }
	
}