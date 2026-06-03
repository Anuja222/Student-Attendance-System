package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuja.attendance.entity.Teacher;
import com.anuja.attendance.entity.User;
import com.anuja.attendance.repository.TeacherRepository;
import com.anuja.attendance.repository.UserRepository;
import com.anuja.attendance.service.TeacherService;

@Service
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    public TeacherServiceImpl(
            TeacherRepository teacherRepository,
            UserRepository userRepository) {
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {

        Teacher savedTeacher = teacherRepository.save(teacher);

        if (!userRepository.existsByEmail(teacher.getEmail())) {
            User user = new User();

            String[] nameParts = teacher.getFullName().split(" ", 2);

            user.setFirstName(nameParts[0]);

            if (nameParts.length > 1) {
                user.setLastName(nameParts[1]);
            } else {
                user.setLastName("Teacher");
            }

            user.setEmail(teacher.getEmail());
            user.setPassword("teacher123");
            user.setRole("TEACHER");
            user.setActive(true);

            userRepository.save(user);
        }

        return savedTeacher;
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

    @Override
    public Teacher getTeacherByEmail(String email) {

        return teacherRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Teacher not found"));
    }
}