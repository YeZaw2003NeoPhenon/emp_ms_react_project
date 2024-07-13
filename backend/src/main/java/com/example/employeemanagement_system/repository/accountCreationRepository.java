package com.example.employeemanagement_system.repository;

import org.apache.ibatis.annotations.Mapper;

import com.example.employeemanagement_system.entityModel.userDetailModel;

@Mapper
public interface accountCreationRepository {
	public abstract int createUserAccount(userDetailModel userDetailModel);
	public abstract int createAdminAccount( userDetailModel userDetailModel);
}
