"use client";

import { useEffect, useState } from "react";

import { Teacher } from "@/api/types/Teacher";
import { Grade } from "@/api/types/Grade";
import { Section } from "@/api/types/Section";
import { Subject } from "@/api/types/Subject";
import { TeacherAllocation } from "@/api/types/TeacherAllocation";

import { getTeachers } from "@/api/service/teacherService";
import { getGrades } from "@/api/service/gradeService";
import { getSections } from "@/api/service/sectionService";
import { getSubjects } from "@/api/service/subjectService";

import {
  getTeacherAllocations,
  createTeacherAllocation,
  deleteTeacherAllocation,
} from "@/api/service/teacherAllocationService";

export default function TeacherAllocationView() {
  const [allocations, setAllocations] = useState<TeacherAllocation[]>([]);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [teacher, setTeacher] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    loadAllocations();
    loadTeachers();
    loadGrades();
    loadSections();
    loadSubjects();
  }, []);

  const loadAllocations = async () => {
    const data = await getTeacherAllocations();
    setAllocations(data);
  };

  const loadTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  const loadGrades = async () => {
    const data = await getGrades();
    setGrades(data);
  };

  const loadSections = async () => {
    const data = await getSections();
    setSections(data);
  };

  const loadSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };

  const handleSave = async () => {
    if (!teacher || !grade || !section || !subject) {
      alert("Please fill all fields");
      return;
    }

    await createTeacherAllocation({
      teacher,
      grade,
      section,
      subject,
    });

    setTeacher("");
    setGrade("");
    setSection("");
    setSubject("");

    await loadAllocations();
  };

  const handleDelete = async (id: number) => {
    await deleteTeacherAllocation(id);
    await loadAllocations();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Teacher Allocation
      </h1>

      <div className="border rounded-lg p-4 mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Allocation
        </h2>

        <div className="flex flex-col gap-3">

          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">
              Select Teacher
            </option>

            {teachers.map((t) => (
              <option
                key={t.id}
                value={t.fullName}
              >
                {t.fullName}
              </option>
            ))}
          </select>

          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">
              Select Grade
            </option>

            {grades.map((g) => (
              <option
                key={g.id}
                value={g.name}
              >
                {g.name}
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

            {sections.map((s) => (
              <option
                key={s.id}
                value={s.name}
              >
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((s) => (
              <option
                key={s.id}
                value={s.name}
              >
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="border rounded p-2"
          >
            Save Allocation
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Allocation List
        </h2>

        <div className="space-y-2">
          {allocations.map((allocation) => (
            <div
              key={allocation.id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <div>
                <div>
                  Teacher: {allocation.teacher}
                </div>

                <div>
                  Grade: {allocation.grade}
                </div>

                <div>
                  Section: {allocation.section}
                </div>

                <div>
                  Subject: {allocation.subject}
                </div>
              </div>

              <button
                onClick={() =>
                  handleDelete(allocation.id)
                }
                className="border rounded px-3 py-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}