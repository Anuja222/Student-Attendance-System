package com.anuja.attendance.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuja.attendance.entity.TeacherAllocation;
import com.anuja.attendance.repository.TeacherAllocationRepository;
import com.anuja.attendance.service.TeacherAllocationService;

@Service
public class TeacherAllocationServiceImpl
        implements TeacherAllocationService {

    private final TeacherAllocationRepository repository;

    public TeacherAllocationServiceImpl(
            TeacherAllocationRepository repository) {
        this.repository = repository;
    }

    @Override
    public TeacherAllocation createAllocation(
            TeacherAllocation allocation) {
        return repository.save(allocation);
    }

    @Override
    public List<TeacherAllocation> getAllAllocations() {
        return repository.findAll();
    }

    @Override
    public void deleteAllocation(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<TeacherAllocation> getAllocationsByTeacher(
            String teacher) {

        return repository.findByTeacher(
                teacher);
    }
}