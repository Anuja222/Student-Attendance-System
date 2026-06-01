package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Timetable;

public interface TimetableService {

    Timetable createTimetable(
            Timetable timetable);

    List<Timetable> getAllTimetables();
    List<Timetable> getTimetablesByTeacher(String teacher);

    void deleteTimetable(Long id);
}