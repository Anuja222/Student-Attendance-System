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

import com.anuja.attendance.entity.Timetable;
import com.anuja.attendance.service.TimetableService;

@RestController
@RequestMapping("/timetables")
@CrossOrigin("*")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(
            TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @PostMapping
    public Timetable createTimetable(
            @RequestBody Timetable timetable) {
        return timetableService.createTimetable(timetable);
    }

    @GetMapping
    public List<Timetable> getAllTimetables() {
        return timetableService.getAllTimetables();
    }

    @DeleteMapping("/{id}")
    public void deleteTimetable(
            @PathVariable Long id) {
        timetableService.deleteTimetable(id);
    }

    @GetMapping("/teacher/{teacher}")
    public List<Timetable> getTimetablesByTeacher(
            @PathVariable String teacher) {
        return timetableService.getTimetablesByTeacher(teacher);
    }
}