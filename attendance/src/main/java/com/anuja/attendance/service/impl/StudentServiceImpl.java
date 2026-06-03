package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuja.attendance.entity.Student;
import com.anuja.attendance.entity.User;
import com.anuja.attendance.repository.StudentRepository;
import com.anuja.attendance.repository.UserRepository;
import com.anuja.attendance.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public StudentServiceImpl(
            StudentRepository studentRepository,
            UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Student createStudent(Student student) {

        Student savedStudent = studentRepository.save(student);
        String email = student.getEmail();

        if (email != null && !email.isBlank() && !userRepository.existsByEmail(email)) {
            User user = new User();

            String[] nameParts = student.getFullName().split(" ", 2);

            user.setFirstName(nameParts[0]);

            if (nameParts.length > 1) {
                user.setLastName(nameParts[1]);
            } else {
                user.setLastName("Student");
            }

            user.setEmail(email);
            user.setPassword("student123");
            user.setRole("STUDENT");
            user.setActive(true);

            userRepository.save(user);
        }

        return savedStudent;
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public List<Student> getStudentsBySection(String section) {
        return studentRepository.findBySection(section);
    }

    @Override
    public List<Student> getStudentsByGradeAndSection(String grade, String section) {
        return studentRepository.findByGradeAndSection(grade, section);
    }

    @Override
    public Student getStudentByEmail(String email) {

        return studentRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found"));
    }
}