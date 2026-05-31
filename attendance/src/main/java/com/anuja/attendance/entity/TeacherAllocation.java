package com.anuja.attendance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TeacherAllocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teacher;

    private String grade;

    private String section;

    private String subject;

    public TeacherAllocation() {
    }

    public Long getId() {
        return id;
    }

    public String getTeacher() {
        return teacher;
    }

    public String getGrade() {
        return grade;
    }

    public String getSection() {
        return section;
    }

    public String getSubject() {
        return subject;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}