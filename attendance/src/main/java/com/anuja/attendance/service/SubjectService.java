package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Subject;

public interface SubjectService {

    Subject createSubject(Subject subject);

    List<Subject> getAllSubjects();

    void deleteSubject(Long id);
}