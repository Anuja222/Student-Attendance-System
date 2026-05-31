package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuja.attendance.entity.SubjectAllocation;
import com.anuja.attendance.repository.SubjectAllocationRepository;
import com.anuja.attendance.service.SubjectAllocationService;

@Service
public class SubjectAllocationServiceImpl
        implements SubjectAllocationService {

    private final SubjectAllocationRepository allocationRepository;

    public SubjectAllocationServiceImpl(
            SubjectAllocationRepository allocationRepository) {
        this.allocationRepository = allocationRepository;
    }

    @Override
    public SubjectAllocation createAllocation(
            SubjectAllocation allocation) {
        return allocationRepository.save(allocation);
    }

    @Override
    public List<SubjectAllocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    @Override
    public void deleteAllocation(Long id) {
        allocationRepository.deleteById(id);
    }
}