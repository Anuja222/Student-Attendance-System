package com.anuja.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

}