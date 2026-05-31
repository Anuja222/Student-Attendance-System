package com.anuja.attendance.service;

import java.util.List;

import com.anuja.attendance.entity.SubjectAllocation;

public interface SubjectAllocationService {

    SubjectAllocation createAllocation(
            SubjectAllocation allocation);

    List<SubjectAllocation> getAllAllocations();

    void deleteAllocation(Long id);
}