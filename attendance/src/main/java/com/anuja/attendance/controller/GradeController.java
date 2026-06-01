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

import com.anuja.attendance.entity.Grade;
import com.anuja.attendance.service.GradeService;

@RestController
@RequestMapping("/grades")
@CrossOrigin("*")
public class GradeController {

    private final GradeService gradeService;

    public GradeController(
            GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PostMapping
    public Grade createGrade(
            @RequestBody Grade grade) {
        return gradeService.createGrade(grade);
    }

    @GetMapping
    public List<Grade> getAllGrades() {
        return gradeService.getAllGrades();
    }

    @DeleteMapping("/{id}")
    public void deleteGrade(
            @PathVariable Long id) {
        gradeService.deleteGrade(id);
    }
}