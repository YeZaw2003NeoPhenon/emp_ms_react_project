package com.example.employeemanagement_system.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import com.example.employeemanagement_system.service.userDetailServiceImp;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


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
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .csrf().disable()
                .cors()
                .and()
                .authorizeRequests()
                .requestMatchers("/api/authenticate").permitAll()
                .requestMatchers("/api/accountCreationProcess").permitAll()
                .requestMatchers("/api/employees/**").permitAll()
                .requestMatchers("/css/**", "/img/**", "/js/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/swagger-resources/**", "/webjars/**", "/v3/api-docs/**", "/v3/api-docs.yaml", "/v2/api-docs").permitAll()
                .requestMatchers("/users/**").hasRole("users")
                .requestMatchers("/admin/**").hasRole("admin")
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and()
                .formLogin()
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                        Authentication authentication) throws IOException, ServletException {
                        String remember_me = "";
                        if (request.getCookies() != null) {
                            for (Cookie cookie : request.getCookies()) {
                                if (cookie.getName().equals("remember_me")) {
                                    remember_me += cookie.getValue(); 
                                }
                            }
                        }
                        Cookie successCookie = new Cookie("successCookie", "true");
                        successCookie.setPath("/");
                        successCookie.setHttpOnly(true);
                        response.addCookie(successCookie);
                        response.setStatus(HttpServletResponse.SC_OK);
                        response.sendRedirect("/");
                    }
                })
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                                        AuthenticationException exception) throws IOException, ServletException {
                        Cookie failureCookie = new Cookie("failureCookie", "true");
                        failureCookie.setPath("/");
                        failureCookie.setHttpOnly(true);
                        response.addCookie(failureCookie);
                        response.sendRedirect("/login?errorPopedUp=true");
                    }
                })
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .logoutSuccessHandler(new LogoutSuccessHandler() {
					
					@Override
					public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
							throws IOException, ServletException {
			            Cookie successCookie = new Cookie("logoutSuccess", "true");
	                    successCookie.setPath("/");
	                    successCookie.setHttpOnly(true);
	                    response.addCookie(successCookie);
	                    response.setStatus(HttpServletResponse.SC_OK);
	                    response.sendRedirect("/login?logout=wrappedUp");
					}
				})
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .and()
                .rememberMe()
                .key("unique")
                .alwaysRemember(true)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint( new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .and()
                .sessionManagement()
                .maximumSessions(1)
                .expiredUrl("/login?sessionExpired=true");

        return httpSecurity.build();
    }	
}
