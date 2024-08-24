package com.example.employeemanagement_system.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.employeemanagement_system.entityModel.Employee;
import com.example.employeemanagement_system.entityModel.Manager;

@Mapper
public interface ManagerRepository {
  public abstract List<Manager> getAllManagers();
  public abstract  Manager getManagerById(int id);
  public abstract  int insertIntoManager(Manager manager);
  public abstract int updateManager(Manager manager);
  public abstract int deleteManager(int id);
  public abstract boolean existsById(int id); 
  
  public abstract Employee selectEmployeeForParticularManager(@Param("manager_id") int id);
  
  public abstract List<Manager> getManagersByEmployeeCount(@Param("count") Integer count);
}