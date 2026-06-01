package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuja.attendance.entity.Timetable;
import com.anuja.attendance.repository.TimetableRepository;
import com.anuja.attendance.service.TimetableService;

@Service
public class TimetableServiceImpl
        implements TimetableService {

    private final TimetableRepository timetableRepository;

    public TimetableServiceImpl(
            TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    @Override
    public Timetable createTimetable(
            Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    @Override
    public List<Timetable> getAllTimetables() {
        return timetableRepository.findAll();
    }

    @Override
    public void deleteTimetable(Long id) {
        timetableRepository.deleteById(id);
    }

    @Override
    public List<Timetable> getTimetablesByTeacher(String teacher) {
        return timetableRepository.findByTeacher(teacher);
    }
}