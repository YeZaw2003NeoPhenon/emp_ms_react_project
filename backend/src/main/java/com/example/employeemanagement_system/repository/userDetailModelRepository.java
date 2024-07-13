package com.example.employeemanagement_system.repository;

import org.apache.ibatis.annotations.Mapper;

import com.example.employeemanagement_system.entityModel.userDetailModel;


@Mapper
public interface userDetailModelRepository {
	public abstract userDetailModel loginProcess(String username );
	
    public abstract userDetailModel findByUsername( String username);

}
