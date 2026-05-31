"use client";

import { useEffect, useState } from "react";

import { Student } from "@/api/types/Student";
import { Section } from "@/api/types/Section";

import { Grade } from "@/api/types/Grade";
import { getGrades } from "@/api/service/gradeService";

import {
  getStudents,
  createStudent,
} from "@/api/service/studentService";

import { getSections } from "@/api/service/sectionService";

export default function StudentView() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  const [studentNumber, setStudentNumber] = useState("");
  const [fullName, setFullName] = useState("");

  const [grades, setGrades] = useState<Grade[]>([]);
  const [grade, setGrade] = useState("");

  const [section, setSection] = useState("");

  useEffect(() => {
    loadStudents();
    loadSections();
    loadStudents();
    loadSections();
    loadGrades();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students", error);
    }
  };

  const loadGrades = async () => {
    try {
      const data = await getGrades();
      setGrades(data);
    } catch (error) {
      console.error("Failed to load grades", error);
    }
  };

  const loadSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
    } catch (error) {
      console.error("Failed to load sections", error);
    }
  };

  const handleCreateStudent = async () => {
    if (
      !studentNumber.trim() ||
      !fullName.trim() ||
      !section.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createStudent({
        studentNumber,
        fullName,
        grade,
        section,
      });

      setStudentNumber("");
      setFullName("");
      setSection("");
      setGrade("");

      await loadStudents();
    } catch (error) {
      console.error("Failed to create student", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Student Management
      </h1>

      <div className="border rounded-lg p-4 mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Student
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Student Number"
            value={studentNumber}
            onChange={(e) =>
              setStudentNumber(e.target.value)
            }
            className="border rounded p-2"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="border rounded p-2"
          />
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select Grade</option>

            {grades.map((gradeItem) => (
              <option
                key={gradeItem.id}
                value={gradeItem.name}
              >
                {gradeItem.name}
              </option>
            ))}
          </select>

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">
              Select Section
            </option>

            {sections.map((sectionItem) => (
              <option
                key={sectionItem.id}
                value={sectionItem.name}
              >
                {sectionItem.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateStudent}
            className="border rounded p-2"
          >
            Save Student
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Student List
        </h2>

        <div className="space-y-2">
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="border rounded p-3"
              >
                <div>
                  <strong>
                    {student.studentNumber}
                  </strong>
                </div>

                <div>{student.fullName}</div>

                <div>
                  Grade: {student.grade}
                </div>

                <div>
                  Section: {student.section}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}