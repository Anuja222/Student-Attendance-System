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

import com.anuja.attendance.entity.SubjectAllocation;
import com.anuja.attendance.service.SubjectAllocationService;

@RestController
@RequestMapping("/subject-allocations")
@CrossOrigin("*")
public class SubjectAllocationController {

    private final SubjectAllocationService allocationService;

    public SubjectAllocationController(
            SubjectAllocationService allocationService) {
        this.allocationService = allocationService;
    }

    @PostMapping
    public SubjectAllocation createAllocation(
            @RequestBody SubjectAllocation allocation) {
        return allocationService.createAllocation(allocation);
    }

    @GetMapping
    public List<SubjectAllocation> getAllAllocations() {
        return allocationService.getAllAllocations();
    }

    @DeleteMapping("/{id}")
    public void deleteAllocation(
            @PathVariable Long id) {
        allocationService.deleteAllocation(id);
    }
}