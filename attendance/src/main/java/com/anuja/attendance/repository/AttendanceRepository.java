package com.anuja.attendance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.Attendance;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStudentNumber(
            String studentNumber);
}