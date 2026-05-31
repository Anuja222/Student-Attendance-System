package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Grade;

public interface GradeService {

    Grade createGrade(Grade grade);

    List<Grade> getAllGrades();

    void deleteGrade(Long id);
}