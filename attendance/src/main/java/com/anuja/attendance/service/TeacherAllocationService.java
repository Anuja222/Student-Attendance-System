package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.TeacherAllocation;

public interface TeacherAllocationService {

    TeacherAllocation createAllocation(
            TeacherAllocation allocation);

    List<TeacherAllocation> getAllAllocations();

    void deleteAllocation(Long id);
}