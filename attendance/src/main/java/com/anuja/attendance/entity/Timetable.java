package com.anuja.attendance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grade;

    private String section;

    private String day;

    private Integer period;

    private String subject;

    private String teacher;

    public Timetable() {
    }

    public Long getId() {
        return id;
    }

    public String getGrade() {
        return grade;
    }

    public String getSection() {
        return section;
    }

    public String getDay() {
        return day;
    }

    public Integer getPeriod() {
        return period;
    }

    public String getSubject() {
        return subject;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
}