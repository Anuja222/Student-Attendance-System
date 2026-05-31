package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Timetable;

public interface TimetableService {

    Timetable createTimetable(
            Timetable timetable);

    List<Timetable> getAllTimetables();

    void deleteTimetable(Long id);
}