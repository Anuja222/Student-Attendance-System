package com.anuja.attendance.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuja.attendance.dto.UserRequest;
import com.anuja.attendance.dto.UserResponse;
import com.anuja.attendance.model.ApiResponse;
import com.anuja.attendance.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody UserRequest request) {
		UserResponse response = userService.createUser(request);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success("User created", response));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
		UserResponse response = userService.getUserById(id);
		return ResponseEntity.ok(ApiResponse.success("User found", response));
	}

	@GetMapping
	public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
		return ResponseEntity.ok(ApiResponse.success("Users retrieved", userService.getAllUsers()));
	}
}