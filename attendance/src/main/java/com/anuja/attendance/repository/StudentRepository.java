package com.anuja.attendance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuja.attendance.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findBySection(String section);
    List<Student> findByGradeAndSection(String grade, String section);

    Optional<Student> findByEmail(String email);

}