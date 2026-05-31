package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Teacher;

public interface TeacherService {

    Teacher createTeacher(Teacher teacher);

    List<Teacher> getAllTeachers();

    void deleteTeacher(Long id);
}