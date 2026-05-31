"use client";

import { useEffect, useState } from "react";

import { Grade } from "@/api/types/Grade";
import { Section } from "@/api/types/Section";
import { Attendance } from "@/api/types/Attendance";

import { getGrades } from "@/api/service/gradeService";
import { getSections } from "@/api/service/sectionService";
import { getAttendanceByClass } from "@/api/service/attendanceService";

export default function ClassAttendanceReportView() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");

  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    loadGrades();
    loadSections();
  }, []);

  const loadGrades = async () => {
    setGrades(await getGrades());
  };

  const loadSections = async () => {
    setSections(await getSections());
  };

  const generateReport = async () => {
    const records: Attendance[] =
      await getAttendanceByClass(
        grade,
        section
      );

    const grouped: Record<
      string,
      Attendance[]
    > = {};

    records.forEach((record) => {
      if (!grouped[record.studentNumber]) {
        grouped[record.studentNumber] = [];
      }

      grouped[record.studentNumber].push(record);
    });

    const summary = Object.values(grouped).map(
      (studentRecords) => {
        const total =
          studentRecords.length;

        const present =
          studentRecords.filter(
            (r) =>
              r.status === "PRESENT"
          ).length;

        return {
          studentName:
            studentRecords[0]
              .studentName,

          percentage:
            total === 0
              ? 0
              : (
                  (present / total) *
                  100
                ).toFixed(2),
        };
      }
    );

    setReport(summary);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Class Attendance Report
      </h1>

      <div className="flex gap-3 mb-6">
        <select
          value={grade}
          onChange={(e) =>
            setGrade(e.target.value)
          }
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
          onChange={(e) =>
            setSection(e.target.value)
          }
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
          onClick={generateReport}
          className="border rounded px-4"
        >
          Generate
        </button>
      </div>

      <div className="space-y-2">
        {report.map((student, index) => (
          <div
            key={index}
            className="border rounded p-3"
          >
            <div>
              {student.studentName}
            </div>

            <div>
              Attendance:
              {" "}
              {student.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}