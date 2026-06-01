"use client";

import { useEffect, useState } from "react";

import { Student } from "@/api/types/Student";
import { Attendance } from "@/api/types/Attendance";

import { getStudents } from "@/api/service/studentService";
import { getAttendanceByStudent } from "@/api/service/attendanceService";

export default function AttendanceReportView() {
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<Attendance[]>([]);

  const [selectedStudent, setSelectedStudent] =
    useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const loadReport = async (
    studentNumber: string
  ) => {
    const data =
      await getAttendanceByStudent(
        studentNumber
      );

    setRecords(data);
  };

  const total = records.length;

  const present = records.filter(
    (r) => r.status === "PRESENT"
  ).length;

  const absent = records.filter(
    (r) => r.status === "ABSENT"
  ).length;

  const percentage =
    total === 0
      ? 0
      : ((present / total) * 100).toFixed(2);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Student Attendance Report
      </h1>

      <select
        value={selectedStudent}
        onChange={(e) => {
          setSelectedStudent(
            e.target.value
          );

          loadReport(e.target.value);
        }}
        className="border rounded p-2 mb-6"
      >
        <option value="">
          Select Student
        </option>

        {students.map((student) => (
          <option
            key={student.id}
            value={student.studentNumber}
          >
            {student.fullName}
          </option>
        ))}
      </select>

      <div className="border rounded p-4 mb-6">
        <p>Total Records: {total}</p>

        <p>Present: {present}</p>

        <p>Absent: {absent}</p>

        <p>
          Attendance Percentage:
          {" "}
          {percentage}%
        </p>
      </div>

      <div className="space-y-2">
        {records.map((record) => (
          <div
            key={record.id}
            className="border rounded p-3"
          >
            <div>
              Date: {record.date}
            </div>

            <div>
              Subject: {record.subject}
            </div>

            <div>
              Status: {record.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}