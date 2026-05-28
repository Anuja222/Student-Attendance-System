package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anuja.attendance.dto.UserRequest;
import com.anuja.attendance.dto.UserResponse;
import com.anuja.attendance.entity.User;
import com.anuja.attendance.exception.ResourceNotFoundException;
import com.anuja.attendance.mapper.UserMapper;
import com.anuja.attendance.repository.UserRepository;
import com.anuja.attendance.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserResponse createUser(UserRequest request) {
		if (userRepository.existsByEmail(request.email())) {
			throw new IllegalArgumentException("User email already exists");
		}

		User savedUser = userRepository.save(UserMapper.toEntity(request));
		return UserMapper.toResponse(savedUser);
	}

	@Override
	@Transactional(readOnly = true)
	public UserResponse getUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		return UserMapper.toResponse(user);
	}

	@Override
	@Transactional(readOnly = true)
	public List<UserResponse> getAllUsers() {
		return userRepository.findAll().stream().map(UserMapper::toResponse).toList();
	}
}