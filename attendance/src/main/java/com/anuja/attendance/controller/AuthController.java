package com.anuja.attendance.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuja.attendance.dto.LoginRequest;
import com.anuja.attendance.dto.LoginResponse;
import com.anuja.attendance.model.ApiResponse;
import com.anuja.attendance.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    public AuthController(
            UserService userService) {

        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<
            ApiResponse<LoginResponse>>
            login(
                    @Valid
                    @RequestBody
                    LoginRequest request) {

        LoginResponse response =
                userService.login(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Login successful",
                        response));
    }
}