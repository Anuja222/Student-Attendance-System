package com.anuja.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.SubjectAllocation;

public interface SubjectAllocationRepository
        extends JpaRepository<SubjectAllocation, Long> {

}