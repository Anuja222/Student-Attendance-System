package com.anuja.attendance.service;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.anuja.attendance.dto.UserRequest;
import com.anuja.attendance.dto.UserResponse;
import com.anuja.attendance.entity.User;
import com.anuja.attendance.repository.UserRepository;
import com.anuja.attendance.service.impl.UserServiceImpl;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private UserServiceImpl userService;

	@Test
	void createUserShouldPersistAndReturnResponse() {
		UserRequest request = new UserRequest("Anuja", "Sharma", "anuja@example.com", "secret123", "ADMIN", true);
		User saved = new User();
		saved.setId(1L);
		saved.setFirstName("Anuja");
		saved.setLastName("Sharma");
		saved.setEmail("anuja@example.com");
		saved.setActive(true);

		when(userRepository.existsByEmail("anuja@example.com")).thenReturn(false);
		when(userRepository.save(org.mockito.ArgumentMatchers.any(User.class))).thenReturn(saved);

		UserResponse response = userService.createUser(request);

		assertThat(response.id()).isEqualTo(1L);
		assertThat(response.email()).isEqualTo("anuja@example.com");
		verify(userRepository).save(org.mockito.ArgumentMatchers.any(User.class));
	}

	@Test
	void createUserShouldRejectDuplicateEmail() {
		when(userRepository.existsByEmail("anuja@example.com")).thenReturn(true);

		assertThatThrownBy(() -> userService.createUser(new UserRequest("Anuja", "Sharma", "anuja@example.com", "secret123", "ADMIN", true)))
				.isInstanceOf(IllegalArgumentException.class)
				.hasMessageContaining("already exists");
	}

	@Test
	void getUserByIdShouldReturnResponse() {
		User user = new User();
		user.setId(2L);
		user.setFirstName("Test");
		user.setLastName("User");
		user.setEmail("test@example.com");
		user.setActive(true);

		when(userRepository.findById(2L)).thenReturn(Optional.of(user));

		UserResponse response = userService.getUserById(2L);

		assertThat(response.id()).isEqualTo(2L);
		assertThat(response.firstName()).isEqualTo("Test");
	}
}