package com.anuja.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.Section;

public interface SectionRepository
        extends JpaRepository<Section, Long> {
}