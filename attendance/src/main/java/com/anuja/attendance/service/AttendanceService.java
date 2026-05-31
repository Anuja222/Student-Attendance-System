package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Attendance;

public interface AttendanceService {

    Attendance markAttendance(
            Attendance attendance);

    List<Attendance> getAllAttendance();

    List<Attendance> getAttendanceByStudent(
            String studentNumber);

    void deleteAttendance(Long id);
}