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

import com.anuja.attendance.entity.TeacherAllocation;
import com.anuja.attendance.service.TeacherAllocationService;

@RestController
@RequestMapping("/teacher-allocations")
@CrossOrigin("*")
public class TeacherAllocationController {

    private final TeacherAllocationService allocationService;

    public TeacherAllocationController(
            TeacherAllocationService allocationService) {
        this.allocationService = allocationService;
    }

    @PostMapping
    public TeacherAllocation createAllocation(
            @RequestBody TeacherAllocation allocation) {
        return allocationService.createAllocation(allocation);
    }

    @GetMapping
    public List<TeacherAllocation> getAllAllocations() {
        return allocationService.getAllAllocations();
    }

    @DeleteMapping("/{id}")
    public void deleteAllocation(
            @PathVariable Long id) {
        allocationService.deleteAllocation(id);
    }

    @GetMapping("/teacher/{teacher}")
    public List<TeacherAllocation> getByTeacher(
            @PathVariable String teacher) {

        return allocationService
                .getAllocationsByTeacher(
                        teacher);
    }
}