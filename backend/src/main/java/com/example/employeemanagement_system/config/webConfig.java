package com.example.employeemanagement_system.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.example.employeemanagement_system.service.userDetailServiceImp;


@Configuration
@EnableWebSecurity
public class webConfig{
	
	private final userDetailServiceImp userDetailServiceImp;
	
	@Autowired
	public webConfig(userDetailServiceImp userDetailServiceImp) {
		this.userDetailServiceImp = userDetailServiceImp;
	}
	
	@Autowired
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailServiceImp);
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailServiceImp);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    	
        httpSecurity
                .csrf().disable()
                .cors()
                .and()
                .authorizeRequests()
                .requestMatchers("/api/authenticate").permitAll()
                .requestMatchers("/api/accountCreationProcess").permitAll()
                .requestMatchers("/api/logout").permitAll()
                .requestMatchers("/api/employees/**").permitAll()
                .requestMatchers("/api/managers/**").permitAll()
                .requestMatchers("/css/**", "/img/**", "/js/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/swagger-resources/**", "/webjars/**", "/v3/api-docs/**", "/v3/api-docs.yaml", "/v2/api-docs").permitAll()
                .requestMatchers("/users/**").hasAuthority("USER")
                .requestMatchers("/admin/**").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and()
                .logout()
                .logoutUrl("/api/logout/**")
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout/**", "GET"))
                .deleteCookies("remember-me","JESESSID")
                .and()
                .rememberMe()
                .key("unique")
                .rememberMeCookieName("remember-me")
                .alwaysRemember(true)
                .and()
                .sessionManagement()
                .maximumSessions(1)
                .expiredUrl("/login?sessionExpired=true");
      
        return httpSecurity.build();
    }	
}
