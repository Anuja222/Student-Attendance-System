package com.anuja.attendance.controller;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.anuja.attendance.dto.UserResponse;
import com.anuja.attendance.exception.GlobalExceptionHandler;
import com.anuja.attendance.service.UserService;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

	@Mock
	private UserService userService;

	@InjectMocks
	private UserController userController;

	private MockMvc mockMvc;

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(userController)
				.setControllerAdvice(new GlobalExceptionHandler())
				.build();
	}

	@Test
	void getAllUsersShouldReturnUsers() throws Exception {
		when(userService.getAllUsers()).thenReturn(List.of(
				new UserResponse(1L, "Anuja", "Sharma", "anuja@example.com", "ADMIN", true, null, null)));

		mockMvc.perform(get("/api/users"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.success").value(true))
				.andExpect(jsonPath("$.data[0].email").value("anuja@example.com"));
	}

	@Test
	void createUserShouldReturnCreated() throws Exception {
		when(userService.createUser(any())).thenReturn(
				new UserResponse(1L, "Anuja", "Sharma", "anuja@example.com", "ADMIN", true, null, null));

		mockMvc.perform(post("/api/users")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
				{
				  "firstName": "Anuja",
				  "lastName": "Sharma",
				  "email": "anuja@example.com",
				  "active": true
				}
				"""))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.data.email").value("anuja@example.com"));
	}
}