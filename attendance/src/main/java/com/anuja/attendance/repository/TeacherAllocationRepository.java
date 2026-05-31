package com.anuja.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.TeacherAllocation;

public interface TeacherAllocationRepository
        extends JpaRepository<TeacherAllocation, Long> {

}