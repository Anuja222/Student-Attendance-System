package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuja.attendance.entity.Section;
import com.anuja.attendance.repository.SectionRepository;
import com.anuja.attendance.service.SectionService;

@Service
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository; //Service uses repository to access database.

    public SectionServiceImpl(SectionRepository sectionRepository) { //Spring automatically provides repository object.
        this.sectionRepository = sectionRepository;
    }

    @Override
    public Section createSection(Section section) { 
        return sectionRepository.save(section); ////Creates new section in DB.
    }

    @Override
    public List<Section> getAllSections() {
        return sectionRepository.findAll(); //Gets all sections.
    }

    @Override
    public void deleteSection(Long id) {
        sectionRepository.deleteById(id); //Deletes section.
    }
}