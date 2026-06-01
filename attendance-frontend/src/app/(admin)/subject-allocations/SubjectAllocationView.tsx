"use client";

import { useEffect, useState } from "react";

import { Grade } from "@/api/types/Grade";
import { Subject } from "@/api/types/Subject";
import { Section } from "@/api/types/Section";
import { SubjectAllocation } from "@/api/types/SubjectAllocation";

import { getGrades } from "@/api/service/gradeService";
import { getSubjects } from "@/api/service/subjectService";
import { getSections } from "@/api/service/sectionService";

import {
  getSubjectAllocations,
  createSubjectAllocation,
  deleteSubjectAllocation,
} from "@/api/service/subjectAllocationService";

export default function SubjectAllocationView() {
  const [allocations, setAllocations] = useState<
    SubjectAllocation[]
  >([]);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    loadAllocations();
    loadGrades();
    loadSubjects();
    loadSections();
  }, []);

  const loadAllocations = async () => {
    try {
      const data = await getSubjectAllocations();
      setAllocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadGrades = async () => {
    try {
      const data = await getGrades();
      setGrades(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAllocation = async () => {
    if (
      !grade.trim() ||
      !subject.trim() ||
      !section.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createSubjectAllocation({
        grade,
        subject,
        section,
      });

      setGrade("");
      setSubject("");
      setSection("");

      await loadAllocations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubjectAllocation(id);
      await loadAllocations();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Subject Allocation
      </h1>

      <div className="border rounded-lg p-4 mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Allocation
        </h2>

        <div className="flex flex-col gap-3">
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

          <button
            onClick={handleCreateAllocation}
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
                  Grade: {allocation.grade}
                </div>

                <div>
                  Subject: {allocation.subject}
                </div>

                <div>
                  Section: {allocation.section}
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