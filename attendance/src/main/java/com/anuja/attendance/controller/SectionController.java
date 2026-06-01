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

import com.anuja.attendance.entity.Section;
import com.anuja.attendance.service.SectionService;

@RestController  //"This class handles REST APIs"
@RequestMapping("/sections") //Base URL for all APIs.
@CrossOrigin("*") //allow Next.js frontend to access backend
public class SectionController {

    private final SectionService sectionService; //Spring automatically injects service.

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @PostMapping
    public Section createSection(@RequestBody Section section) {  //RequestBody - Convert incoming JSON into Java object
        return sectionService.createSection(section);
    }

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @DeleteMapping("/{id}")
    public void deleteSection(@PathVariable Long id) { //@PathVariable - Take ID from URL
        sectionService.deleteSection(id);
    }
}