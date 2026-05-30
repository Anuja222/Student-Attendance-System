package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Student;

public interface StudentService {

    Student createStudent(Student student);

    List<Student> getAllStudents();

    List<Student> getStudentsBySection(String section);
}