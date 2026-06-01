package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.dto.LoginRequest;
import com.anuja.attendance.dto.LoginResponse;
import com.anuja.attendance.dto.UserRequest;
import com.anuja.attendance.dto.UserResponse;

public interface UserService {

	UserResponse createUser(UserRequest request);

	UserResponse getUserById(Long id);

	LoginResponse login(LoginRequest request);

	List<UserResponse> getAllUsers();
}