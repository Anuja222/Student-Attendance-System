package com.anuja.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long> {

}