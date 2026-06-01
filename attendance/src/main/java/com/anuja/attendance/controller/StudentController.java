package com.anuja.attendance.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anuja.attendance.entity.Student;
import com.anuja.attendance.service.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/section/{section}")
    public List<Student> getStudentsBySection(
            @PathVariable String section) {
        return studentService.getStudentsBySection(section);
    }

    @GetMapping("/count")
    public long getStudentCount() {
        return studentService.getAllStudents().size();
    }

    @GetMapping("/class")
    public List<Student> getStudentsByClass(
            @RequestParam String grade,
            @RequestParam String section) {

        return studentService.getStudentsByGradeAndSection(grade, section);
    }
}