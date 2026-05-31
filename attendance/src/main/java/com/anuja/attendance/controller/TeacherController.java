package com.anuja.attendance.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuja.attendance.entity.Teacher;
import com.anuja.attendance.service.TeacherService;

@RestController
@RequestMapping("/teachers")
@CrossOrigin("*")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(
            TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping
    public Teacher createTeacher(
            @RequestBody Teacher teacher) {
        return teacherService.createTeacher(teacher);
    }

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(
            @PathVariable Long id) {
        teacherService.deleteTeacher(id);
    }

    @GetMapping("/count")
    public long getTeacherCount() {
        return teacherService.getAllTeachers().size();
    }
}