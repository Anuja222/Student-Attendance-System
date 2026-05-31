package com.anuja.attendance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.Timetable;

public interface TimetableRepository
        extends JpaRepository<Timetable, Long> {

    List<Timetable> findByGradeAndSection(
            String grade,
            String section);
}

