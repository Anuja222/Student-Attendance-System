package com.anuja.attendance.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuja.attendance.entity.Attendance;
import com.anuja.attendance.service.AttendanceService;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("*")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public Attendance markAttendance(
            @RequestBody Attendance attendance) {
        return attendanceService
                .markAttendance(attendance);
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService
                .getAllAttendance();
    }

    @GetMapping("/student/{studentNumber}")
    public List<Attendance> getAttendanceByStudent(
            @PathVariable String studentNumber) {

        return attendanceService
                .getAttendanceByStudent(studentNumber);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);
    }
}