package com.example.employeemanagement_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
@EnableWebMvc
public class CorsConfigure implements WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry corsRegistry) {
		corsRegistry.addMapping("/**")
					.allowedOrigins("http://localhost:3000")
					.allowedMethods("GET" , "POST" , "PUT" , "DELETE")
					.allowCredentials(true);
	}
}