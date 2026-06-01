"use client";

import { useEffect, useState } from "react";

import { Grade } from "@/api/types/Grade";
import { Section } from "@/api/types/Section";
import { Subject } from "@/api/types/Subject";
import { Teacher } from "@/api/types/Teacher";
import { Timetable } from "@/api/types/Timetable";

import { getGrades } from "@/api/service/gradeService";
import { getSections } from "@/api/service/sectionService";
import { getSubjects } from "@/api/service/subjectService";
import { getTeachers } from "@/api/service/teacherService";

import {
  getTimetables,
  createTimetable,
  deleteTimetable,
} from "@/api/service/timetableService";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function TimetableView() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [day, setDay] = useState("");
  const [period, setPeriod] = useState<number | "">("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    loadTimetables();
    loadGrades();
    loadSections();
    loadSubjects();
    loadTeachers();
  }, []);

  const loadTimetables = async () => {
    const data = await getTimetables();

    const sorted = [...data].sort((a, b) => {
      if (a.day !== b.day) {
        return a.day.localeCompare(b.day);
      }

      return a.period - b.period;
    });

    setTimetables(sorted);
  };

  const loadGrades = async () => {
    setGrades(await getGrades());
  };

  const loadSections = async () => {
    setSections(await getSections());
  };

  const loadSubjects = async () => {
    setSubjects(await getSubjects());
  };

  const loadTeachers = async () => {
    setTeachers(await getTeachers());
  };

  const handleSave = async () => {
    if (
      !grade ||
      !section ||
      !day ||
      !period ||
      !subject ||
      !teacher
    ) {
      alert("Please fill all fields");
      return;
    }

    await createTimetable({
      grade,
      section,
      day,
      period,
      subject,
      teacher,
    });

    setGrade("");
    setSection("");
    setDay("");
    setPeriod("");
    setSubject("");
    setTeacher("");

    await loadTimetables();
  };

  const handleDelete = async (id: number) => {
    await deleteTimetable(id);
    await loadTimetables();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Timetable Management
      </h1>

      <div className="border rounded-lg p-4 mb-6 max-w-lg">
        <div className="flex flex-col gap-3">

          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select Grade</option>

            {grades.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select Section</option>

            {sections.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select Day</option>

            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={period}
            onChange={(e) =>
              setPeriod(Number(e.target.value))
            }
            className="border rounded p-2"
          >
            <option value="">
              Select Period
            </option>

            <option value={1}>P1</option>
            <option value={2}>P2</option>
            <option value={3}>P3</option>
            <option value={4}>P4</option>
            <option value={5}>P5</option>
            <option value={6}>P6</option>
            <option value={7}>P7</option>
            <option value={8}>P8</option>
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
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

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

          <button
            onClick={handleSave}
            className="border rounded p-2"
          >
            Save Timetable Entry
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Timetable Entries
      </h2>

      <div className="space-y-2">
        {timetables.map((entry) => (
          <div
            key={entry.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <div>
                {entry.grade} - {entry.section}
              </div>

              <div>
                {entry.day}
              </div>

              <div>
                P{entry.period} | {entry.subject}
              </div>

              <div>
                {entry.teacher}
              </div>
            </div>

            <button
              onClick={() =>
                handleDelete(entry.id)
              }
              className="border rounded px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}