package com.anuja.attendance.mapper;

import com.anuja.attendance.dto.UserRequest;
import com.anuja.attendance.dto.UserResponse;
import com.anuja.attendance.entity.User;

public final class UserMapper {

    private UserMapper() {
    }

    public static User toEntity(UserRequest request) {

        User user = new User();

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());

        user.setPassword(request.password());

        user.setRole(request.role());

        user.setActive(
                request.active() == null
                        || request.active());

        return user;
    }

    public static UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }
}