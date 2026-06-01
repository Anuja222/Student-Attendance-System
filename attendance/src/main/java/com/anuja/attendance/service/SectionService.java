package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.Section;

public interface SectionService {

    Section createSection(Section section);

    List<Section> getAllSections();

    void deleteSection(Long id);
}