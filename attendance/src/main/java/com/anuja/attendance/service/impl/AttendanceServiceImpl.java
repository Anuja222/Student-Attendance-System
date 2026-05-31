package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuja.attendance.entity.Attendance;
import com.anuja.attendance.repository.AttendanceRepository;
import com.anuja.attendance.service.AttendanceService;

@Service
public class AttendanceServiceImpl
        implements AttendanceService {

    private final AttendanceRepository repository;

    public AttendanceServiceImpl(
            AttendanceRepository repository) {
        this.repository = repository;
    }

    @Override
    public Attendance markAttendance(
            Attendance attendance) {
        return repository.save(attendance);
    }

    @Override
    public List<Attendance> getAllAttendance() {
        return repository.findAll();
    }

    @Override
    public List<Attendance> getAttendanceByStudent(
            String studentNumber) {
        return repository.findByStudentNumber(
                studentNumber);
    }

    @Override
    public void deleteAttendance(Long id) {
        repository.deleteById(id);
    }
}